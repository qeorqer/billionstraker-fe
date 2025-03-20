import { Dispatch, FC, SetStateAction } from 'react';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { balanceData } from 'features/balance';
import { useTranslation } from 'react-i18next';
import { statisticsData } from 'features/statistics/store/selector';
import { Select, Stack, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

type SelectStatisticsDetailsProps = {
  setMonthsRange: Dispatch<SetStateAction<[Date, Date]>>;
  monthsRange: [Date, Date];
  balanceName: string | null;
  setBalanceName: Dispatch<SetStateAction<string | null>>;
};

const SelectStatisticsDetails: FC<SelectStatisticsDetailsProps> = ({
  monthsRange,
  setMonthsRange,
  balanceName,
  setBalanceName,
}) => {
  const { statistics } = useAppSelector(statisticsData);

  const { t } = useTranslation();
  const { lang, user } = useAppSelector(userData);
  const { balances } = useAppSelector(balanceData);

  if (!statistics) {
    return null;
  }

  return (
    <Stack align="center">
      <Title order={2} fw={500} ta="center">
        {t('Configure to see detailed statistics')}
      </Title>
      <DatePickerInput
        maw="420px"
        w="100%"
        type="range"
        label={t('Select range')}
        value={monthsRange}
        onChange={(newValue) => setMonthsRange(newValue as [Date, Date])}
        locale={lang}
        minDate={new Date(user.created)}
        maxDate={new Date()}
      />
      <Select
        maw="420px"
        w="100%"
        label={t('select balance')}
        placeholder={t('select balance')}
        data={balances.map(({ name }) => name)}
        value={balanceName}
        onChange={setBalanceName}
        clearable
      />
    </Stack>
  );
};

export default SelectStatisticsDetails;
