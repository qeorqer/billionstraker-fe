import React, { useEffect } from 'react';
import { Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getBalances } from 'store/reducers/balance.reducer';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';

const BalancesList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { balances } = useAppSelector((state) => state.balanceData);

  useEffect(() => {
    dispatch(getBalances());
  }, []);

  if (!balances.length) {
    return null;
  }

  return (
    <Row>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        className="mb-3  justify-content-center d-flex"
      >
        {balances.map((balance) => (
          <SwiperSlide className="mb-3" key={balance._id}>
            <Card>
              <Card.Body>
                <Card.Title>{balance.name}</Card.Title>
                <Card.Text>{`${t('balance')}: ${balance.amount}`}</Card.Text>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

export default BalancesList;
