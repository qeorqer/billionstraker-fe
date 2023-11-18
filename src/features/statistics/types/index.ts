export type RangeStatisticsItem = {
  name: string;
  amount: number;
};

export type StatisticsForTransactionType = {
  categoryRange: RangeStatisticsItem[];
  balanceRange?: RangeStatisticsItem[];
  total: number;
};

export type ExchangesStatistics = {
  totallySend: number;
  totallyReceived: number;
};

export type Statistics = {
  expenses: StatisticsForTransactionType;
  profits: StatisticsForTransactionType;
  exchanges: ExchangesStatistics | null;
};

export type GetStatisticsPayload = {
  from: Date;
  to: Date;
  balance: string | null;
};

export type GetStatisticsResponse = {
  message: string;
  statistics: Statistics;
};

export type NetWorth = {
  value: number;
  currency: string;
};

export type GetNetWorthResponse = {
  message: string;
  statistics: NetWorth;
};

export type DiagramPiece = {
  value: number;
  color: string;
  tooltip: string;
};
