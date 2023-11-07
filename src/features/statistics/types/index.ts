export type ExpenseIncome = {
  _id: string;
  total: number;
};

export type StatisticsForBalance = {
  expensesInRange: ExpenseIncome[];
  profitsInRange: ExpenseIncome[];
  totallySpent: number;
  totallyEarned: number;
};

export type StatisticsForBalancePayload = {
  from: Date;
  to: Date;
  balance: string;
};

export type GetStatisticsForBalanceResponse = {
  message: string;
  statistics: StatisticsForBalance | null;
};

export type NetWorth = {
  value: number;
  currency: string;
};

export type GetNetWorthResponse = {
  message: string;
  statistics: NetWorth;
};
