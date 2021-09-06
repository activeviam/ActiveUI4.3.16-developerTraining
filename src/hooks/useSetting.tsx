import {useState, useEffect} from 'react';
import {useActiveUI} from '@activeviam/activeui-sdk';

function useSetting(settingKey: string) {
  const activeUI = useActiveUI();
  const [settingValue, setSettingValue] = useState(null);

  useEffect(() => {
    async function syncSettings() {
      await activeUI.settings.onSync();
      setSettingValue(activeUI.settings.get(settingKey));
    }
    syncSettings();
  }, [activeUI, settingKey]);

  return settingValue;
}

export default useSetting;
