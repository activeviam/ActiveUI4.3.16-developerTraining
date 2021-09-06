/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Container} from '@activeviam/activeui-sdk';

const StateEditor = () => (
  <Container
    defaultValue={{
      name: '',
      value: {
        actions: [],
        quickActions: [],
        containerKey: 'state-editor',
        showTitleBar: false,
      },
      writable: false,
    }}
  />
);

export default StateEditor;
