import { Dispatch, FC, SetStateAction } from 'react';
import { Box, Container, Stack } from '@mantine/core';

import TransactionsList from 'features/transaction/components/TransactionsList';
import BalancesList from 'features/balance/components/BalancesList';
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
  transactionName: string;
  setTransactionName: Dispatch<SetStateAction<string>>;
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
  transactionName,
  setTransactionName,
}) => (
  <Box component="main" bg="dark" c="white"  h="100%">
    <Container size="lg" pt="xl" pb={{ base: 70, sm: 'xl' }}>
      <Stack>
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
          transactionName={transactionName}
          setTransactionName={setTransactionName}
        />
        <TransactionsList
          handleLoadMoreTransactions={handleLoadMoreTransactions}
          hasMore={hasMoreTransactions}
        />
        {isBackToStatisticsShown && <BackToStatisticsButton />}
      </Stack>
    </Container>
  </Box>
);

export default ProfilePageView;
