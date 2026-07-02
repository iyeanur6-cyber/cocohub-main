/**
 * Web stub for expo-in-app-purchases.
 * In-app purchases are native-only — no-op on web.
 */

export const IAPResponseCode = { OK: 0, USER_CANCELED: 1, ERROR: 2, DEFERRED: 3 };
export const IAPItemType = { PURCHASE: 'inapp', SUBSCRIPTION: 'subs' };

export async function connectAsync() {}
export async function disconnectAsync() {}
export async function getProductsAsync() { return { responseCode: IAPResponseCode.OK, results: [] }; }
export async function purchaseItemAsync() { return { responseCode: IAPResponseCode.ERROR }; }
export async function getPurchaseHistoryAsync() { return { responseCode: IAPResponseCode.OK, results: [] }; }
export async function getBillingResponseCodeAsync() { return IAPResponseCode.ERROR; }
export async function finishTransactionAsync() {}
export async function acknowledgePurchaseAsync() {}

export default {
  connectAsync,
  disconnectAsync,
  getProductsAsync,
  purchaseItemAsync,
  getPurchaseHistoryAsync,
  finishTransactionAsync,
  IAPResponseCode,
  IAPItemType,
};
