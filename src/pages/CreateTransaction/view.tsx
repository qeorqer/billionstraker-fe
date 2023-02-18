import React, { Dispatch, SetStateAction } from 'react';
import { Button, Container } from 'react-bootstrap';

import {
  submitTransactionType,
  transactionTypes,
} from 'types/transaction.type';
import { balanceType } from 'types/balance.type';
import { categoryType } from 'types/category.type';
import Balances from 'components/Balances/BalancesList';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'components/Loader';
import SelectTransactionType from 'components/CreateTransaction/SelectTransactionType';
import CreateTransactionForm from 'components/CreateTransaction/CreateTransactionForm';

type propsType = {
  t: (text: string) => string;
  transactionType: transactionTypes;
  setTransactionType: Dispatch<SetStateAction<transactionTypes>>;
  balances: balanceType[];
  categories: categoryType[];
  handleSubmit: (transaction: submitTransactionType | null) => void;
  canCreateTransaction: boolean;
  handleCreateBalance: () => void;
  handleCreateCategory: () => void;
  isLoading: boolean;
};

const CreateTransaction: React.FC<propsType> = ({
  t,
  transactionType,
  setTransactionType,
  balances,
  categories,
  handleSubmit,
  canCreateTransaction,
  handleCreateBalance,
  handleCreateCategory,
  isLoading,
}) => (
  <>
    <Container className="py-md-4 my-4 pb-5 pb-sm-0">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SelectTransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />

          {canCreateTransaction ? (
            <>
              <p className="fs-4 fw-bold text-center my-2">
                {t(
                  balances.length
                    ? 'all your balances'
                    : 'your balances will be here',
                )}
              </p>
              <Balances />

              <CreateTransactionForm
                selectedTransactionType={transactionType}
                balances={balances}
                categories={categories}
                handleSubmit={handleSubmit}
              />
            </>
          ) : (
            <>
              {transactionType === 'expense' || transactionType === 'profit' ? (
                <div className="text-center mt-2">
                  <p className="fw-bold">{t('you need to have one balance')}</p>
                  <Button
                    variant="warning"
                    className="w300Px text-white mx-1"
                    onClick={handleCreateBalance}>
                    {t('create balance')}
                  </Button>
                  <Button
                    variant="warning"
                    className="w300Px text-white mx-1 my-2 my-md-0"
                    onClick={handleCreateCategory}>
                    {t('create category')}
                  </Button>
                </div>
              ) : (
                <div className="text-center mt-2">
                  <p className="fw-bold">{t('you need to have two balance')}</p>
                  <Button
                    variant="warning"
                    className="w300Px text-white"
                    onClick={handleCreateBalance}>
                    {t('create balance')}
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  </>
);

export default CreateTransaction;
