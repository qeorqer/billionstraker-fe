import React, { FC } from 'react';
import { expenseIncomeType } from "../../types/statistic.type";
import ListItem from "./ListItem";
import { useAppSelector } from "../../hooks/react-redux.hook";
import { userData } from "../../store/selectors";

type propsType = {
  statisticForRange: expenseIncomeType[]
  userExpensesThisMonth: number
}

export type listForRangeItem = {
  title: string,
  value: number,
  percentage: number | string
}

export const List: FC<propsType> = ({ statisticForRange, userExpensesThisMonth }) => {
  const { lang } = useAppSelector(userData)

  const dataForRange: listForRangeItem[] = statisticForRange.map((el, index) => ({
    title: lang === 'en' ? el._id.nameEn : el._id.nameRu,
    value: el.total,
    percentage: Math.round((100 * el.total) / userExpensesThisMonth) || '>1'
  }))


  return (
    <div>
      {dataForRange.sort((a, b) => b.value - a.value).map(listItem => <ListItem key={listItem.title} listItem={listItem}/>)}
    </div>
  );
};