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
        spaceBetween={20}
        slidesPerView={1}
        className="mb-3  justify-content-center d-flex px-2"
        breakpoints={{
          420: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
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
