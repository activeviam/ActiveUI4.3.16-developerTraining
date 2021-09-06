/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Container} from '@activeviam/activeui-sdk';

const Dashboards = () => (
  <Container
    defaultValue={{
      // TODO: enable "toggle-dock-title-bar" under actions and "add-server" under quickActions to enable the relevant quick action  menu
      name: '',
      value: {
        actions: ["toggle-dock-title-bar"],
        quickActions: ["add-server"],
        containerKey: 'bookmark-tree',
        showTitleBar: false,
        body: {restrictionType: 'dashboard'},
      },
      writable: false,
    }}
  />
);

export default Dashboards;
