import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthorizationPageView from './view';

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <AuthorizationPageView
      t={t}
      setShowSignIn={setShowSignIn}
      showSignIn={showSignIn}
    />
  );
};

export default AuthPage;
