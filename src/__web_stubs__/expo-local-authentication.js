/**
 * Web stub for expo-local-authentication.
 * Biometric authentication is native-only — on web we report it as unavailable.
 */

export const AuthenticationType = {
  FINGERPRINT: 1,
  FACIAL_RECOGNITION: 2,
  IRIS: 3,
};

export const SecurityLevel = {
  NONE: 0,
  SECRET: 1,
  BIOMETRIC_WEAK: 2,
  BIOMETRIC_STRONG: 3,
};

export async function hasHardwareAsync() { return false; }
export async function isEnrolledAsync() { return false; }
export async function supportedAuthenticationTypesAsync() { return []; }
export async function authenticateAsync() {
  return { success: false, error: 'not_available' };
}
export async function getEnrolledLevelAsync() { return SecurityLevel.NONE; }
export async function cancelAuthenticate() {}

export default {
  hasHardwareAsync,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
  authenticateAsync,
  getEnrolledLevelAsync,
  cancelAuthenticate,
  AuthenticationType,
  SecurityLevel,
};
