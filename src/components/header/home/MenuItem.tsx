/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {ActionsAware, useSelectedRootDock} from '@activeviam/activeui-sdk';

export default function MenuItem(
  props: React.ComponentProps<typeof Menu.Item>,
) {
  const {selectedRootDockApi} = useSelectedRootDock();
  return selectedRootDockApi ? (
    <ActionsAware actions={['home']} widgetApi={selectedRootDockApi}>
      {(actionsProperties) => {
        const {isDisabled, execute, caption} = actionsProperties[0];
        return (
          <Menu.Item {...props} disabled={isDisabled} onClick={execute}>
            {caption}
          </Menu.Item>
        );
      }}
    </ActionsAware>
  ) : null;
}
