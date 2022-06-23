import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { setFirstEnter, setInitialValues } from 'store/reducers/user.reducer';
import { userData } from 'store/selectors';

const Init = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useAppSelector(userData);
  const [card, setCard] = useState<number | string>('');
  const [cash, setCash] = useState<number | string>('');

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<number | string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        validateSumReg.test(event.target.value) ||
        event.target.value === ''
      ) {
        setter(event.target.value);
      }
    };

  const validateSumReg = /^[0-9]+$/;

  useEffect(() => {
    if (user.isFirstEnter) {
      dispatch(setFirstEnter());
    }
  }, []);

  const handleInit = () => {
    if (card === '' || cash === '') {
      return toast(t('All fields are required'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    dispatch(setInitialValues({ card: Number(card), cash: Number(cash) }));
    history.push('/');
  };

  const hideHeader = `
  header .menu ul{
    display: none;
  }`;

  return (
    <>
      <style>{hideHeader}</style>
      <Container className="py-4">
        <p className="fs-4 fw-bold text-center py-2">
          {t('Here you can set initial values for your balance')}
        </p>
        <Row className="text-center">
          <Col xs="12" lg="6" className="mb-3 mb-lg-0">
            <p className="fs-5 fw-bold">{t('Set your card balance')}:</p>
            <FormControl
              type="number"
              placeholder={t('Sum on card')}
              value={card}
              onChange={handleChange(setCard)}
            />
          </Col>
          <Col xs="12" lg="6">
            <p className="fs-5 fw-bold">{t('Set your cash balance')}:</p>
            <FormControl
              type="number"
              placeholder={t('Sum in cash')}
              value={cash}
              onChange={handleChange(setCash)}
            />
          </Col>
          <Col xs="12" className="mt-3 text-center">
            <p className="fs-5 mb-1 mt-4">{t('Set initial values')}:</p>
            <Button
              variant="warning"
              className="w300Px text-white"
              onClick={handleInit}
            >
              {t('Initialize')}
            </Button>
            <p
              className="mt-2 yellowText text-decoration-underline cursor-pointer"
              onClick={() => history.push('/')}
            >
              {t('Skip')}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Init;
