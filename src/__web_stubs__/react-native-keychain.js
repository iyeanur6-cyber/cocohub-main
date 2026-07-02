/**
 * Web stub for react-native-keychain.
 * Falls back to sessionStorage on web (not secure, but keeps the app running).
 */

export const ACCESSIBLE = { WHEN_UNLOCKED: 'WHEN_UNLOCKED' };
export const ACCESS_CONTROL = {};
export const AUTHENTICATION_TYPE = {};
export const SECURITY_LEVEL = { ANY: 'ANY', SECURE_SOFTWARE: 'SECURE_SOFTWARE', SECURE_HARDWARE: 'SECURE_HARDWARE' };
export const BIOMETRY_TYPE = { TOUCH_ID: 'TouchID', FACE_ID: 'FaceID', FINGERPRINT: 'Fingerprint', FACE: 'Face', IRIS: 'Iris' };
export const STORAGE_TYPE = {};

export async function setGenericPassword(username, password) {
  try { sessionStorage.setItem('keychain_generic', JSON.stringify({ username, password })); } catch {}
  return true;
}

export async function getGenericPassword() {
  try {
    const raw = sessionStorage.getItem('keychain_generic');
    return raw ? JSON.parse(raw) : false;
  } catch { return false; }
}

export async function resetGenericPassword() {
  try { sessionStorage.removeItem('keychain_generic'); } catch {}
  return true;
}

export async function setInternetCredentials(server, username, password) {
  try { sessionStorage.setItem(`keychain_${server}`, JSON.stringify({ username, password })); } catch {}
  return true;
}

export async function getInternetCredentials(server) {
  try {
    const raw = sessionStorage.getItem(`keychain_${server}`);
    return raw ? JSON.parse(raw) : false;
  } catch { return false; }
}

export async function resetInternetCredentials(server) {
  try { sessionStorage.removeItem(`keychain_${server}`); } catch {}
  return true;
}

export async function canImplyAuthentication() { return false; }
export async function getSupportedBiometryType() { return null; }
export async function requestSharedWebCredentials() { return false; }
export async function setSharedWebCredentials() {}
export async function hasInternetCredentials() { return false; }
export async function getSecurityLevel() { return null; }

export default {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
  setInternetCredentials,
  getInternetCredentials,
  resetInternetCredentials,
  canImplyAuthentication,
  getSupportedBiometryType,
  hasInternetCredentials,
  getSecurityLevel,
  ACCESSIBLE,
  BIOMETRY_TYPE,
  SECURITY_LEVEL,
};
