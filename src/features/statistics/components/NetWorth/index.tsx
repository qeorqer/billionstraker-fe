import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

import { formattingSum } from 'features/transaction/utils/formattingSum';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getNetWorthThunk } from 'features/statistics/store/thunks';
import { statisticsData } from 'features/statistics/store/selector';

const NetWorthView = () => {
  const { t } = useTranslation();
  const { netWorth } = useAppSelector(statisticsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNetWorthThunk());
  }, []);

  if (!netWorth) {
    return null;
  }

  return (
    <p className="fw-bold text-center">
      {t('Your total net worth')}
      <span className="fst-italic yellowText">
        {` ${formattingSum(
          netWorth.value,
        )} (${netWorth.currency.toUpperCase()}) `}
      </span>
      <span
        className="cursor-pointer"
        data-tip={t('You can change main currency on the balances page')}
        data-for="question">
        <i className="bi bi-question-circle" />
      </span>
      <ReactTooltip id="question" />
    </p>
  );
};

export default NetWorthView;
