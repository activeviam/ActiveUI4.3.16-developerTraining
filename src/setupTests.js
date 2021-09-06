// This module is executed once before tests are run.
// See https://facebook.github.io/create-react-app/docs/running-tests#src-setuptestsjs

// To have tests more runtime-like, and to avoid the checkAntDesignStyleScoping error thrown by ActiveUI-SDK.
document.body.className = 'ant-root';

// Setup environment variable mocks.
global.process.env = {
  REACT_APP_ACTIVE_PIVOT_SERVER_URL: 'test-activepivot-server-url',
  REACT_APP_ACTIVE_MONITOR_SERVER_URL: 'test-activemonitor-server-url',
  REACT_APP_CONTENT_SERVER_URL: 'test-content-server-url',
};
