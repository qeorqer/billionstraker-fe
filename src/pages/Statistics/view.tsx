import React, { Dispatch, FC, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import RangeStatistic from 'components/Statistics/RangeStatistic';
import {
  statisticForRangeType,
} from 'types/statistic.type';

type propsType = {
  t: (text: string) => string;
  statisticForRange: statisticForRangeType | null;
  monthsRange: Date[];
  setMonthsRange: Dispatch<SetStateAction<Date[]>>;
};

const Statistics: FC<propsType> = ({
  t,
  statisticForRange,
  monthsRange,
  setMonthsRange,
}) => (
  <Container className="py-4">
    { statisticForRange ? (
      <Row>
        <Col xs="12" md="6">
          <RangeStatistic
            statisticForRange={statisticForRange}
            monthsRange={monthsRange}
            setMonthsRange={setMonthsRange}
          />
        </Col>
        <Col xs="12" md="6">
        </Col>
      </Row>
    ) : (
      <div className="d-flex justify-content-center align-items-center h-100 fw-bold my-3 my-md-0 ">
        <p>{t('Some of your statistic will be here')}</p>
      </div>
    )}
  </Container>
);

export default Statistics;
