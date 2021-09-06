/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {SubMenuProps} from 'antd/lib/menu/SubMenu';
import {
  ActionsAware,
  useActiveUI,
  useSelectedRootDock,
} from '@activeviam/activeui-sdk';
import {baseUrl} from '../../../env';

export const serializedShareAction = {
  key: 'share',
  args: {
    urlPattern: {
      dashboard: `${baseUrl}#/dashboard/\${bookmarkId}`,
      widget: `${baseUrl}#/widget/\${bookmarkId}`,
    },
  },
};

export default function SubMenu(props: SubMenuProps) {
  const activeUI = useActiveUI();
  const {selectedRootDockApi} = useSelectedRootDock();

  return selectedRootDockApi ? (
    <ActionsAware
      actions={[
        serializedShareAction,
        'separator',
        'new-dashboard',
        'save',
        'save-as',
      ]}
      widgetApi={selectedRootDockApi}
    >
      {(actionsProperties) => (
        <Menu.SubMenu
          {...props}
          title={
            <span>
              {activeUI.i18n
                .getTranslator()
                .format('project.header.actionGroups.file')}
            </span>
          }
          key="file"
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
