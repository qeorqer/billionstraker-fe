export type expenseIncomeType = {
  _id: string;
  total: number;
};

export type statisticForRangeType = {
  expensesInRange: expenseIncomeType[];
  profitsInRange: expenseIncomeType[];
  totallySpent: number;
};

export type getStatisticForRangeResponseType = {
  message: string;
  statistic: statisticForRangeType | null;
};
