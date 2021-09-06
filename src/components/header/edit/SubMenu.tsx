/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {SubMenuProps} from 'antd/lib/menu/SubMenu';
import {
  ActionsAware,
  useActiveUI,
  useSelectedRootDock,
} from '@activeviam/activeui-sdk';

export default function SubMenu(props: SubMenuProps) {
  const activeUI = useActiveUI();
  const {selectedRootDockApi} = useSelectedRootDock();
  return selectedRootDockApi ? (
    <ActionsAware
      actions={['undo', 'redo', 'separator', 'reset-dashboard']}
      widgetApi={selectedRootDockApi}
    >
      {(actionsProperties) => (
        <Menu.SubMenu
          {...props}
          title={
            <span>
              {activeUI.i18n
                .getTranslator()
                .format('project.header.actionGroups.edit')}
            </span>
          }
          key="edit"
        >
          {actionsProperties.map(
            ({isDisabled, execute, caption, Icon, key}, index) =>
              key === 'separator' ? (
                <Menu.Divider key={`${key}-${index}`} />
              ) : (
                <Menu.Item
                  data-testid={`MenuItem:${key}`}
                  disabled={isDisabled}
                  key={key}
                  onClick={execute}
                >
                  <Icon style={{marginRight: '8px'}} />
                  {caption}
                </Menu.Item>
              ),
          )}
        </Menu.SubMenu>
      )}
    </ActionsAware>
  ) : null;
}
