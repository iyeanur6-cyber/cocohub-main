/**
 * Web stub for react-native-ssl-pinning.
 * SSL pinning is native-only — on web all fetch calls pass through normally.
 */

export async function fetch(url, options = {}) {
  const { body, method = 'GET', headers = {} } = options;
  const res = await window.fetch(url, { method, headers, body });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }
  return { status: res.status, headers: Object.fromEntries(res.headers.entries()), bodyString: text, json: () => json };
}

export default { fetch };
