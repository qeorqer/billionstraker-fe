import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const CreateTransactionToSeeStatistics = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCreateTransaction = () => push('createTransaction');

  return (
    <div className="d-flex justify-content-center align-items-center h-100 fw-bold my-3 flex-column">
      <p className="mb-2">{t('Some of your statistic will be here')}</p>
      <Button
        variant="warning"
        className="w300Px text-white"
        onClick={handleCreateTransaction}>
        {t('create transaction')}
      </Button>
    </div>
  );
};

export default CreateTransactionToSeeStatistics;
