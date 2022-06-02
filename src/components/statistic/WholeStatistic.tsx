import React, { FC } from 'react';
import moment from 'moment';
import { wholeStatisticType } from '../../types/statistic.type';
import { useTranslation } from 'react-i18next';
import { userType } from '../../types/user.type';

type propsType = {
  wholeStatistic: wholeStatisticType;
  user: userType;
  lang: string;
};

const WholeStatistic: FC<propsType> = ({ wholeStatistic, user, lang }) => {
  const { t } = useTranslation();
  const daysOnApp = moment().diff(user.created, 'days') + 1;

  return (
    <>
      <p className="fs-5 mb-0 fw-bold">{t('General statistic')}:</p>
      <div className="spent">
        <p className="mb-0">
          {t('Spent for the whole time')}:
          <span className="fst-italic yellowText">
            {wholeStatistic.userExpenses}
          </span>
        </p>

        <p className="mb-0">
          {t('Spent this month')}:
          <span className="fst-italic yellowText">
            {' '}
            {wholeStatistic.userExpensesThisMonth}
          </span>
        </p>
      </div>
      <div className="earned mt-2">
        <p className="mb-0">
          {t('Earned for the whole time')}:
          <span className="fst-italic yellowText">
            {wholeStatistic.userIncomes}
          </span>
        </p>

        <p className="mb-0">
          {t('Earned this month')}:
          <span className="fst-italic yellowText">
            {wholeStatistic.userIncomesThisMonth}
          </span>
        </p>

        {wholeStatistic.averageIncomePerMonth > 0 && (
          <p className="mb-0">
            {t('Average earned per month')}:
            <span className="fst-italic yellowText">
              {' '}
              {wholeStatistic.averageIncomePerMonth}
            </span>
          </p>
        )}

        {wholeStatistic.averageExpensePerMonth > 0 && (
          <p className="mt-2 mb-0">
            {t('Average spent per month')}:
            <span className="fst-italic yellowText">
              {' '}
              {wholeStatistic.averageExpensePerMonth}
            </span>
          </p>
        )}

        <p className="mb-1">
          {t('Average spent per day')}:
          <span className="fst-italic yellowText">
            {' '}
            {Math.ceil(wholeStatistic.userExpenses / daysOnApp)}
          </span>
        </p>

        <p className="fs-6 mb-0 fw-bold">
          {t('On')} <span className="yellowText">Billionstracker</span>{' '}
          {t('Since')}{' '}
          <span className="fst-italic yellowText">
            {moment(user.created).locale(lang).format('LL')}
          </span>
        </p>
      </div>
    </>
  );
};

export default WholeStatistic;
