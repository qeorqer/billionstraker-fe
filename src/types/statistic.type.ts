import { categoryType } from "./category.type";

export type generalStatisticType = {
  userExpenses: number,
  userExpensesThisMonth: number
}

export type getGeneralStatisticResponseType = {
  messageRu: string,
  messageEn: string,
  statistic: generalStatisticType | null
}

export type wholeStatisticType = {
  userExpenses: number,
  userExpensesThisMonth: number,
  userIncomes: number,
  userIncomesThisMonth: number,
  averageExpensePerMonth: number,
  averageIncomePerMonth: number
}

export type getWholeStatisticResponseType = {
  messageRu: string,
  messageEn: string,
  statistic: wholeStatisticType | null
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
  messageRu: string,
  messageEn: string,
  statistic: statisticForRangeType | null
}