import useLoggedIn from './useLoggedIn';
import useTranslations from './useTranslations';

export default function useInitialization() {
  const isLoggedIn = useLoggedIn();
  const areTranslationsFetched = useTranslations();
  return {isLoggedIn, areTranslationsFetched};
}
