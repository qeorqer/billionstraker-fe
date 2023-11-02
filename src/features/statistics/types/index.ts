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
  statistic: StatisticsForBalance | null;
};
