import React, { Dispatch, FC, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import WholeStatistic from 'components/Statistics/WholeStatistic';
import RangeStatistic from 'components/Statistics/RangeStatistic';
import {
  statisticForRangeType,
  wholeStatisticType,
} from 'types/statistic.type';
import { userType } from 'types/user.type';

type propsType = {
  t: (text: string) => string;
  wholeStatistic: wholeStatisticType | null;
  statisticForRange: statisticForRangeType | null;
  monthsRange: Date[];
  setMonthsRange: Dispatch<SetStateAction<Date[]>>;
  user: userType;
  lang: string;
};

const Statistics: FC<propsType> = ({
  t,
  wholeStatistic,
  statisticForRange,
  monthsRange,
  setMonthsRange,
  user,
  lang,
}) => (
  <Container className="py-4">
    {wholeStatistic && statisticForRange ? (
      <Row>
        <Col xs="12" md="6">
          <RangeStatistic
            statisticForRange={statisticForRange}
            monthsRange={monthsRange}
            setMonthsRange={setMonthsRange}
          />
        </Col>
        <Col xs="12" md="6">
          <WholeStatistic
            wholeStatistic={wholeStatistic}
            user={user}
            lang={lang}
          />
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
