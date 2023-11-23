import { Button } from 'react-bootstrap';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { TransactionType } from 'features/transaction/types';

type CannotCreateTransactionButtonsProps = {
  transactionType: TransactionType;
};

const CannotCreateTransactionButtons: FC<
  CannotCreateTransactionButtonsProps
> = ({ transactionType }) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCreateBalance = () => push('balance');

  const handleCreateCategory = () => push('category');

  if (transactionType === 'exchange') {
    return (
      <div className="text-center mt-2">
        <p className="fw-bold">{t('you need to have two balance')}</p>
        <Button
          variant="warning"
          className="w300Px text-white"
          onClick={handleCreateBalance}>
          {t('create balance')}
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center mt-2">
      <p className="fw-bold">{t('you need to have one balance')}</p>
      <Button
        variant="warning"
        className="w300Px text-white mx-1"
        onClick={handleCreateBalance}>
        {t('create balance')}
      </Button>
      <Button
        variant="warning"
        className="w300Px text-white mx-1 my-2 my-md-0"
        onClick={handleCreateCategory}>
        {t('create category')}
      </Button>
    </div>
  );
};

export default CannotCreateTransactionButtons;
