/**
 * Web stub for expo-screen-capture.
 * Screen capture prevention is a native-only capability — no-op on web.
 */

export async function preventScreenCaptureAsync() {}
export async function allowScreenCaptureAsync() {}
export async function enableAppSwitcherProtectionAsync() {}
export async function disableAppSwitcherProtectionAsync() {}
export async function isScreenCaptureEnabled() { return true; }
export function addScreenshotListener() { return { remove: () => {} }; }
export function removeScreenshotListener() {}

export default {
  preventScreenCaptureAsync,
  allowScreenCaptureAsync,
  enableAppSwitcherProtectionAsync,
  disableAppSwitcherProtectionAsync,
  isScreenCaptureEnabled,
  addScreenshotListener,
  removeScreenshotListener,
};
