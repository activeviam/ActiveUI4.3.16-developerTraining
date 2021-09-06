/** @jsx jsx */
import {jsx} from '@emotion/core';
import AntDesignIcon, {IconProps} from 'antd/lib/icon';
import {useActiveUI} from '@activeviam/activeui-sdk';

import IconButton from '../../IconButton';

export function FiltersIcon(props: IconProps) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  return (
    <IconButton
      icon={AntDesignIcon}
      tooltipTitle={translator.format('project.drawer.icons.filters')}
      tooltipPlacement="right"
      type="filter"
      {...props}
    />
  );
}
