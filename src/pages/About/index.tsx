import { FC } from 'react';

import AboutPageView from './view';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const AboutPage: FC = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCheckOutClick = () => push('/authorization');

  return <AboutPageView t={t} handleCheckOutClick={handleCheckOutClick} />;
};

export default AboutPage;
