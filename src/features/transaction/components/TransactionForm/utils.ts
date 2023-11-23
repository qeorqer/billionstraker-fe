import { toast } from 'react-toastify';
import i18next from 'i18next';

import {
  CreateTransactionPayload,
  Transaction,
  TransactionFormData,
  TransactionType,
} from 'features/transaction/types';
import { Balance } from 'features/balance';
import { Category } from 'features/category';

type FormatTransactionOptions = {
  values: TransactionFormData;
  balances: Balance[];
  selectedTransaction: Transaction | null;
};

const findById = (items: Array<Balance | Category>, itemId: string) =>
  items.find(({ _id }) => _id === itemId);

const findByName = (items: Array<Balance | Category>, itemName: string) =>
  items.find(({ name }) => name === itemName);

export const formatPayloadForProfitOrExpense = ({
  values,
  type,
  balances,
  categories,
  selectedTransaction,
}: FormatTransactionOptions & {
  type: TransactionType;
  categories: Category[];
}): CreateTransactionPayload | null => {
  const balance = findById(balances, values.balanceId);
  const category = findById(categories, values.categoryId!);

  if (!balance) {
    toast(i18next.t('the balance does not exist'), {
      type: 'error',
    });

    return null;
  }

  if (
    type === 'expense' &&
    !selectedTransaction &&
    (balance as Balance).amount < values.sum
  ) {
    toast(i18next.t("You don't have this much"), {
      type: 'error',
    });

    return null;
  }

  if (!category) {
    toast(i18next.t('there is no category with such id'), {
      type: 'error',
    });

    return null;
  }

  const transaction: Transaction = {
    title: values.title,
    sum: values.sum as number,
    balance: balance.name,
    category: category.name,
    date: values.date,
    transactionType: type,
    ...(selectedTransaction && { _id: selectedTransaction._id! }),
  };

  return {
    transaction,
    balanceId: values.balanceId,
  };
};

export const formatPayloadForExchange = ({
  values,
  balances,
  selectedTransaction,
}: FormatTransactionOptions): CreateTransactionPayload | null => {
  const balanceToSubtract = findById(balances, values.balanceId);
  const balanceToAdd = findById(balances, values.balanceId2!);

  if (!balanceToSubtract || !balanceToAdd) {
    toast(i18next.t('the balance does not exist'), {
      type: 'error',
    });

    return null;
  }

  if (
    !selectedTransaction &&
    (balanceToSubtract as Balance).amount < values.sum
  ) {
    toast(i18next.t("You don't have this much"), {
      type: 'error',
    });

    return null;
  }

  const transaction: Transaction = {
    title: values.title,
    sum: values.sum2 as number,
    sumToSubtract: values.sum as number,
    balance: balanceToAdd.name,
    balanceToSubtract: balanceToSubtract.name,
    date: values.date,
    transactionType: 'exchange',
    ...(selectedTransaction && { _id: selectedTransaction._id! }),
  };

  return {
    transaction,
    balanceId: values.balanceId2 as string,
    balanceToSubtractId: values.balanceId,
  };
};

export const transformTransactionIntoFormData = (
  transaction: Transaction,
  balances: Balance[],
  categories: Category[],
): TransactionFormData => {
  const balance = findByName(balances, transaction.balance);
  const category = findByName(categories, transaction.category ?? '');
  const balanceToSubtract = findByName(
    balances,
    transaction.balanceToSubtract ?? '',
  );

  if (transaction.transactionType === 'exchange') {
    return {
      title: transaction.title,
      sum: transaction.sumToSubtract!,
      sum2: transaction.sum,
      date: new Date(transaction.date),
      balanceId: balanceToSubtract?._id ?? '',
      balanceId2: balance?._id ?? '',
    };
  }

  return {
    title: transaction.title,
    sum: transaction.sum,
    categoryId: category?._id ?? '',
    date: new Date(transaction.date),
    balanceId: balance?._id ?? '',
  };
};
