import React from 'react';
import { Button, Container } from 'react-bootstrap';

import guide1 from 'assets/guide/guide-1.png';
import guide2 from 'assets/guide/guide-2.png';
import guide3 from 'assets/guide/guide-3.png';
import guide4 from 'assets/guide/guide-4.png';
import guide5 from 'assets/guide/guide-5.png';
import guide6 from 'assets/guide/guide-6.png';
import guide7 from 'assets/guide/guide-7.png';

import './styles.scss';

type propsType = {
  t: (text: string) => string;
  handleCreateBalance: () => void;
  handleCreateCategory: () => void;
  handleCreateTransaction: () => void;
  handleExploreProfile: () => void;
  handleCheckStatistics: () => void;
};

const Guide: React.FC<propsType> = ({
  t,
  handleCreateBalance,
  handleCreateCategory,
  handleCreateTransaction,
  handleExploreProfile,
  handleCheckStatistics,
}) => (
  <>
    <Container className="pt-4 text-center guide pb-5 pb-sm-0">
      <h1 className="yellowText fs-2 mb-0">
        {t('here comes the usage guide')}
      </h1>
      <p className="fs-6 mt-0">
        {t('first of all, you can always return to this page')}
      </p>
      <p className="fs-5 mt-2 mb-3">{t('the main parts of the app are')}</p>
      <p className="fs-6 my-2 yellowText">
        {t('the balance page is used for')}
      </p>
      <img src={guide1} alt="balance page" />
      <Button
        variant="warning"
        className="w300Px text-white mt-2 mb-3"
        onClick={handleCreateBalance}
      >
        {t('create balance')}
      </Button>
      <p className="fs-5 mt-2 mb-3">
        {t("after that let's create some categories")}
      </p>
      <p className="fs-6 my-2 yellowText">
        {t('the categories page is used for')}
      </p>
      <img src={guide2} alt="category page" />
      <Button
        variant="warning"
        className="w300Px text-white mt-2 mb-3"
        onClick={handleCreateCategory}
      >
        {t('create category')}
      </Button>
      <p className="fs-5 mt-2 mb-3">{t('now we are ready for transactions')}</p>
      <p className="fs-6 my-2 yellowText">{t('expense example')}</p>
      <img src={guide3} alt="expense example" />
      <p className="fs-6 my-2 yellowText">{t('income example')}</p>
      <img src={guide4} alt="income example" />
      <p className="fs-6 my-2 yellowText">{t('exchange example')}</p>
      <img src={guide5} alt="exchange example" />
      <Button
        variant="warning"
        className="w300Px text-white mt-2 mb-3"
        onClick={handleCreateTransaction}
      >
        {t('create transaction')}
      </Button>
      <p className="fs-5 mt-2 mb-3">{t('time to explore the profile page')}</p>
      <p className="fs-6 my-2 yellowText">
        {t('the profile page is used for')}
      </p>
      <img src={guide6} alt="profile page" />
      <Button
        variant="warning"
        className="w300Px text-white mt-2 mb-3"
        onClick={handleExploreProfile}
      >
        {t('explore profile')}
      </Button>
      <p className="fs-5 mt-2 mb-3">{t('the last but not least')}</p>
      <p className="fs-6 my-2 yellowText">
        {t('select dates range and balance')}
      </p>
      <img src={guide7} alt="statistics page" />
      <Button
        variant="warning"
        className="w300Px text-white mt-2 mb-3"
        onClick={handleCheckStatistics}
      >
        {t('check out statistics')}
      </Button>
      <p className="fs-5 mt-2 mb-3">{t('that is all for the guidance')}</p>
      <p className="fs-6 mt-3 mb-2">{t('if you read here')}</p>
      <Button
        variant="warning"
        className="w300Px text-white mt-2 mb-3"
        onClick={handleCreateBalance}
      >
        {t('create balance')}
      </Button>
    </Container>
  </>
);

export default Guide;
