import { FC, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { balanceData, getBalancesThunk } from 'features/balance';
import BalanceListItem from 'features/balance/components/BalanceListItem';
import { useTranslation } from 'react-i18next';

type BalanceListProps = {
  showMenu?: boolean;
};

const BalancesList: FC<BalanceListProps> = ({ showMenu = false }) => {
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
        <p className="fs-4 fw-bold text-center pt-2">
          {t('all your balances')}
        </p>
      )}

      <Swiper
        modules={[FreeMode]}
        spaceBetween={15}
        slidesPerView={2}
        className="justify-content-center d-flex px-2"
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
        freeMode
      >
        {balances.map((balance) => (
          <SwiperSlide key={balance._id}>
            <BalanceListItem balance={balance} showMenu={showMenu} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

export default BalancesList;
