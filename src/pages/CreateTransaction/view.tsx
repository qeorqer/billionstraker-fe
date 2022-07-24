import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import { transactionTypes } from 'types/transaction.type';
import { balanceType } from 'types/balance.type';
import { categoryType } from 'types/category.type';
import Balances from 'components/Balances/BalancesList';
import CustomSelect from 'components/CustomSelect';
import 'react-datepicker/dist/react-datepicker.css';

type propsType = {
  t: (text: string) => string;
  transactionType: transactionTypes;
  setTransactionType: Dispatch<SetStateAction<transactionTypes>>;
  setCategoryId: Dispatch<SetStateAction<string>>;
  categoryId: string;
  setBalanceId: Dispatch<SetStateAction<string>>;
  balanceId: string;
  setExchangeBalanceId: Dispatch<SetStateAction<string>>;
  exchangeBalanceId: string;
  setTitle: Dispatch<SetStateAction<string>>;
  balances: balanceType[];
  categories: categoryType[];
  title: string;
  sum: string | number;
  exchangeSum: string | number;
  handleChangeSum: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeExchangeSum: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

const CreateTransaction: React.FC<propsType> = ({
  t,
  transactionType,
  setTransactionType,
  setCategoryId,
  categoryId,
  setBalanceId,
  balanceId,
  setExchangeBalanceId,
  exchangeBalanceId,
  setTitle,
  balances,
  categories,
  title,
  sum,
  exchangeSum,
  handleChangeSum,
  handleChangeExchangeSum,
  handleSubmit,
  date,
  setDate,
}) => (
  <>
    <Container className="py-md-4 my-4">
      <Row>
        <p className="mb-1 fs-4 text-center fw-bold">
          {t('Select operation type')}:
        </p>
        <Col xs="12" lg="4" className="mx-auto d-flex">
          <div className="w-50 text-center">
            <Button
              className="w-100"
              variant={
                transactionType === 'expense' ? 'danger' : 'outline-danger'
              }
              onClick={() => {
                setTransactionType('expense');
                setCategoryId('');
              }}
            >
              {t('expense')}
            </Button>
          </div>
          <div className="w-50 text-center  mx-2">
            <Button
              className="w-100"
              variant={
                transactionType === 'profit' ? 'success' : 'outline-success'
              }
              onClick={() => {
                setTransactionType('profit');
                setCategoryId('');
              }}
            >
              {t('profit')}
            </Button>
          </div>

          <div className="w-50 text-center">
            <Button
              className="w-100"
              variant={
                transactionType === 'exchange' ? 'primary' : 'outline-primary'
              }
              onClick={() => {
                setTransactionType('exchange');
                setCategoryId('');
              }}
            >
              {t('exchange')}
            </Button>
          </div>
        </Col>
      </Row>

      <p className="fs-4 fw-bold text-center my-2">
        {t(
          balances.length ? 'all your balances' : 'your balances will be here',
        )}
      </p>
      <Balances />

      <Row>
        <Col xs="12" lg="7" className="mx-auto  mt-3">
          <Row>
            <Col xs="12" sm="4" className="d-flex flex-wrap">
              <p className="mb-1 fs-5 text-center w-100">
                {t('select balance')}:
              </p>
              <CustomSelect
                defaultButtonText={t('select balance')}
                defaultButtonValue=""
                data={balances.map((balance) => ({
                  _id: balance._id,
                  name: balance.name,
                }))}
                selectedValue={balanceId}
                setSelectedValue={setBalanceId}
              />
            </Col>
            <Col xs="12" sm="4">
              {transactionType === 'exchange' ? (
                <>
                  <p className="mb-1 fs-5 text-center w-100">
                    {t('select balance')}:
                  </p>
                  <CustomSelect
                    defaultButtonText={t('select balance')}
                    defaultButtonValue=""
                    data={balances.map((balance) => ({
                      _id: balance._id,
                      name: balance.name,
                      disabled: balance._id === balanceId,
                    }))}
                    selectedValue={exchangeBalanceId}
                    setSelectedValue={setExchangeBalanceId}
                  />
                </>
              ) : (
                <>
                  <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                    {t('Select category')}:
                  </p>
                  <CustomSelect
                    defaultButtonText={t('Select category')}
                    defaultButtonValue=""
                    data={categories
                      .filter(
                        (category) => category.categoryType === transactionType,
                      )
                      .map((category) => ({
                        _id: category._id!,
                        name: category.name,
                      }))}
                    selectedValue={categoryId}
                    setSelectedValue={setCategoryId}
                  />
                </>
              )}
            </Col>
            <Col xs="12" sm="4" className="d-flex flex-wrap">
              <p className="mb-1 fs-5 text-center w-100">{t('select date')}:</p>
              <DatePicker
                selected={date}
                onChange={(newDate) => setDate(newDate || new Date())}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                onFocus={(e) => (e.target.readOnly = true)}
                maxDate={new Date()}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col
              xs={transactionType === 'exchange' ? 12 : 6}
              className="d-flex flex-wrap"
            >
              <p className="mb-1 fs-5">{t('Name the transaction')}:</p>
              <FormControl
                type="text"
                placeholder={t('Transaction title')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col xs={6} className="d-flex flex-wrap">
              <p className="mb-1  fs-5">
                {t(transactionType === 'exchange' ? 'send' : 'Transaction sum')}
                :
              </p>
              <FormControl
                type="number"
                placeholder={t('Transaction sum')}
                value={sum}
                onChange={handleChangeSum}
              />
            </Col>

            {transactionType === 'exchange' && (
              <Col xs="6" className="d-flex flex-wrap">
                <p className="mb-1  fs-5">{t('receive')}:</p>
                <FormControl
                  type="number"
                  placeholder={t('Transaction sum')}
                  value={exchangeSum}
                  onChange={handleChangeExchangeSum}
                />
              </Col>
            )}
          </Row>

          <Row>
            <Col xs="12" className="mt-3 text-center">
              <p className="fs-5 mb-1">{t('Submit transaction')}:</p>
              <Button
                variant="warning"
                className="w300Px text-white"
                onClick={handleSubmit}
              >
                {t('Submit')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
);

export default CreateTransaction;
