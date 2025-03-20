import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Autocomplete, Tooltip } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';

import { updateUserThunk, userData } from 'features/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import { currenciesLabelsList } from 'features/currency';
import { getCurrencyValue } from 'features/currency/utils/getCurrencyValue';

const SelectPreferredCurrency = () => {
  const { user } = useAppSelector(userData);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState(
    user?.preferredCurrency
      ? getCurrencyLabel(user?.preferredCurrency)
      : undefined,
  );

  const handleValueSelect = (value: string) => {
    setCurrency(value);

    if (currenciesLabelsList.includes(value)) {
      dispatch(
        updateUserThunk({
          updatedFields: {
            preferredCurrency: getCurrencyValue(value),
          },
        }),
      );
    }
  };

  return (
    <Autocomplete
      w="100%"
      size="md"
      placeholder={t('select currency')}
      value={currency}
      comboboxProps={{ zIndex: 10000, withinPortal: true }}
      onChange={handleValueSelect}
      data={currenciesLabelsList}
      rightSection={
        <Tooltip
          label={t('Main currency is used for calculating the net worth')}
          multiline
          withArrow
          w={{ base: 220, sm: undefined }}
          events={{ hover: true, focus: true, touch: true }}>
          <ActionIcon variant="light" color="white">
            <IconQuestionMark
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </Tooltip>
      }
    />
  );
};

export default SelectPreferredCurrency;
