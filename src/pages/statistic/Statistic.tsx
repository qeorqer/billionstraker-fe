import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';
import {
  getStatisticForRange,
  getWholeStatistic,
} from '../../store/reducers/statistic.reducer';
import { statisticData, userData } from '../../store/selectors';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/Loader';
import 'moment/locale/ru';
import WholeStatistic from '../../components/statistic/WholeStatistic';
import RangeStatistic from '../../components/statistic/RangeStatistic';

const Statistic: FC = () => {
  const dispatch = useAppDispatch();
  const {
    wholeStatistic,
    statisticForRange,
    isWholeStatisticLoading,
    isStatisticForRangeLoading,
  } = useAppSelector(statisticData);
  const { t } = useTranslation();
  const { user, lang } = useAppSelector(userData);

  useEffect(() => {
    dispatch(getWholeStatistic());
  }, []);

  const [monthsRange, setMonthsRange] = useState<Date[]>([
    new Date(user.created),
    new Date(),
  ]);

  useEffect(() => {
    dispatch(
      getStatisticForRange({ from: monthsRange[0], to: monthsRange[1] }),
    );
  }, [monthsRange]);

  if (isWholeStatisticLoading && isStatisticForRangeLoading) {
    return <Loader />;
  }

  return (
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
};

export default Statistic;
