import { FC } from 'react';

import { RangeStatisticsItem } from 'features/statistics/types';
import { formatStatisticsForChart } from 'features/statistics/utils/formatStatisticsForChart';
import { DonutChart } from '@mantine/charts';

type DiagramStatisticsProps = {
  rangeStatistics: RangeStatisticsItem[];
  totallySpent: number;
};

const DiagramStatistics: FC<DiagramStatisticsProps> = ({
  rangeStatistics,
  totallySpent,
}) => {
  if (totallySpent <= 0) {
    return null;
  }

  return (
    <DonutChart
      labelsType="percent"
      withLabels
      data={formatStatisticsForChart({
        statistics: rangeStatistics,
        totallySpent,
      })}
      size={250}
      thickness={20}
      w="100%"
    />
  );
};

export default DiagramStatistics;
