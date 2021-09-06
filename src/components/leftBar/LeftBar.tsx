/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {useSelector, useDispatch} from 'react-redux';
import styleConfiguration from '../../configurations/style';
import {getSelectedDrawer} from '../../state/selectedDrawerReducer';
import {availableDrawers, DrawerKey} from '../drawers/availableDrawers';
import {leftBarWidth} from '../AuthenticatedApp';
import {onClickedDrawerIcon} from '../../state/events';
import {useDisplayMode, DisplayMode} from '@activeviam/activeui-sdk';
import {useEffect} from 'react';

const LeftBar = () => {
  const selectedDrawer = useSelector(getSelectedDrawer);
  const dispatch = useDispatch();
  const {displayMode} = useDisplayMode();

  useEffect(() => {
    if (
      displayMode === DisplayMode.VIEW &&
      selectedDrawer === DrawerKey.contentEditor
    ) {
      dispatch(onClickedDrawerIcon(DrawerKey.filters));
    } else if (
      displayMode === DisplayMode.EDIT &&
      selectedDrawer === DrawerKey.filters
    ) {
      dispatch(onClickedDrawerIcon(DrawerKey.contentEditor));
    } else if (
      selectedDrawer &&
      !availableDrawers[selectedDrawer].isVisible(displayMode)
    ) {
      dispatch(onClickedDrawerIcon(null));
    }
  }, [displayMode, selectedDrawer, dispatch]);

  return (
    <Menu
      selectedKeys={selectedDrawer !== null ? [selectedDrawer] : undefined}
      css={{
        marginBottom: 0,
        width: leftBarWidth,
        backgroundColor: `${styleConfiguration.colors.barBackgroundColor} !important`,
        color: `${styleConfiguration.colors.leftBarIconColor} !important`,
        '& .ant-menu-item-selected': {
          backgroundColor: `${styleConfiguration.colors.leftBarSelectedBackgroundColor} !important`,
          color: `${styleConfiguration.colors.leftBarSelectedIconColor} !important`,
        },
      }}
    >
      {Object.entries(availableDrawers)
        .filter(([key, {isVisible}]) => isVisible(displayMode))
        .map(([key, {Icon}]) => (
          <Menu.Item
            // Amending the item padding to give room to the icon, which has a margin-right: 10px by default.
            onClick={() => dispatch(onClickedDrawerIcon(key as DrawerKey))}
            key={key}
            style={{padding: '0px', width: '100%'}}
            data-testid={`DrawersBar:${key}`}
          >
            <Icon style={{fontSize: 16}} />
          </Menu.Item>
        ))}
    </Menu>
  );
};

export default LeftBar;
