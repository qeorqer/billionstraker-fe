export type CategoryStatistics = {
  name: string;
  amount: number;
};

type StatisticsForTransactionType = {
  range: CategoryStatistics[];
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
