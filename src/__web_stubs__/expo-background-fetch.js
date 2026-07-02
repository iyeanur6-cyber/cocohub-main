/**
 * Web stub for expo-background-fetch.
 * Background fetch is a native-only feature — no-op on web.
 */

export const BackgroundFetchResult = {
  NoData: 1,
  NewData: 2,
  Failed: 3,
};

export const BackgroundFetchStatus = {
  Denied: 1,
  Restricted: 2,
  Available: 3,
};

export async function registerTaskAsync() {}
export async function unregisterTaskAsync() {}
export async function getStatusAsync() { return BackgroundFetchStatus.Denied; }
export async function setMinimumIntervalAsync() {}

export default {
  registerTaskAsync,
  unregisterTaskAsync,
  getStatusAsync,
  setMinimumIntervalAsync,
  BackgroundFetchResult,
  BackgroundFetchStatus,
};
