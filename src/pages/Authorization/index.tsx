import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Authorization from './view';

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <Authorization
      t={t}
      setShowSignIn={setShowSignIn}
      showSignIn={showSignIn}
    />
  );
};

export default AuthPage;
