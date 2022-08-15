import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Diagram from 'components/Statistics/Diagram';
import { List } from 'components/Statistics/List';
import { getStatisticsForBalanceType } from 'types/statistic.type';

import './styles.scss';

type propsType = {
  statisticsForRange: getStatisticsForBalanceType;
  type: 'expense' | 'income';
};

const RangeStatisticsItem: FC<propsType> = ({
  statisticsForRange,
  type,
}) => {
  const { t } = useTranslation();
  const [useDiagram, setUseDiagram] = useState<boolean>(true);

  const fieldsToUse = {
    totalValue: type === 'expense' ? statisticsForRange.totallySpent : statisticsForRange.totallyEarned,
    statisticsInRange: type === 'expense' ? statisticsForRange.expensesInRange : statisticsForRange.profitsInRange,
  };

  return (
    <>
      {fieldsToUse.totalValue > 0 && (
        <div className="rangeHolderControls mb-3">
          <Button
            size="sm"
            className={`mx-2 ${useDiagram ? 'text-white' : ''}`}
            variant={useDiagram ? 'warning' : 'outline-warning'}
            onClick={() => setUseDiagram(true)}
          >
            {t('Pie chart')}
          </Button>
          <Button
            size="sm"
            className={useDiagram ? '' : 'text-white'}
            variant={useDiagram ? 'outline-warning' : 'warning'}
            onClick={() => setUseDiagram(false)}
          >
            {t('List')}
          </Button>
        </div>
      )}
      <p className="fw-bold">
        {t(type === 'expense' ? 'Spent during this period' : 'Earned during this period')}:
        <span className="fst-italic yellowText">
                  {' '}
          {fieldsToUse.totalValue}
                </span>
      </p>
      {useDiagram ? (
        <Diagram
          totalSpent={fieldsToUse.totalValue}
          statisticForRange={fieldsToUse.statisticsInRange}
        />
      ) : (
        <List
          totalSpent={fieldsToUse.totalValue}
          statisticForRange={fieldsToUse.statisticsInRange}
        />
      )}
    </>
  );
};

export default RangeStatisticsItem;