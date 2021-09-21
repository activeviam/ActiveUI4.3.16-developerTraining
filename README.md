### About

This project provides a minimal application based on [ActiveUI SDK](https://activeviam.com/activeui/documentation).

### Before you start

You must install the following tools:

- [Node.js](https://nodejs.org) the JS engine running the scripts.
- [Yarn](https://yarnpkg.com) for dependency management. We recommend using Yarn instead of [npm](https://www.npmjs.com/), but you can use npm if you prefer.

Please find the minimal required versions in `package.json` of the starter package.

### Scripts

This module was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is setup with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to help you write clean and consistently formatted code.

The following commands are available:

- `yarn start` runs the app in development mode using Create React App's ['start' script](https://facebook.github.io/create-react-app/docs/available-scripts#npm-start).
- `yarn build` builds the app for production using Create React App's ['build' script](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-build).
- `yarn test` launches the tests using Create React App's ['test' script](https://facebook.github.io/create-react-app/docs/available-scripts#npm-test).
- `yarn check-style` lists the files that should be reformatted using [Prettier](https://prettier.io/).
- `yarn fix-style` reformats all files using [Prettier](https://prettier.io/).

### IDE Setup

If you are using VS Code, you can install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plugins and leverage these tools by adopting the following settings:

```js
"eslint.alwaysShowStatus": true, // To get improvements suggestions on the fly.
"eslint.autoFixOnSave": true,    // To automatically improve your code when it can be.
"editor.formatOnSave": true,     // To format automatically.
```

### Dependencies

Besides [ActiveUI SDK](https://activeviam.com/activeui/documentation), this application comes with the following main runtime dependencies:

- [React](https://reactjs.org/): a JavaScript library for building user interfaces.
- [Ant Design](https://ant.design/): a design system and React UI library that contains a set of high quality components for building rich, interactive user interfaces.
- [Emotion](https://emotion.sh): a library designed for writing css styles with JavaScript.

### End-to-end testing

A [Cypress](https://docs.cypress.io/) setup is available, allowing you to add end-to-end tests to the application.
We've written on why we prefer Cypress over some other solutions [in a blog post](https://activeviam.com/blog/puppeteer-vs-cypress-best-end-end-testing/).
Two commands are available to run the tests:

- `yarn test-e2e` runs all tests headlessly in an Electron browser.
- `yarn test-e2e-debug` opens an interactive window allowing you to choose which test(s) you want to run.

An example test is available in `cypress/integration/dashboards-drawer.spec.js`.
In `cypress/support/addLoginCommand.js`, you will find an example of a custom Cypress command to login into the application.
To run the existing test, you will first need to specify your server url, as well as the application credentials as environment variables in `cypress.env.json`.

### Environment-Specific Configuration

You can configure your ActivePivot URL and others through environment variables, query parameters, or variables defined on window.

#### Query Parameters

- `url` - Can be used to override all other server URLs.
- `activePivotServerUrl` - ActivePivot server URL.
- `activeMonitorServerUrl` - ActiveMonitor server URL.
- `contentServerUrl` - Content server URL.

#### Environment Variables

- `REACT_APP_ACTIVE_PIVOT_SERVER_URL` - ActivePivot server URL.
- `REACT_APP_ACTIVE_MONITOR_SERVER_URL` - ActiveMonitor server URL.
- `REACT_APP_CONTENT_SERVER_URL` - Content server URL.

#### Variables on Window

In some situations you may be required to deploy a single build to different environments and have it target different URLs.
In this case the URL must be defined at runtime.
There are two builtin ways to accomplish this. One is using query parameters.
The other is using `.js` files that are not compiled, and are served directly.

For this app you can define Environment variables within the `env.*.js` files under `public`.

- `window.env.activePivotServerUrl` - ActivePivot server URL.
- `window.env.activeMonitorServerUrl` - ActiveMonitor server URL.
- `window.env.contentServerUrl` - Content server URL.

#### Precedence Order

- `url` query parameter.
- Specific query parameter, e.g. `activePivotServerUrl`.
- Specific variable on window, e.g. `window.env.activePivotServerUrl`.
- Specific environment variables, e.g. `REACT_APP_ACTIVE_PIVOT_SERVER_URL`.
- If none of those are defined then we fallback to connecting to the base URL the app is served at.
  e.g. If the app is served at `http://example.com:8080/app` then we will try to connect to `http://example.com:8080`.
