/**
 * Web stub for expo-task-manager.
 * Task manager is native-only — no-op on web.
 */

export function defineTask() {}
export async function isTaskRegisteredAsync() { return false; }
export async function getRegisteredTasksAsync() { return []; }
export async function unregisterAllTasksAsync() {}
export async function isTaskDefined() { return false; }

export default {
  defineTask,
  isTaskRegisteredAsync,
  getRegisteredTasksAsync,
  unregisterAllTasksAsync,
  isTaskDefined,
};
