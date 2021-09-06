/** @jsx jsx */
import {jsx} from '@emotion/core';
import AntDesignIcon, {IconProps} from 'antd/lib/icon';
import {Icon, useActiveUI} from '@activeviam/activeui-sdk';

import IconButton from '../../IconButton';

export function StateEditorIcon(props: IconProps) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  return (
    <IconButton
      icon={AntDesignIcon}
      tooltipTitle={translator.format('project.drawer.icons.state-editor')}
      tooltipPlacement="right"
      component={Icon.Brackets}
      {...props}
    />
  );
}
