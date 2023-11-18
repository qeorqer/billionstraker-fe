import React, { Dispatch, FC, SetStateAction } from 'react';
import { Container, Stack } from 'react-bootstrap';

import TransactionsList from 'features/transaction/components/TransactionsList';
import BalancesList from 'features/balance/components/BalancesList';

import './styles.scss';
import SelectTransactionsDetails from 'features/transaction/components/SelectTransactionsDetails';
import { TransactionTypeToShow } from 'features/transaction';
import BackToStatisticsButton from 'features/statistics/components/BackToStatisticsButton';

type ProfilePageViewProps = {
  shownTransactionsTypes: TransactionTypeToShow;
  setShownTransactionsTypes: Dispatch<SetStateAction<TransactionTypeToShow>>;
  categoriesToShow: string;
  balancesToShow: string;
  setCategoriesToShow: Dispatch<SetStateAction<string>>;
  setBalancesToShow: Dispatch<SetStateAction<string>>;
  setMonthsRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  monthsRange: [Date, Date];
  isBackToStatisticsShown: boolean;
  handleLoadMoreTransactions: () => void;
  hasMoreTransactions: boolean;
};

const ProfilePageView: FC<ProfilePageViewProps> = ({
  shownTransactionsTypes,
  categoriesToShow,
  balancesToShow,
  setCategoriesToShow,
  setBalancesToShow,
  setShownTransactionsTypes,
  setMonthsRange,
  monthsRange,
  isBackToStatisticsShown,
  hasMoreTransactions,
  handleLoadMoreTransactions,
}) => (
  <Container className="py-4 mb-4 mb-sm-0">
    <Stack gap={2}>
      <BalancesList />
      <SelectTransactionsDetails
        shownTransactionsTypes={shownTransactionsTypes}
        categoriesToShow={categoriesToShow}
        balancesToShow={balancesToShow}
        setCategoriesToShow={setCategoriesToShow}
        setBalancesToShow={setBalancesToShow}
        setShownTransactionsTypes={setShownTransactionsTypes}
        setMonthsRange={setMonthsRange}
        monthsRange={monthsRange}
      />
      <TransactionsList
        handleLoadMoreTransactions={handleLoadMoreTransactions}
        hasMore={hasMoreTransactions}
      />
      {isBackToStatisticsShown && <BackToStatisticsButton />}
    </Stack>
  </Container>
);

export default ProfilePageView;
