/** @jsx jsx */
import {jsx, CSSObject} from '@emotion/core';
import {Container, useActiveUI} from '@activeviam/activeui-sdk';
import Collapse from 'antd/lib/collapse';

const Panel = Collapse.Panel;

type WidgetContainerProps = {
  containerKey: string;
  bodyStyle?: CSSObject;
};

const WidgetContainer = ({containerKey, bodyStyle}: WidgetContainerProps) => (
  <Container
    defaultValue={{
      name: '',
      value: {
        actions: [],
        quickActions: [],
        containerKey,
        showTitleBar: false,
        body: {restrictionType: 'widget'},
        style: {body: bodyStyle},
      },
      writable: false,
    }}
  />
);

const collapseStyle: CSSObject = {
  borderRadius: '0 !important',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  '.ant-collapse-content-active': {
    display: 'flex',
    flexGrow: 1,
  },
  '.ant-collapse-item-active': {
    flexGrow: 1,
    height: '50%',
  },
  '.ant-collapse-content-box': {
    width: '100%',
  },
};

const panelStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
};

export enum DrawerSection {
  defaultWidgets = 'defaultWidgets',
  savedWidgets = 'savedWidgets',
}

interface WidgetsProps {
  activeSections: DrawerSection[] | DrawerSection;
  onActiveSectionsChange: (key: string | string[]) => void;
}

export default function Widgets({
  activeSections,
  onActiveSectionsChange,
}: WidgetsProps) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  return (
    <Collapse
      css={collapseStyle}
      activeKey={activeSections}
      onChange={onActiveSectionsChange}
      bordered={false}
    >
      <Panel
        css={panelStyle}
        header={translator.format('project.drawer.widgetsDrawer.savedWidgets')}
        key={'savedWidgets'}
      >
        <WidgetContainer containerKey={'bookmark-tree'} />
      </Panel>
      <Panel
        css={panelStyle}
        header={translator.format(
          'project.drawer.widgetsDrawer.defaultWidgets',
        )}
        key={'defaultWidgets'}
      >
        <WidgetContainer
          containerKey={'widget-chooser'}
          bodyStyle={{overflowY: 'auto', marginRight: 7}}
        />
      </Panel>
    </Collapse>
  );
}
