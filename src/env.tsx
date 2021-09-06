const params = new URLSearchParams(window.location.search);

/**
 * Get a URL by following a precedence order.
 * @param key - Camelcase key for the variable. e.g. myVar
 * @param envVar - The value from an environment variable. e.g. REACT_APP_MY_VAR
 */
const getUrl = (key: string, envVar: string | undefined) =>
  // "url" in query parameter.
  params.get('url') ||
  // Specific URL in query parameter.
  params.get(key) ||
  // Specific URL on window.env.
  (window.env && window.env[key]) ||
  // Specific URL from environment variable.
  envVar ||
  // The default runtime url, which is the base of the URL this is served at.
  `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }`;

export const activePivotServerUrl = getUrl(
  'activePivotServerUrl',
  process.env.REACT_APP_ACTIVE_PIVOT_SERVER_URL,
);

export const activeMonitorServerUrl = getUrl(
  'activeMonitorServerUrl',
  process.env.REACT_APP_ACTIVE_MONITOR_SERVER_URL,
);

export const contentServerUrl = getUrl(
  'contentServerUrl',
  process.env.REACT_APP_CONTENT_SERVER_URL,
);

const getBaseUrl = () => {
  const fullClientUrl = window.location.href;
  const hashIndex = fullClientUrl.indexOf('#');
  return hashIndex === -1
    ? fullClientUrl
    : fullClientUrl.substring(0, hashIndex);
};

export const baseUrl = getBaseUrl();
