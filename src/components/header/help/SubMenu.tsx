/** @jsx jsx */
import {jsx} from '@emotion/core';
import Menu from 'antd/lib/menu';
import {SubMenuProps} from 'antd/lib/menu/SubMenu';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';
import {
  ActionsAware,
  ActiveUIProvider,
  useActiveUI,
  useSelectedRootDock,
} from '@activeviam/activeui-sdk';

import {startBookmark} from '../../../configurations/startBookmark';

import AboutPopup from './aboutPopup/AboutPopup';
import {DocumentationLink} from './DocumentationLink';

const {info} = Modal;

export default function SubMenu(props: SubMenuProps) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  const {selectedRootDockApi} = useSelectedRootDock();
  return selectedRootDockApi ? (
    <ActionsAware
      actions={[
        {
          key: 'new-dashboard',
          args: {
            newDashboardBookmark: startBookmark(
              translator.format('project.start.pageLabel'),
            ),
          },
        },
      ]}
      widgetApi={selectedRootDockApi}
    >
      {(actionsProperties) => (
        <Menu.SubMenu
          {...props}
          title={
            <span>{translator.format('project.header.actionGroups.help')}</span>
          }
          key="help"
        >
          <Menu.Item
            data-testid={'MenuItem:start-page'}
            onClick={() => {
              const {execute} = actionsProperties[0];
              execute();
            }}
          >
            <Icon type="rocket" style={{marginRight: '8px'}} />
            {translator.format('project.start.pageLink')}
          </Menu.Item>
          <Menu.Item>
            <DocumentationLink
              version={activeUI.about.packageVersion}
              page="user/index.html"
            >
              <Icon type="bulb" style={{marginRight: '8px'}} />
              {translator.format('project.documentation')}
            </DocumentationLink>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              info({
                title: translator.format('popup.about.title'),
                content: (
                  <ActiveUIProvider activeUI={activeUI}>
                    <AboutPopup />
                  </ActiveUIProvider>
                ),
              });
            }}
          >
            <Icon type="question" style={{marginRight: '8px'}} />
            {translator.format('bookmarks.dashboard.about')}
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </ActionsAware>
  ) : null;
}
