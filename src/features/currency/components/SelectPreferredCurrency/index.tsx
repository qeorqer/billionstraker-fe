import { updateUserThunk, userData } from 'features/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Col, Row } from 'react-bootstrap';
import SelectCurrencyTypeahead from 'features/currency/components/SelectCurrencyTypeahead';
import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import React, { ForwardedRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrencyOption } from 'features/currency/types';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { TypeaheadRef } from 'react-bootstrap-typeahead';

const SelectPreferredCurrency = () => {
  const { user } = useAppSelector(userData);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState(
    user?.preferredCurrency
      ? getCurrencyLabel(user?.preferredCurrency)
      : undefined,
  );

  const typeaheadRef = useRef<TypeaheadRef>();

  const handleValueSelect = (selectedOptions: Option[]) => {
    const selectedCurrency = (selectedOptions as CurrencyOption[])[0];
    setCurrency(selectedCurrency?.label ?? '');

    if (selectedOptions.length && selectedCurrency?.value) {
      dispatch(
        updateUserThunk({
          updatedFields: {
            preferredCurrency: selectedCurrency.value,
          },
        }),
      );
    }
  };

  return (
    <Row>
      <Col xs="12" lg="6" className="mb-3 mb-lg-0 mx-auto">
        <p className="fs-5 fw-bold text-center">{t('Select main currency')}:</p>
        <SelectCurrencyTypeahead
          id="preferred-currency-typeahead"
          ref={typeaheadRef as ForwardedRef<TypeaheadRef>}
          onChange={handleValueSelect}
          value={currency}
        />
      </Col>
    </Row>
  );
};

export default SelectPreferredCurrency;
