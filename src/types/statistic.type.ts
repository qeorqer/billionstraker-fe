export type expenseIncomeType = {
  _id: string;
  total: number;
};

export type getStatisticsForBalanceType = {
  expensesInRange: expenseIncomeType[];
  profitsInRange: expenseIncomeType[];
  totallySpent: number;
};

export type getStatisticsForBalanceResponseType = {
  message: string;
  statistic: getStatisticsForBalanceType | null;
};
