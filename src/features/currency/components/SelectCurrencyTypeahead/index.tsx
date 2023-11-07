import { getListOfAllCurrencies } from 'features/currency';
import { Typeahead, TypeaheadRef } from 'react-bootstrap-typeahead';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Option } from 'react-bootstrap-typeahead/types/types';

type SelectCurrencyTypeaheadProps = {
  onChange: (option: Option[]) => void;
  isInvalid?: boolean;
  value?: string;
  id: string;
};

const SelectCurrencyTypeahead = forwardRef<
  TypeaheadRef,
  SelectCurrencyTypeaheadProps
>(({ onChange, isInvalid = false, value, id }, ref) => {
  const { t } = useTranslation();

  //todo: fix controlled/uncontrolled warning if you are in the mood, but I don't really care
  return (
    <Typeahead
      ref={ref}
      id={id}
      onChange={onChange}
      selected={value ? [value] : undefined}
      options={getListOfAllCurrencies()}
      placeholder={t('select currency')}
      isInvalid={isInvalid}
      className="w-100"
    />
  );
});

export default SelectCurrencyTypeahead;
