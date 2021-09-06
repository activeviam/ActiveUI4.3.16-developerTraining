/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {SubMenuProps} from 'antd/lib/menu/SubMenu';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';
import {useActiveUI} from '@activeviam/activeui-sdk';

const {confirm} = Modal;

export default function SubMenu(props: SubMenuProps) {
  const activeUI = useActiveUI();
  const username = activeUI.security.getUsername();
  const translator = activeUI.i18n.getTranslator();
  return (
    <Menu.SubMenu {...props} title={<span>{username}</span>}>
      <Menu.Item
        data-testid="MenuItem:logout"
        onClick={() =>
          confirm({
            title: translator.format('confirmation.logout.title', {
              username,
            }),
            content: translator.format('confirmation.logout.content', {
              username,
            }),
            onOk() {
              activeUI.security.logout().then(() => window.location.reload());
            },
          })
        }
      >
        <Icon type="logout" style={{marginRight: '8px'}} />
        {translator.format('bookmarks.dashboard.logout')}
      </Menu.Item>
    </Menu.SubMenu>
  );
}
