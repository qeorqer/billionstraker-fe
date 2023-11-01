import React, { FC } from 'react';
import { Button, Container } from 'react-bootstrap';

import about1 from 'assets/about/about-1.png';
import about2 from 'assets/about/about-2.png';
import about3 from 'assets/about/about-3.png';

import './styles.scss';

type propsType = {
  t: (text: string) => string;
  handleCheckOutClick: () => void;
};

const About: FC<propsType> = ({ t, handleCheckOutClick }) => (
  <section className="aboutSection text-center text-white py-4 px-2">
    <Container>
      <h1 className="yellowText fs-2">{t('what does this app do')}</h1>
      <p>{t('the main idea of the app')}</p>
      <img src={about1} alt="transactions" />
      <p>{t('about statistics')}</p>
      <img src={about2} alt="statistics" />
      <p>{t('more over the has mobile version')}</p>
      <img src={about3} alt="mobile version" className="w-320" />
      <p>{t('so there is no reason not to check it out')}</p>
      <Button
        variant="warning"
        className="w300Px text-white"
        onClick={handleCheckOutClick}>
        {t('check it out')}
      </Button>
    </Container>
  </section>
);

export default About;
