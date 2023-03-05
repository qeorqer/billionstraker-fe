import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import './styles.scss';

const BackToStatistics = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const initialBalance = params.get('balance');
  const initialDateFrom = params.get('dateFrom');
  const initialDateTo = params.get('dateTo');

  const handleBackToStatisticsClick = () => {
    push({
      pathname: '/statistics',
      search: `?balance=${initialBalance}&dateFrom=${initialDateFrom}&dateTo=${initialDateTo}`,
    });
  };

  return (
    <Button
      variant="outline-warning backToStatisticsButton"
      onClick={handleBackToStatisticsClick}>
      {t('back to statistics')}
    </Button>
  );
};

export default BackToStatistics;
