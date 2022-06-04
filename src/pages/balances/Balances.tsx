import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';
import {
  createBalance,
  getBalances,
} from '../../store/reducers/balance.reducer';

const Balances = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { balances } = useAppSelector(state => state.balanceData);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validateSumReg = /^[0-9]+$/;

    if (
      validateSumReg.test(event.target.value) ||
      event.target.value === ''
    ) {
      setAmount(event.target.value);
    }
  };


  useEffect(() => {
    dispatch(getBalances());
  }, []);

  const handleInit = () => {
    if (!name || !amount) {
      return toast(t('All fields are required'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    dispatch(createBalance({ name, amount: Number(amount) }));
  };


  return (
    <>
      <Container className='py-4'>
        <p className='fs-4 fw-bold text-center py-2'>
          {t(balances.length ? 'all your balances' : 'your balances will be here')}
        </p>
        {
          balances.length && (
            <Row className='mb-3'>
              {balances.map((balance) => (
                <Col xs={12} lg={3} md={4} sm={6} className='mb-3'>
                  <Card>
                    <Card.Body>
                      <Card.Title>{balance.name}</Card.Title>
                      <Card.Text>
                        {`${t('balance')}: ${balance.amount}`}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        <Row className='text-center'>
          <Col xs='12' lg='6' className='mb-3 mb-lg-0 mx-auto'>
            <p className='fs-5 fw-bold'>{t('add new balance')}:</p>
            <FormControl
              type='text'
              placeholder={t('name the balance')}
              value={name}
              onChange={e => setName(e.target.value)}
              className='mb-3'
            />
            <FormControl
              type='number'
              placeholder={t('set amount')}
              value={amount}
              onChange={handleChangeAmount}
              className='mb-3'
            />
            <Button
              variant='warning'
              className='w300Px text-white'
              onClick={handleInit}
            >
              {t('create')}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Balances;
