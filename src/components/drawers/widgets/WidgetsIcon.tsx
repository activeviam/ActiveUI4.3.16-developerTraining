/** @jsx jsx */
import {jsx} from '@emotion/core';
import AntDesignIcon, {IconProps} from 'antd/lib/icon';
import {Icon, useActiveUI} from '@activeviam/activeui-sdk';

import IconButton from '../../IconButton';

export function WidgetsIcon(props: IconProps) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  return (
    <IconButton
      icon={AntDesignIcon}
      tooltipTitle={translator.format('project.drawer.icons.widgets')}
      tooltipPlacement="right"
      component={Icon.Puzzle}
      {...props}
    />
  );
}
