import {store} from '../state/store';
import {onClickedOpenContentEditor} from '../state/events';

const createProperties = () => {
  return {
    isAvailable() {
      return true;
    },
    execute() {
      store.dispatch(onClickedOpenContentEditor());
    },
  };
};

export const OpenContentEditorPlugin = {
  key: 'open-content-editor',
  createProperties,
};
