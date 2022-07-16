import React, { useEffect } from 'react';
import { Card, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getBalances } from 'store/reducers/balance.reducer';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import CustomToggle from 'components/CustomToggle';

type propsType = {
  withMenu?: boolean,
}

const BalancesList: React.FC<propsType> = ({ withMenu }) => {
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
        className='mb-3 justify-content-center d-flex px-2 overflow-y-visible'
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
      >
        {balances.map((balance) => (
          <SwiperSlide>
            <Card className='h-100'>
              <Card.Body className='d-flex justify-content-between'>
                <div>
                  <Card.Title>{balance.name}</Card.Title>
                  <Card.Text>{`${t('balance')}: ${balance.amount}`}</Card.Text>
                </div>
                <Dropdown drop='start'>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id='dropdown-custom-components'
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as='span'
                      onClick={() => {
                      }}
                    >
                      {t('edit')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as='span'
                      onClick={() => {
                      }}
                    >
                      {t('remove')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

BalancesList.defaultProps = {
  withMenu: false,
};

export default BalancesList;
