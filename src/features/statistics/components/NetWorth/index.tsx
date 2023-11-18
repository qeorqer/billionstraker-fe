import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

import { formatSum } from 'features/transaction/utils/formatSum';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getNetWorthThunk } from 'features/statistics/store/thunks';
import { statisticsData } from 'features/statistics/store/selector';
import EditMainCurrencyModal from 'features/currency/components/EditMainCurrencyModal';
import { userData } from 'features/user';

import './styles.scss';

const NetWorthView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();
  const { netWorth } = useAppSelector(statisticsData);
  const { user } = useAppSelector(userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNetWorthThunk());
  }, [user]);

  if (!netWorth) {
    return null;
  }

  return (
    <>
      <p className="h3 fw-bold text-center next-worth-text">
        {t('Your total net worth')}
        <span className="fst-italic yellowText">
          {` ${formatSum(netWorth.value)} ${netWorth.currency.toUpperCase()} `}
        </span>
        <span
          className="cursor-pointer"
          data-tip={t('You can change main currency on the balances page')}
          data-for="question">
          <i className="bi bi-question-circle" />
        </span>
        <span
          onClick={() => setIsModalOpen(true)}
          className="balance-action-button">
          <i className="bi bi-pencil text-dark  mx-2 cursor-pointer" />
        </span>
      </p>
      <ReactTooltip id="question" effect="solid" />
      <EditMainCurrencyModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NetWorthView;
