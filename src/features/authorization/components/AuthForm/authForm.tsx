import LoginForm from 'features/authorization/components/LogInForm';
import SignUpForm from 'features/authorization/components/SignUpForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);

  const { t } = useTranslation();

  if (showSignIn) {
    return (
      <>
        <h2>{t('Sign in')}</h2>
        <LoginForm />
        <p onClick={() => setShowSignIn(false)} className="my-2 cursor-pointer">
          {t('New to billionstracker')}? <span>{t('Sign up')}</span>
        </p>
      </>
    );
  }

  return (
    <>
      <h2>{t('Sign up')}</h2>
      <SignUpForm />
      <p onClick={() => setShowSignIn(true)} className="my-2 cursor-pointer">
        {t('Already on billionstracker')}? <span>{t('Sign in')}</span>
      </p>
    </>
  );
};

export default AuthForm;
