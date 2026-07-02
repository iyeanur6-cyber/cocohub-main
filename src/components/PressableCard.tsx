/**
 * PressableCard — a card with:
 * - Cross-platform shadow (iOS + Android)
 * - Scale press animation (0.97 → 1.0)
 * - Theme-aware background
 */

import React, { useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
  disabled?: boolean;
  /** Override background color */
  backgroundColor?: string;
  /** Elevation level: 1 = subtle, 2 = medium, 3 = raised */
  elevation?: 1 | 2 | 3;
}

const SHADOWS = {
  1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const PressableCard: React.FC<Props> = ({
  onPress,
  style,
  children,
  disabled,
  backgroundColor,
  elevation = 1,
}) => {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress || disabled) return;
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const bg = backgroundColor ?? colors.surface;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !onPress}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <Animated.View
        style={[
          styles.base,
          SHADOWS[elevation],
          { backgroundColor: bg, borderColor: colors.border },
          { transform: [{ scale }] },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
});

export default PressableCard;
