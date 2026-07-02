/**
 * App.web.tsx — Web-specific entry point for Cocohub.
 *
 * Storybook and several native services are skipped on web.
 * This file is automatically picked up by Metro when bundling for web
 * (platform-specific file resolution: App.web.tsx > App.tsx).
 */

import * as Sentry from '@sentry/react-native';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, AppState, type AppStateStatus, I18nManager } from 'react-native';

import ErrorBoundary from './src/components/ErrorBoundary';
import OfflineIndicator from './src/components/OfflineIndicator';
import { useSplashGuard } from './src/components/SplashGuard';
import ThemeTransitionView from './src/components/ThemeTransitionView';
import UpdatePrompt from './src/components/UpdatePrompt';
import { PetProvider } from './src/context/PetContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { ToastProvider } from './src/context/ToastContext';
import i18n, { isRTL } from './src/i18n';
import AppNavigator, { handleNotificationDeepLink } from './src/navigation/AppNavigator';
import LockScreen from './src/screens/LockScreen';
import {
  loadLockTimeout,
  getLockTimeoutMs,
} from './src/services/appLockService';
import { registerBackgroundMedicationTask } from './src/services/backgroundTaskService';
import errorTracking from './src/services/errorTracking';
import {
  registerNotificationActions,
  watchNotificationActions,
} from './src/services/notificationService';
import updateService from './src/services/updateService';
import { checkAppVersion } from './src/services/versionCheckService';
import { initializeWidgetService } from './src/services/widgetService';

// Initialise Sentry before the first render
errorTracking.init();

// Apply RTL direction based on the active language at startup
const startupRTL = isRTL(i18n.language);
if (I18nManager.isRTL !== startupRTL) {
  I18nManager.forceRTL(startupRTL);
}

function App() {
  const { appReady } = useSplashGuard();
  const [updateStatus, setUpdateStatus] = React.useState<
    { visible: false } | { visible: true; variant: 'optional' | 'force'; storeUrl?: string }
  >({ visible: false });
  const [locked, setLocked] = useState(false);
  const [pinFallback, setPinFallback] = useState(false);
  const backgroundedAt = React.useRef<number | null>(null);

  // Lock app after idle timeout when returning to foreground
  useEffect(() => {
    const onChange = async (state: AppStateStatus) => {
      if (state === 'background' || state === 'inactive') {
        backgroundedAt.current = Date.now();
      } else if (state === 'active' && backgroundedAt.current !== null) {
        const elapsed = Date.now() - backgroundedAt.current;
        backgroundedAt.current = null;
        const timeout = await loadLockTimeout();
        const ms = getLockTimeoutMs(timeout);
        if (ms > 0 && elapsed >= ms) {
          setPinFallback(false);
          setLocked(true);
        }
      }
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  // Check for updates on launch
  React.useEffect(() => {
    if (!appReady) return;
    void (async () => {
      const versionResult = await checkAppVersion();
      if (versionResult.type === 'critical') {
        setUpdateStatus({ visible: true, variant: 'force', storeUrl: versionResult.storeUrl });
        return;
      }
      if (versionResult.type === 'recommended') {
        setUpdateStatus({ visible: true, variant: 'optional', storeUrl: versionResult.storeUrl });
        return;
      }
      const result = await updateService.checkForUpdate();
      if (result.type === 'force-update') {
        setUpdateStatus({ visible: true, variant: 'force', storeUrl: result.storeUrl });
      } else if (result.type === 'ota-available') {
        setUpdateStatus({ visible: true, variant: 'optional' });
      }
    })();
  }, [appReady]);

  const handleUpdate = () => {
    void updateService.applyOtaUpdate();
  };

  const handleDismiss = () => {
    setUpdateStatus({ visible: false });
  };

  useEffect(() => {
    // Background tasks and notifications are native-only — skip on web
    if (typeof navigator !== 'undefined' && navigator.product !== 'ReactNative') {
      return () => {};
    }
    void registerNotificationActions();
    const subscription = watchNotificationActions();
    void registerBackgroundMedicationTask();
    const unsubscribeWidget = initializeWidgetService();
    return () => {
      subscription.remove();
      unsubscribeWidget();
    };
  }, []);

  useEffect(() => {
    // expo-notifications.getLastNotificationResponseAsync not available on web
    if (typeof navigator !== 'undefined' && navigator.product !== 'ReactNative') return;
    const checkInitialNotification = async () => {
      try {
        const notification = await Notifications.getLastNotificationResponseAsync();
        if (notification) {
          const data = notification.notification.request.content.data;
          handleNotificationDeepLink(data);
        }
      } catch {
        // Not available on web — ignore
      }
    };
    void checkInitialNotification();
  }, [appReady]);

  if (!appReady) return <View style={styles.root} />;

  if (locked) {
    return (
      <LockScreen
        showPinFallback={pinFallback}
        onUnlock={() => setLocked(false)}
        onWipe={async () => {
          // Clear session and return to auth
          const { default: authService } = await import('./src/services/authService');
          await authService.logout();
          setLocked(false);
        }}
      />
    );
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <PetProvider>
          <ErrorBoundary>
            <ThemeTransitionView>
              <View style={styles.root}>
                <OfflineIndicator />
                <AppNavigator />
                <UpdatePrompt
                  visible={updateStatus.visible}
                  variant={updateStatus.visible ? updateStatus.variant : 'optional'}
                  storeUrl={updateStatus.visible ? updateStatus.storeUrl : undefined}
                  onUpdate={handleUpdate}
                  onDismiss={handleDismiss}
                />
              </View>
            </ThemeTransitionView>
          </ErrorBoundary>
        </PetProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default Sentry.wrap(App);
