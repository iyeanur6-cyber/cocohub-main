/**
 * Web stub for expo-secure-store.
 * Falls back to sessionStorage — not secure, but keeps the app functional on web.
 */

export async function setItemAsync(key, value) {
  try { sessionStorage.setItem(`securestore_${key}`, value); } catch {}
}

export async function getItemAsync(key) {
  try { return sessionStorage.getItem(`securestore_${key}`); } catch { return null; }
}

export async function deleteItemAsync(key) {
  try { sessionStorage.removeItem(`securestore_${key}`); } catch {}
}

export async function isAvailableAsync() { return true; }

export const WHEN_UNLOCKED = 'WHEN_UNLOCKED';
export const WHEN_PASSCODE_SET_THIS_DEVICE_ONLY = 'WHEN_PASSCODE_SET_THIS_DEVICE_ONLY';
export const WHEN_UNLOCKED_THIS_DEVICE_ONLY = 'WHEN_UNLOCKED_THIS_DEVICE_ONLY';
export const AFTER_FIRST_UNLOCK = 'AFTER_FIRST_UNLOCK';
export const AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY = 'AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY';
export const ALWAYS = 'ALWAYS';
export const ALWAYS_THIS_DEVICE_ONLY = 'ALWAYS_THIS_DEVICE_ONLY';

export default {
  setItemAsync,
  getItemAsync,
  deleteItemAsync,
  isAvailableAsync,
};
