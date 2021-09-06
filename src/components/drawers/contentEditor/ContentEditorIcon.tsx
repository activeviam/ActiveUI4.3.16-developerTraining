/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useActiveUI} from '@activeviam/activeui-sdk';
import Icon, {IconProps} from 'antd/lib/icon';
import IconButton from '../../IconButton';

export function ContentEditorIcon(props: IconProps) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  return (
    <IconButton
      icon={Icon}
      tooltipTitle={translator.format('project.drawer.icons.content-editor')}
      tooltipPlacement="right"
      type="edit"
      {...props}
    />
  );
}
