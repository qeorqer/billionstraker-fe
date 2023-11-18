import React, { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';

import { DiagramPiece, RangeStatisticsItem } from 'features/statistics/types';
import { calculateStatisticsForDiagram } from 'features/statistics/utils/calculateStatisticsForDiagram';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { balanceData } from 'features/balance';
import { formatSum } from 'features/transaction/utils/formatSum';

type DiagramStatisticsProps = {
  rangeStatistics: RangeStatisticsItem[];
  totallySpent: number;
  selectedBalance: string;
};

const DiagramStatistics: FC<DiagramStatisticsProps> = ({
  rangeStatistics,
  totallySpent,
  selectedBalance,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [statistics, setStatistics] = useState<DiagramPiece[]>([]);

  const { balances } = useAppSelector(balanceData);
  const { formatSumByBalanceName } = useFormatSumByBalanceName();
  const { user } = useAppSelector(userData);

  useEffect(() => {
    const currencyCode =
      balances.find(({ name }) => name === selectedBalance)?.currency ??
      user.preferredCurrency ??
      '';

    setStatistics(
      calculateStatisticsForDiagram({
        statistics: rangeStatistics,
        totallySpent,
        hovered,
        currencyCode: currencyCode,
      }),
    );
  }, [rangeStatistics, totallySpent, hovered]);

  if (totallySpent <= 0) {
    return null;
  }

  return (
    <div data-tip="" data-for="chart">
      <PieChart
        data={statistics}
        style={{ height: '300px', width: '100%' }}
        lineWidth={30}
        paddingAngle={statistics.length > 1 ? 2 : 0}
        label={() => formatSum(totallySpent)}
        totalValue={totallySpent}
        labelPosition={0}
        labelStyle={{
          fontSize: '10px',
          fill: '#F3C709',
        }}
        onMouseOver={(el, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered == 'number' ? statistics[hovered]?.tooltip : null
        }
      />
    </div>
  );
};

export default DiagramStatistics;
