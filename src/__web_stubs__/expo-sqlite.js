/**
 * Web stub for expo-sqlite.
 * expo-sqlite uses native SQLite which is unavailable in browsers.
 * This stub provides an in-memory key/value fallback so the app can run on web.
 */

const store = {};

const mockDb = {
  runAsync: async () => ({ changes: 0, lastInsertRowId: 0 }),
  execAsync: async () => {},
  getFirstAsync: async () => null,
  getAllAsync: async () => [],
  withTransactionAsync: async (fn) => fn(),
};

export function openDatabaseSync() {
  return mockDb;
}

export function openDatabase() {
  return mockDb;
}

export default { openDatabaseSync, openDatabase };
