import { FC } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import BalancesList from 'features/balance/components/BalancesList';
import BalanceForm from 'features/balance/components/BalanceForm';
import SelectPreferredCurrency from 'features/currency/components/SelectPreferredCurrency';

type BalancePageViewProps = {
  t: (text: string) => string;
  hasBalances: boolean;
};

const BalancePageView: FC<BalancePageViewProps> = ({ t, hasBalances }) => (
  <Container className="py-4">
    {!hasBalances && (
      <p className="fs-4 fw-bold text-center py-2">
        {t(hasBalances ? 'all your balances' : 'your balances will be here')}
      </p>
    )}
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
