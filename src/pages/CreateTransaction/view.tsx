import React, { Dispatch, SetStateAction } from 'react';
import { Button, Container } from 'react-bootstrap';

import {
  CreateTransactionPayload,
  TransactionType,
} from 'features/transaction/types';
import { Balance } from 'features/balance/types';
import { categoryType } from 'types/category.type';
import Balances from 'features/balance/components/BalancesList';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'components/Layout/Loader';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import CreateTransactionForm from 'features/transaction/components/CreateTransactionForm';

type propsType = {
  t: (text: string) => string;
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  balances: Balance[];
  categories: categoryType[];
  handleSubmit: (transaction: CreateTransactionPayload | null) => void;
  canCreateTransaction: boolean;
  handleCreateBalance: () => void;
  handleCreateCategory: () => void;
  isLoading: boolean;
};

const CreateTransactionPageView: React.FC<propsType> = ({
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

export default CreateTransactionPageView;
