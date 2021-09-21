import { categoryType } from "./category.type";

export type generalStatisticType = {
  userExpenses: number,
  userExpensesThisMonth: number
}

export type getGeneralStatisticResponseType = {
  message: string,
  statistic: generalStatisticType| null
}

export type wholeStatisticType = {
  userExpenses: number,
  userExpensesThisMonth: number,
  userIncomes: number,
  userIncomesThisMonth: number,
}

export type getWholeStatisticResponseType = {
  message: string,
  statistic: wholeStatisticType| null
}

export type expenseIncomeType = {
  _id: categoryType,
  total: number
}

export type statisticForRangeType = {
  transactionsInRange: expenseIncomeType[],
  totalSpent: number
}


export type getStatisticForRangeResponseType = {
  message: string,
  statistic: statisticForRangeType | null
}