import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { balanceData, getBalancesThunk } from 'features/balance';
import BalanceListItem from 'features/balance/components/BalanceListItem';
import { useTranslation } from 'react-i18next';

type BalanceListProps = {
  showMenu?: boolean;
};

const BalancesList: React.FC<BalanceListProps> = ({ showMenu = false }) => {
  const { t } = useTranslation();
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
      {Boolean(balances.length) && (
        <p className="fs-4 fw-bold text-center py-2">
          {t('all your balances')}
        </p>
      )}
      <Swiper
        spaceBetween={15}
        slidesPerView={2}
        className="justify-content-center d-flex overflow-y-visible"
        breakpoints={{
          500: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
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
