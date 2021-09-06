/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Container} from '@activeviam/activeui-sdk';

const Dashboards = () => (
  <Container
    defaultValue={{
      name: '',
      value: {
        actions: [],
        quickActions: [],
        containerKey: 'bookmark-tree',
        showTitleBar: false,
        body: {restrictionType: 'dashboard'},
      },
      writable: false,
    }}
  />
);

export default Dashboards;
