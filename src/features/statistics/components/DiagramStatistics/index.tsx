import React, { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';

import { DiagramPiece, RangeStatisticsItem } from 'features/statistics/types';
import { formatSum } from 'features/transaction/utils/formatSum';
import { calculateStatisticsForDiagram } from 'features/statistics/utils/calculateStatisticsForDiagram';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';

type DiagramStatisticsProps = {
  rangeStatistics: RangeStatisticsItem[];
  totallySpent: number;
};

const DiagramStatistics: FC<DiagramStatisticsProps> = ({
  rangeStatistics,
  totallySpent,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [statistics, setStatistics] = useState<DiagramPiece[]>([]);

  useEffect(() => {
    setStatistics(
      calculateStatisticsForDiagram(rangeStatistics, totallySpent, hovered),
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
          fontSize: '11px',
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
