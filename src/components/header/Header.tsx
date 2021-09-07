/** @jsx jsx */

import {jsx, css} from '@emotion/core';
import Layout from 'antd/lib/layout';
import Title from 'antd/lib/typography/Title';
import AntMenu, {MenuProps as AntMenuProps} from 'antd/lib/menu';

import Logo from './Logo';
import HomeMenuItem from './home/MenuItem';
import HelpSubMenu from './help/SubMenu';
import UserSubMenu from './user/SubMenu';
import EditSubMenu from './edit/SubMenu';
import FileSubMenu from './file/SubMenu';
import ActiveMonitorIconButtons from './activeMonitor/ActiveMonitorIconButtons';
import styleConfiguration from '../../configurations/style';
import {DisplayModeDropdown} from './viewMode/DisplayModeDropdown';

const borderStyle = `2px solid ${styleConfiguration.colors.barBackgroundColor} !important`;

const menuStyle = css`
  background-color: ${styleConfiguration.colors.barBackgroundColor} !important;
  color: ${styleConfiguration.colors.textColor} !important;

  &.ant-menu .icon-menu-item {
    padding: 0;
  }

  .ant-menu-item:not(:hover) {
    border-bottom: ${borderStyle};
  }
  .ant-menu-submenu:not(:hover) {
    border-bottom: ${borderStyle};
  }
`;

/* TO DO
 * Remove the type defintion of ExtraMenuProps when the issue explained below is solved.
 * We currently need to add this type definition as triggerSubMenuAction is not an antd props,
 * but a rc-menu one, and is not typed in the antd MenuProps type defintion.
 * Here is the link to the open issue on antd repo: https://github.com/ant-design/ant-design/issues/17551
 */
type ExtraMenuProps = {
  children: React.ReactNode;
  triggerSubMenuAction?: string;
};

type MenuProps = AntMenuProps & ExtraMenuProps;

const Menu = (props: MenuProps) => <AntMenu {...props} />;

type Props = {
  title: string;
  height: number;
};

const Header = ({title, height}: Props) => (
  <Layout.Header
    style={{
      height,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'red',
    }}
  >
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <Logo />
      <Title
        data-testid={'ApplicationTitle'}
        level={4}
        style={{
          fontWeight: 600,
          margin: 0,
          color: '#fff',
          height: `${height}px`,
          lineHeight: `${height}px`,
        }}
      >
        {title}
      </Title>
    </div>
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 100%;
      `}
    >
      <ActiveMonitorIconButtons menuStyle={menuStyle} />
      <Menu
        mode="horizontal"
        triggerSubMenuAction="click"
        selectable={false}
        css={menuStyle}
      >
        <HomeMenuItem data-testid="HeaderSubMenu:Home" />
        <FileSubMenu data-testid="HeaderSubMenu:File" />
        <EditSubMenu data-testid="HeaderSubMenu:Edit" />
        <HelpSubMenu data-testid="HeaderSubMenu:Help" />
        <UserSubMenu data-testid="HeaderSubMenu:Username" />
      </Menu>
      <DisplayModeDropdown />
    </div>
  </Layout.Header>
);

export default Header;
