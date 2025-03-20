import { useTranslation } from 'react-i18next';

import AuthorizationPageView from './view';

const AuthPage = () => {
  const { t } = useTranslation();

  return <AuthorizationPageView t={t} />;
};

export default AuthPage;
