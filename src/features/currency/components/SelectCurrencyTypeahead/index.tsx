import { getListOfAllCurrencies } from 'features/currency';
import { Typeahead } from 'react-bootstrap-typeahead';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Option } from 'react-bootstrap-typeahead/types/types';

type SelectCurrencyTypeaheadProps = {
  onChange: (option: Option[]) => void;
  isInvalid: boolean;
};

const SelectCurrencyTypeahead: FC<SelectCurrencyTypeaheadProps> = ({
  onChange,
  isInvalid,
}) => {
  const { t } = useTranslation();

  return (
    <Typeahead
      id="currency-typeahead"
      onChange={onChange}
      options={getListOfAllCurrencies()}
      placeholder={t('select currency')}
      isInvalid={isInvalid}
    />
  );
};

export default SelectCurrencyTypeahead;
