import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { balanceData, getBalancesThunk } from 'features/balance';
import BalanceListItem from 'features/balance/components/BalanceListItem';

type BalanceListProps = {
  showMenu?: boolean;
};

const BalancesList: React.FC<BalanceListProps> = ({ showMenu = false }) => {
  const dispatch = useAppDispatch();
  const { balances } = useAppSelector(balanceData);

  useEffect(() => {
    dispatch(getBalancesThunk());
  }, []);

  if (!balances.length) {
    return null;
  }

  return (
    <Row>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        className="mb-3 justify-content-center d-flex px-2 overflow-y-visible"
        breakpoints={{
          450: {
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
        centerInsufficientSlides>
        {balances.map((balance) => (
          <SwiperSlide key={balance._id}>
            <BalanceListItem balance={balance} showMenu={showMenu} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

BalancesList.defaultProps = {
  showMenu: false,
};

export default BalancesList;
