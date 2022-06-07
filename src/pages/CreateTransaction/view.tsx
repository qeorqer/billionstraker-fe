import React, {Dispatch, SetStateAction} from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';

import { transactionTypes } from '../../types/transaction.type';
import { balanceType } from '../../types/balance.type';
import { categoryType } from '../../types/category.type';

type propsType = {
  t: (text: string) => string,
  transactionType: transactionTypes,
  setTransactionType: Dispatch<SetStateAction<transactionTypes>>,
  setCategoryId: Dispatch<SetStateAction<string>>,
  setBalanceId: Dispatch<SetStateAction<string>>,
  setTitle: Dispatch<SetStateAction<string>>,
  balances: balanceType[],
  categories: categoryType[],
  lang: string,
  title: string,
  sum: string | number,
  handleChangeSum: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: () => void,
}

const CreateTransaction: React.FC<propsType> =
  ({
     t,
     transactionType,
     setTransactionType,
     setCategoryId,
     setBalanceId,
     setTitle,
     balances,
     categories,
     lang,
     title,
     sum,
     handleChangeSum,
     handleSubmit,
   }) => (
    <>
      <Container className='py-md-4 my-4'>
        <Row>
          <p className='mb-1 fs-4 text-center fw-bold'>
            {t('Select operation type')}:
          </p>
          <Col xs='12' lg='4' className='mx-auto d-flex'>
            <div className='w-50 text-center'>
              <Button
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
            <div className='w-50 text-center'>
              <Button
                variant={
                  transactionType === 'profit' ? 'success' : 'outline-success'
                }
                onClick={() => {
                  setTransactionType('profit');
                  setCategoryId('');
                }}
              >
                {t('income')}
              </Button>
            </div>
            <div className='w-50 text-center'>
              <Button
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
        {/*  <Row>
          <Col xs='12' lg='5' className='mx-auto d-md-flex mt-3'>
            <p className='fs-5 mb-0 w-50 text-md-center text-nowrap'>
              {t('Card balance')}:
              <span className='yellowText'> {formattingNumber(user.card)}</span>
            </p>
            <p className='fs-5 w-50 text-md-center text-nowrap'>
              {t('Cash balance')}:
              <span className='yellowText'> {formattingNumber(user.cash)}</span>
            </p>
          </Col>
        </Row>*/}
        <Row>
          <Col xs='12' lg='7' className='mx-auto  mt-3'>
            <Row>
              <Col xs='12' sm='6' className='d-flex flex-wrap'>
                <p className='mb-1 fs-5 text-center w-100'>
                  {t('select balance')}:
                </p>
                <Form.Select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setBalanceId(e.target.value)
                  }
                >
                  `
                  <option className='d-none' value=''>
                    {t('select balance')}
                  </option>
                  {balances &&
                  balances.map((balance) => (
                    <option key={balance._id} value={balance._id}>
                      {balance.name}
                    </option>
                  ))}
                </Form.Select>
                {/*<Form.Check
                  checked={useCard}
                  type='radio'
                  name='cardOrCash'
                  id='default-radio2'
                  className='paymentCard d-flex align-items-center w-50 justify-content-center'
                  label=''
                  onChange={() => setUseCard(true)}
                />
                <Form.Check
                  checked={!useCard}
                  type='radio'
                  name='cardOrCash'
                  id='default-radio1'
                  label=''
                  className='paymentCash d-flex align-items-center w-50 justify-content-center'
                  onChange={() => setUseCard(false)}
                />*/}
              </Col>
              <Col xs='12' sm='6'>
                <p className='mb-1 fs-5 text-center w-100'>
                  {t('Select category')}:
                </p>
                <Form.Select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCategoryId(e.target.value)
                  }
                >
                  <option className='d-none' value=''>
                    {t('Select category')}
                  </option>
                  {categories &&
                  categories
                  //.filter((category) => category.isExpense === isExpense)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {lang === 'en' ? category.nameEn : category.nameRu}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col xs='6' className='d-flex flex-wrap'>
                <p className='mb-1 fs-5'>{t('Name the transaction')}:</p>
                <FormControl
                  type='text'
                  placeholder={t('Transaction title')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col xs='6' className='d-flex flex-wrap'>
                <p className='mb-1  fs-5'>
                  {t('Enter the sum of transaction')}:
                </p>
                <FormControl
                  type='number'
                  placeholder={t('Transaction sum')}
                  value={sum}
                  onChange={handleChangeSum}
                />
              </Col>
            </Row>
            <Row>
              <Col xs='12' className='mt-3 text-center'>
                <p className='fs-5 mb-1'>{t('Submit transaction')}:</p>
                <Button
                  variant='warning'
                  className='w300Px text-white'
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
