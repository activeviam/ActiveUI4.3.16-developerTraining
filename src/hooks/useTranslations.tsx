import {useState, useEffect} from 'react';
import {useActiveUI} from '@activeviam/activeui-sdk';

export default function useTranslations() {
  const {i18n} = useActiveUI();
  const [areTranslationsFetched, setAreTranslationsFetched] = useState(false);
  useEffect(() => {
    async function ensureTranslationsFetched() {
      await i18n.getTranslator().onReady();
      setAreTranslationsFetched(true);
    }
    ensureTranslationsFetched();
  }, [i18n]);
  return areTranslationsFetched;
}
