import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DiagramStatistics from 'features/statistics/components/DiagramStatistics';
import { StatisticsList } from 'features/statistics/components/StatisticsList';
import { StatisticsForTransactionType } from 'features/statistics/types';
import { TransactionType } from 'features/transaction';
import { formatSum } from 'features/transaction/utils/formatSum';

import './styles.scss';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';
import { formatSumByCurrencyCode } from 'features/statistics/utils/formatSumByCurrencyCode';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';

type StatisticsViewItemProps = {
  statistics: StatisticsForTransactionType;
  type: TransactionType;
  selectedBalance: string;
  monthsRange: [Date, Date];
};

const StatisticsViewItem: FC<StatisticsViewItemProps> = ({
  statistics,
  type,
  selectedBalance,
  monthsRange,
}) => {
  const { t } = useTranslation();
  const [useDiagram, setUseDiagram] = useState<boolean>(true);
  const [useBalanceRange, setUseBalanceRange] = useState(false);

  const { formatSumByBalanceName } = useFormatSumByBalanceName();
  const { user } = useAppSelector(userData);

  useEffect(() => {
    setUseBalanceRange(false);
  }, [statistics]);

  return (
    <>
      {statistics.total > 0 && (
        <Stack gap={2} className="mb-2">
          <div className="rangeHolderControls">
            <Button
              size="sm"
              className={`mx-2 ${useDiagram ? 'text-white' : ''}`}
              variant={useDiagram ? 'warning' : 'outline-warning'}
              onClick={() => setUseDiagram(true)}>
              {t('Pie chart')}
            </Button>
            <Button
              size="sm"
              className={useDiagram ? '' : 'text-white'}
              variant={useDiagram ? 'outline-warning' : 'warning'}
              onClick={() => setUseDiagram(false)}>
              {t('List')}
            </Button>
          </div>
          {statistics.balanceRange && (
            <Form.Check
              type="switch"
              label={t('use balances')}
              className="balancesSwitch d-flex justify-content-center"
              checked={useBalanceRange}
              onChange={() => setUseBalanceRange(!useBalanceRange)}
            />
          )}
        </Stack>
      )}
      <p className="fw-bold">
        {t(
          type === 'expense'
            ? 'Spent during this period'
            : 'Earned during this period',
        )}
        :
        <span className="fst-italic yellowText">
          {` ${
            selectedBalance
              ? formatSumByBalanceName(statistics.total, selectedBalance)
              : formatSumByCurrencyCode(
                  statistics.total,
                  user.preferredCurrency ?? '',
                )
          }`}
        </span>
      </p>
      {useDiagram ? (
        <DiagramStatistics
          totallySpent={statistics.total}
          rangeStatistics={
            useBalanceRange
              ? statistics.balanceRange!
              : statistics.categoryRange
          }
        />
      ) : (
        <StatisticsList
          selectedBalance={selectedBalance}
          monthsRange={monthsRange}
          totalSpent={statistics.total}
          fieldToGroupBy={useBalanceRange ? 'balance' : 'category'}
          transactionType={type}
          statisticForRange={
            useBalanceRange
              ? statistics.balanceRange!
              : statistics.categoryRange
          }
        />
      )}
    </>
  );
};

export default StatisticsViewItem;
