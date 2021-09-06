import React from 'react';
import {useDispatch} from 'react-redux';

import {
  DrawerKey,
  availableDrawers,
} from '../components/drawers/availableDrawers';
import {onToggledDrawerWithKeyboardShortcut} from '../state/events';
import {useDisplayMode} from '@activeviam/activeui-sdk';

const keyToDrawer: {[key: string]: DrawerKey} = {
  '67': DrawerKey.contentEditor, // C
  '68': DrawerKey.dashboards, // D
  '83': DrawerKey.stateEditor, // S
  '87': DrawerKey.widgets, // W
  '70': DrawerKey.filters, // F
  '89': DrawerKey.styleEditor, // Y
};

export function useKeyboardShortcuts() {
  const dispatch = useDispatch();
  const {displayMode} = useDisplayMode();

  React.useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (!event.altKey) {
        return;
      }
      const drawer = keyToDrawer[event.keyCode];
      if (drawer && availableDrawers[drawer].isVisible(displayMode)) {
        dispatch(onToggledDrawerWithKeyboardShortcut(drawer));
        event.preventDefault();
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [dispatch, displayMode]);
}
