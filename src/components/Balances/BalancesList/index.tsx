import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  deleteBalance,
  getBalances,
  updateBalance,
} from 'store/reducers/balance.reducer';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import CustomToggle from 'components/CustomToggle';
import BalanceForm from 'components/Balances/BalanceForm';
import { handleChangeAmount } from 'utils/handleChangeAmount';

type propsType = {
  withMenu?: boolean;
};

const BalancesList: React.FC<propsType> = ({ withMenu }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string | number>('');
  const [selectedBalanceId, setSelectedBalanceId] = useState<string>('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { balances, isLoadingBalances } = useAppSelector(
    (state) => state.balanceData,
  );

  const handleEditClick = (balanceId: string) => {
    const selectedBalance = balances.find(
      (balance) => balance._id === balanceId,
    );

    setName(selectedBalance?.name!);
    setAmount(selectedBalance?.amount!);
    setSelectedBalanceId(balanceId);
    setIsModalShown(true);
  };

  const handleEditBalance = () => {
    const selectedBalance = balances.find(
      (balance) => balance._id === selectedBalanceId,
    );

    if (selectedBalance) {
      const balanceForUpdate = {
        ...selectedBalance,
        amount: Number(amount),
        name,
      };

      dispatch(
        updateBalance({
          balanceId: selectedBalanceId,
          balance: balanceForUpdate,
        }),
      );
    }

    setSelectedBalanceId('');
    setName('');
    setAmount('');
    setIsModalShown(false);
  };

  useEffect(() => {
    dispatch(getBalances());
  }, []);

  if (!balances.length) {
    return null;
  }

  return (
    <>
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
          centerInsufficientSlides
        >
          {balances.map((balance) => (
            <SwiperSlide key={balance._id}>
              <Card className="h-100">
                <Card.Body className="d-flex justify-content-between">
                  <div>
                    <Card.Title>{balance.name}</Card.Title>
                    <Card.Text>
                      {`${t('balance')}: ${balance.amount}`}
                    </Card.Text>
                  </div>
                  {withMenu && (
                    <Dropdown drop="start">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as="span"
                          onClick={() => handleEditClick(balance._id)}
                        >
                          {t('edit')}
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="span"
                          onClick={() =>
                            dispatch(deleteBalance({ balanceId: balance._id }))
                          }
                        >
                          {t('remove')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
      <Modal show={isModalShown} onHide={() => setIsModalShown(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('edit balance')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BalanceForm
            name={name}
            setName={setName}
            amount={amount}
            handleChangeAmount={handleChangeAmount(setAmount)}
            buttonText="update"
            handleSubmit={handleEditBalance}
            isLoading={isLoadingBalances}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

BalancesList.defaultProps = {
  withMenu: false,
};

export default BalancesList;
