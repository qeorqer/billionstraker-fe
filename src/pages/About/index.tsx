import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import AboutPageView from './view';

const AboutPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCheckOutClick = () => navigate('/authorization');

  return <AboutPageView t={t} handleCheckOutClick={handleCheckOutClick} />;
};

export default AboutPage;
