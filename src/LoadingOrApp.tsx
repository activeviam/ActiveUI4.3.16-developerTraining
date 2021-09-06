import React from 'react';

import useInitialization from './hooks/useInitialization';
import {AuthenticatedApp} from './components/AuthenticatedApp';
import ApplicationLoadingBackground from './components/ApplicationLoadingBackground';

/**
 * Make sure the user is logged in and the translations have been fetched.
 * In the meantime, display a loading screen.
 *
 * Note that by default ActiveUI-SDK automatically renders a login popup when no
 * user is logged in, so you don't have to implement it yourself.
 */
export default function LoadingOrApp() {
  const {isLoggedIn, areTranslationsFetched} = useInitialization();
  if (!isLoggedIn || !areTranslationsFetched) {
    return <ApplicationLoadingBackground />;
  }
  return <AuthenticatedApp />;
}
