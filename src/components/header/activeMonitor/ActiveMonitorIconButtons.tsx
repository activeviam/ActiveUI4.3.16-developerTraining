/** @jsx jsx */
import {jsx, css, SerializedStyles} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {ActionsAware, useSelectedRootDock} from '@activeviam/activeui-sdk';

import IconButton from '../../IconButton';

const menuItemStyle = css`
  text-align: center;
  width: 64px;
  height: 100%;
  .ant-badge {
    width: 100%;
    height: 100%;
  }
  .ant-badge .ant-badge-dot {
    right: 14px;
    top: 14px;
  }
`;

type ActiveMonitorIconButtonsProps = {
  menuStyle: SerializedStyles;
};

export default function ActiveMonitorIconButtons({
  menuStyle,
}: ActiveMonitorIconButtonsProps) {
  const {selectedRootDockApi} = useSelectedRootDock();
  return selectedRootDockApi ? (
    <ActionsAware
      actions={['activemonitor-messages', 'activemonitor-alerts']}
      widgetApi={selectedRootDockApi}
    >
      {(actionsProperties) => {
        return (
          <Menu
            mode="horizontal"
            css={css`
              ${menuStyle};
              height: 100%;
            `}
            selectable={false}
          >
            {actionsProperties.map(
              ({isDisabled, execute, caption, Icon, key}) => (
                <Menu.Item
                  className="icon-menu-item"
                  css={menuItemStyle}
                  data-testid={`HeaderBar:${key}`}
                  disabled={isDisabled}
                  key={key}
                  onClick={execute}
                >
                  <IconButton
                    icon={Icon}
                    style={{margin: 0}}
                    tooltipPlacement="bottom"
                    tooltipTitle={caption}
                  />
                </Menu.Item>
              ),
            )}
          </Menu>
        );
      }}
    </ActionsAware>
  ) : null;
}
