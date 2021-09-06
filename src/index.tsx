// Note: The polyfill from 'react-app-polyfills/ie11' is not sufficient. You may remove these if you do not care about support for older browsers.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import 'whatwg-fetch';

import React, {Suspense} from 'react';
import {render} from 'react-dom';

import ApplicationLoadingBackground from './components/ApplicationLoadingBackground';
import './index.css';

const LazyApp = React.lazy(() => import('./App'));

// Render a nice background while loading ActiveUI SDK
render(
  <Suspense fallback={<ApplicationLoadingBackground />}>
    <LazyApp />
  </Suspense>,
  document.getElementById('root'),
);
