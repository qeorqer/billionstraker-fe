import { Category, categoryData } from 'features/category';
import { Balance, balanceData } from 'features/balance';
import { transactionTypesToShow } from 'features/transaction/components/TransactionsList/utils';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { transactionData } from 'features/transaction/store/selector';
import { TransactionTypeToShow } from 'features/transaction/types';
import { useTranslation } from 'react-i18next';
import { userData } from 'features/user';
import { useBreakpoints } from 'hooks/useBreakpoints';
import {
  Title,
  Stack,
  Grid,
  TextInput,
  Select,
  Collapse,
  Button,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

type SelectTransactionsDetailsProps = {
  shownTransactionsTypes: TransactionTypeToShow;
  setShownTransactionsTypes: Dispatch<SetStateAction<TransactionTypeToShow>>;
  categoriesToShow: string;
  balancesToShow: string;
  setCategoriesToShow: Dispatch<SetStateAction<string>>;
  setBalancesToShow: Dispatch<SetStateAction<string>>;
  setMonthsRange: Dispatch<SetStateAction<[Date, Date]>>;
  monthsRange: [Date, Date];
  transactionName: string;
  setTransactionName: Dispatch<SetStateAction<string>>;
};

const SelectTransactionsDetails: FC<SelectTransactionsDetailsProps> = ({
  shownTransactionsTypes,
  categoriesToShow,
  balancesToShow,
  setCategoriesToShow,
  setBalancesToShow,
  setShownTransactionsTypes,
  setMonthsRange,
  monthsRange,
  transactionName,
  setTransactionName,
}) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const { lang, user } = useAppSelector(userData);
  const { balances } = useAppSelector(balanceData);
  const { categories } = useAppSelector(categoryData);
  const { t } = useTranslation();
  const { isLoadingTransactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const breakpoint = useBreakpoints();

  const renderFilters = () => (
    <>
      <Grid.Col span={{ base: 6, sm: 4 }}>
        <Select
          size="md"
          value={shownTransactionsTypes}
          label={t('transactions types')}
          placeholder={t('transaction type')}
          data={[
            { label: t('show all'), value: 'all transactions' },
            ...transactionTypesToShow.map((type) => ({
              label: type,
              value: type,
            })),
          ]}
          onChange={(val) =>
            setShownTransactionsTypes(val as TransactionTypeToShow)
          }
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, sm: 4 }}>
        <Select
          size="md"
          value={balancesToShow}
          label={t('balances')}
          placeholder={t('Select balance')}
          data={[
            { label: t('show all'), value: 'all' },
            ...balances.map(({ name }: Balance) => ({
              label: name,
              value: name,
            })),
          ]}
          onChange={(val) => setBalancesToShow(val!)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Select
          size="md"
          value={categoriesToShow}
          label={t('categories')}
          placeholder={t('Select category')}
          data={[
            { label: t('show all'), value: 'all' },
            ...categories
              .filter((category: Category) => {
                if (shownTransactionsTypes === 'all transactions') {
                  return category;
                }

                return category.categoryType === shownTransactionsTypes;
              })
              .map(({ name }: Category) => ({ label: name, value: name })),
          ]}
          onChange={(val) => setCategoriesToShow(val!)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6 }}>
        <DatePickerInput
          size="md"
          type="range"
          label={t('Select range')}
          value={monthsRange}
          onChange={(newValue) => setMonthsRange(newValue as [Date, Date])}
          locale={lang}
          minDate={new Date(user.created)}
          maxDate={new Date()}
        />
      </Grid.Col>
    </>
  );

  if (
    !numberOfTransactions &&
    shownTransactionsTypes === 'all transactions' &&
    !categoriesToShow.length &&
    !balancesToShow.length &&
    !isLoadingTransactions
  ) {
    return null;
  }

  return (
    <Stack align="center">
      <Title order={2} fw={500}>
        {t('apply filters')}
      </Title>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            size="md"
            label={t('Search by Name')}
            placeholder={t('Start typing a transaction name')}
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
          />
        </Grid.Col>
        {breakpoint === 'xs' || breakpoint === 'sm' ? (
          <>
            <Collapse in={isFiltersVisible}>
              <Grid gutter="lg">{renderFilters()}</Grid>
            </Collapse>
            <Grid.Col span={12} ta="center">
              <Button
                maw="320px"
                w="100%"
                style={{ alignSelf: 'center' }}
                variant="light"
                size="sm"
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
                {isFiltersVisible
                  ? t('Show less filters')
                  : t('Show more filters')}
              </Button>
            </Grid.Col>
          </>
        ) : (
          renderFilters()
        )}
      </Grid>
    </Stack>
  );
};

export default SelectTransactionsDetails;
