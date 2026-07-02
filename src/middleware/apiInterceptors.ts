import {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { applySchemaMapping } from './schemaMapper';
import { recordApiTiming } from '../services/performanceService';

export const setupInterceptors = (apiClient: AxiosInstance): void => {
  type TimedConfig = InternalAxiosRequestConfig & { metadata?: { startedAt: number } };

  // Request: timing metadata only — token injection is handled by apiClient.ts
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      (config as TimedConfig).metadata = { startedAt: Date.now() };
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response: schema mapping + timing + consistent error format
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return applySchemaMapping(response);
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Consistent error message
      const message = error.response
        ? `Request failed with status ${error.response.status}`
        : (error.message ?? 'Network error');

      const startedAt = (error.config as TimedConfig | undefined)?.metadata?.startedAt;
      if (startedAt) {
        await recordApiTiming(
          originalRequest?.url ?? 'unknown',
          originalRequest?.method ?? 'get',
          Date.now() - startedAt,
          error.response?.status,
        );
      }
      return Promise.reject(new Error(message));
    },
  );
};
