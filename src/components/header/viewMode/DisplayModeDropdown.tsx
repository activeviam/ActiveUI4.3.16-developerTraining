import React from 'react';
import {Icon, Dropdown, Menu, Button} from 'antd';

import {
  useDisplayMode,
  DisplayMode,
  useActiveUI,
  Translator,
} from '@activeviam/activeui-sdk';

const DisplayModeMenuItemLabel = ({
  displayMode,
  translator,
}: {
  displayMode: DisplayMode;
  translator: Translator;
}) => (
  <React.Fragment>
    <div style={{marginRight: 8}}>
      {displayMode === DisplayMode.EDIT ? (
        <Icon type="edit" />
      ) : (
        <Icon type="eye" />
      )}
    </div>
    <div
      style={{
        marginRight: 'auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {translator.format(`displayMode.state.${displayMode}`)}
    </div>
  </React.Fragment>
);

export const DisplayModeDropdown = () => {
  const {displayMode, canChangeDisplayMode, setDisplayMode} = useDisplayMode();
  const {i18n} = useActiveUI();
  const translator = i18n.getTranslator();
  const isDisabled = !canChangeDisplayMode();
  const buttonStyle = isDisabled
    ? {
        color: 'rgba(255,255,255,0.45)',
      }
    : {};

  return (
    <Dropdown
      disabled={isDisabled}
      trigger={['click']}
      overlay={
        <Menu
          selectedKeys={[displayMode]}
          onClick={({key}) => {
            const newDisplayMode = key as DisplayMode;
            setDisplayMode(newDisplayMode);
          }}
        >
          <Menu.Item
            key={DisplayMode.EDIT}
            data-testid={`ActiveUI:DisplayModeDropdown:trigger${DisplayMode.EDIT}`}
          >
            <div style={{display: 'flex', width: 116}}>
              <DisplayModeMenuItemLabel
                displayMode={DisplayMode.EDIT}
                translator={translator}
              />
            </div>
          </Menu.Item>
          <Menu.Item
            key={DisplayMode.VIEW}
            data-testid={`ActiveUI:DisplayModeDropdown:trigger${DisplayMode.VIEW}`}
          >
            <div style={{display: 'flex', width: 116}}>
              <DisplayModeMenuItemLabel
                displayMode={DisplayMode.VIEW}
                translator={translator}
              />
            </div>
          </Menu.Item>
        </Menu>
      }
    >
      <Button
        type="link"
        style={{
          ...buttonStyle,
          display: 'flex',
          width: 140,
          paddingLeft: 12,
        }}
        data-testid={'ActiveUI:DisplayModeDropdown'}
      >
        <DisplayModeMenuItemLabel
          displayMode={displayMode}
          translator={translator}
        />

        <div
          style={{
            marginLeft: 4,
          }}
        >
          <Icon type="down" />
        </div>
      </Button>
    </Dropdown>
  );
};
