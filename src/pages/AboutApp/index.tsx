import React, { FC } from 'react';

import AboutApp from './view';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const AboutAppPage: FC = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCheckOutClick = () => push('/authorization');

  return (
    <AboutApp
      t={t}
      handleCheckOutClick={handleCheckOutClick}
    />
  );
};

export default AboutAppPage;
