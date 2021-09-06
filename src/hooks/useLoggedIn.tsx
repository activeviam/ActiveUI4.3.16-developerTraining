import React from 'react';
import {useActiveUI} from '@activeviam/activeui-sdk';
export default function useLoggedIn(): boolean {
  const activeUI = useActiveUI();
  const [loggedIn, setLoggedIn] = React.useState(
    activeUI.security.getUsername() !== undefined,
  );
  React.useEffect(() => {
    async function checkLoggedIn() {
      try {
        await activeUI.security.getRequestOptions();
      } catch {
        // if the login attempt failed, the rest querier throws with a 401 that
        // the security plugin will pass by rejecting the promise.
        setLoggedIn(false);
        return false;
      }
      setLoggedIn(true);
      return true;
    }
    /**
     * We could do without the loop because many different calls
     * are made to `getRequestOptions()` upon loading and there is a maximum number
     * of retries that is inferior to that.
     * But to be thorough we should not rely on that and have our own retry mechanism.
     */
    async function checkLoggedInLoop() {
      let localLoggedIn = loggedIn;
      while (!localLoggedIn) {
        localLoggedIn = await checkLoggedIn();
      }
    }
    if (!loggedIn) {
      checkLoggedInLoop();
    }
  }, [activeUI, loggedIn]);
  return loggedIn;
}
