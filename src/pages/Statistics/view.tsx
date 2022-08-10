import React, { Dispatch, FC, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import RangeStatistic from 'components/Statistics/RangeStatistic';
import { getStatisticsForBalanceType } from 'types/statistic.type';

type propsType = {
  t: (text: string) => string;
  statisticsForBalance: getStatisticsForBalanceType | null;
  monthsRange: Date[];
  setMonthsRange: Dispatch<SetStateAction<Date[]>>;
};

const Statistics: FC<propsType> = ({
  t,
  statisticsForBalance,
  monthsRange,
  setMonthsRange,
}) => (
  <Container className="py-4">
    {statisticsForBalance ? (
      <Row>
        <Col xs="12" md="6">
          <RangeStatistic
            statisticsForRange={statisticsForBalance}
            monthsRange={monthsRange}
            setMonthsRange={setMonthsRange}
          />
        </Col>
        <Col xs="12" md="6"></Col>
      </Row>
    ) : (
      <div className="d-flex justify-content-center align-items-center h-100 fw-bold my-3 my-md-0 ">
        <p>{t('Some of your statistic will be here')}</p>
      </div>
    )}
  </Container>
);

export default Statistics;
