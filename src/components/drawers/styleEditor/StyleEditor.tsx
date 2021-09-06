/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Container, useActiveUI} from '@activeviam/activeui-sdk';
import {getConfigurationSettingKey} from '../contentEditor/ContentEditor';

const containerPluginKey = 'style-editor';

const styleEditorConfigurationSettingKey = getConfigurationSettingKey(
  containerPluginKey,
);

export default function ContentEditor() {
  const {settings} = useActiveUI();

  return (
    <div css={{display: 'flex', height: '100%'}}>
      <Container
        defaultValue={{
          name: '',
          type: 'container',
          value: {
            actions: [],
            quickActions: [],
            // Use the last saved configuration as initial value.
            body: settings.get(styleEditorConfigurationSettingKey),
            containerKey: containerPluginKey,
            showTitleBar: false,
          },
          writable: false,
        }}
        onChange={(newBookmark) => {
          // Save the configuration when it changes.
          const configuration = newBookmark && newBookmark.value.body;
          settings.set(styleEditorConfigurationSettingKey, configuration);
        }}
      />
    </div>
  );
}
