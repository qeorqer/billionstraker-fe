import React, { Dispatch, ForwardedRef, SetStateAction } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import { Balance } from 'features/balance/types';
import BalancesList from 'features/balance/components/BalancesList';
import BalanceForm from 'features/balance/components/BalanceForm';
import SelectCurrencyTypeahead from 'features/currency/components/SelectCurrencyTypeahead';
import { TypeaheadRef } from 'react-bootstrap-typeahead';
import { CurrencyOption } from 'features/currency';
import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import SelectPreferredCurrency from 'features/currency/components/SelectPreferredCurrency';

type BalancePageViewProps = {
  t: (text: string) => string;
  hasBalances: boolean;
};

const BalancePageView: React.FC<BalancePageViewProps> = ({
  t,
  hasBalances,
}) => (
  <Container className="py-4">
    <p className="fs-4 fw-bold text-center py-2">
      {t(hasBalances ? 'all your balances' : 'your balances will be here')}
    </p>
    <Stack gap={3}>
      <BalancesList showMenu />
      <SelectPreferredCurrency />
      <Row>
        <Col xs="12" lg="6" className="mb-3 mb-lg-0 mx-auto">
          <p className="fs-5 fw-bold text-center">{t('add new balance')}:</p>
          <BalanceForm buttonText="create" />
        </Col>
      </Row>
    </Stack>
  </Container>
);

export default BalancePageView;
