import crashReporting from './crashReporting';
import config from '../config';

// Use raw fetch — NOT apiClient/resilientRequest — to avoid circular error loops
// where a failed API call logs an error which calls the API again.
async function sendToServer(payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch(`${config.api.baseUrl}/errors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Backend unavailable — swallow silently, logging is best-effort
  }
}

async function logError(err: unknown, meta: string | Record<string, unknown> = ''): Promise<void> {
  try {
    const payload = {
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      meta,
      timestamp: Date.now(),
    };

    // Dev console visibility
    console.error('[ErrorLogger]', payload);

    // Forward to Sentry
    crashReporting.captureException(err instanceof Error ? err : new Error(String(err)), {
      meta: typeof meta === 'string' ? { info: meta } : meta,
    });

    // Best-effort send to backend
    void sendToServer(payload);
  } catch {
    // final fallback — do nothing
  }
}

export default { logError };
