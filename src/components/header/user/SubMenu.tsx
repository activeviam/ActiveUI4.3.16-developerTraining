/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {SubMenuProps} from 'antd/lib/menu/SubMenu';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';
import {ThemeDescription, useActiveUI} from '@activeviam/activeui-sdk';

const {confirm} = Modal;
const localeSettingKey = "global.locale";
const themeSettingKey = "global.theme";

export default function SubMenu(props: SubMenuProps) {
  const activeUI = useActiveUI();
  const username = activeUI.security.getUsername();
  const translator = activeUI.i18n.getTranslator();

  const themes: any = activeUI.theming;
  const settings = activeUI.settings;
  const i18n  = activeUI.i18n;

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

        {/*TODO: Ex-2 generate menu items by lopping through themes.listThemes(). Please note that there is a typo in the ThemeDescription interface and that we should circumvent this by defining the themes as any*/}

    </Menu.SubMenu>
  );
}
