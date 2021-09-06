/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
  ActionsAware,
  useActiveUI,
  useSelectedRootDock,
  ReactContainerComponentProps,
} from '@activeviam/activeui-sdk';
import Icon from 'antd/lib/icon';
import {useDispatch} from 'react-redux';
import Button from 'antd/lib/button';
import Title from 'antd/lib/typography/Title';
import {DocumentationLink} from './header/help/DocumentationLink';
import {onClickedOpenDashboardOnStartPage} from '../state/events';
import {FC} from 'react';

export const startPluginKey = 'start';

const startSection = {
  marginBottom: 24,
  lineHeight: '24px',
};

const Start: FC<ReactContainerComponentProps> = function () {
  const dispatch = useDispatch();
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  const translate = translator.format.bind(translator);
  const version = activeUI.about.packageVersion;
  const {selectedRootDockApi} = useSelectedRootDock();
  return (
    <div
      css={{
        marginLeft: 40,
        marginTop: 40,
        ul: {
          listStyleType: 'none',
          paddingLeft: 0,
          '.ant-btn-link': {
            padding: 0,
            height: 19,
          },
        },
      }}
    >
      <Title level={2} style={{margin: 0}}>
        ActiveUI
      </Title>
      <Title level={3} type="secondary" style={{margin: 0}}>
        {translate('project.start.subTitle')}
      </Title>
      <Title level={4}>
        <Icon type="rocket" />
        &nbsp;
        {translate('project.start.startSectionTitle')}
      </Title>
      <div css={startSection}>
        <ul>
          <li>
            {selectedRootDockApi ? (
              <ActionsAware
                actions={['new-dashboard']}
                widgetApi={selectedRootDockApi}
              >
                {(actionsProperties) =>
                  actionsProperties.map(({execute, key}) => (
                    <Button key={key} type="link" onClick={execute}>
                      {translate('project.start.startNewDashboard')}
                    </Button>
                  ))
                }
              </ActionsAware>
            ) : null}
          </li>
          <li>
            <Button
              onClick={() => dispatch(onClickedOpenDashboardOnStartPage())}
              type="link"
            >
              {translate('project.start.startOpen')}
            </Button>
          </li>
        </ul>
      </div>
      <Title level={4}>
        <Icon type="bulb" />
        &nbsp;
        {translate('project.start.helpSectionTitle')}
      </Title>
      <div css={startSection}>
        <ul>
          <li>
            {translate('project.start.whatIsIt')}
            <DocumentationLink version={version} page="user/activeui.html">
              {translate('project.start.helpWhatIsIt')}
            </DocumentationLink>
            ?
          </li>
          <li>
            <DocumentationLink version={version} page="user/what-is-new.html">
              {translate('project.start.helpWhatsNew')}
            </DocumentationLink>
          </li>
          <li>
            <DocumentationLink version={version} page="user/index.html">
              {translate('project.start.helpUserGuide')}
            </DocumentationLink>
          </li>
          <li>
            <DocumentationLink
              version={version}
              page="user/features/keyboard-shortcuts.html"
            >
              {translate('project.start.helpKeyboardShortcuts')}
            </DocumentationLink>
          </li>
          <li>
            <DocumentationLink
              version={version}
              page="user/advanced/mdx-resources.html"
            >
              {translate('project.start.helpMDXResources')}
            </DocumentationLink>
          </li>
        </ul>
      </div>
      <Title level={4}>
        <Icon type="mail" />
        &nbsp;
        {translate('project.start.supportSectionTitle')}
      </Title>
      <div css={startSection}>
        {translate('project.start.supportInfo')}
        <a
          href="https://support.activeviam.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {translate('project.start.supportReportIssue')}
        </a>
      </div>
    </div>
  );
};

export const StartCustomContainerPlugin = {
  key: startPluginKey,
  staticProperties: {
    choosableFromUI: false,
    component: Start,
  },
};
