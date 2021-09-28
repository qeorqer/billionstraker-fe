import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap"
import { categoryData, userData } from "../../store/selectors"
import { formattingNumber } from "../../helpers/index.js"
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux.hook"
import { addTransaction } from "../../store/reducers/user.reducer"
import { transactionType } from "../../types/transaction.type"
import { getCategories } from "../../store/reducers/category.reducer"
import './transaction.scss'
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const CreateTransaction = () => {
  const { user, lang } = useAppSelector(userData)
  const { categories } = useAppSelector(categoryData)
  const [useCard, setUseCard] = useState<boolean>(true)
  const [isExpense, setIsExpense] = useState<boolean>(true)
  const [categoryId, setCategoryId] = useState<string>('')
  const [sum, setSum] = useState<number | string>('')
  const [title, setTitle] = useState<string>('')
  const { t } = useTranslation()
  const dispatch = useAppDispatch()


  const validateSumReg = /^((?!(0))[0-9]+)$/;

  const handleChangeSum = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateSumReg.test(event.target.value) || event.target.value === '') {
      setSum(event.target.value)
    }
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleSubmit = () => {
    if (!sum || !categoryId || !title) {
      return toast(t('All fields are required'), {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    }

    if(isExpense){
      if ((useCard && user.card < sum) || (!useCard && user.cash < sum)){
        return toast(t('You don\'t have this much'), {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'error'
        })
      }

      if(Number(sum) === 0){
        return toast(t('You don\'t have this much'), {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'error'
        })
      }
    }
    const newTransaction: transactionType = {
      title: title,
      ownerId: user._id,
      isCard: useCard,
      isExpense: isExpense,
      sum: Number(sum),
      category: categoryId,
      date: new Date()
    }

    dispatch(addTransaction({ transaction: newTransaction }))
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
      <Container className='py-md-4 my-4'>
        <Row>
          <p className='mb-1 fs-4 text-center fw-bold'>{t('Select operation type')}:</p>
          <Col xs='12' lg='5' className='mx-auto d-flex'>
            <div className='w-50 text-center'>
              <Button
                variant={isExpense ? 'danger' : 'outline-danger'}
                className='w-75'
                onClick={() => {
                  setIsExpense(true)
                  setCategoryId('')
                }}
              >
                {t('expense')}
              </Button>
            </div>
            <div className='w-50 text-center'>
              <Button
                variant={!isExpense ? 'success' : 'outline-success'}
                className='w-75'
                onClick={() => {
                  setIsExpense(false)
                  setCategoryId('')
                }}
              >
                {t('income')}
              </Button>
            </div>

          </Col>
        </Row>
        <Row>
          <Col xs='12' lg='5' className='mx-auto d-md-flex mt-3'>
            <p className='fs-5 mb-0 w-50 text-md-center text-nowrap'>{t('Card balance')}:
              <span className='yellowText'> {formattingNumber(user.card)}</span>
            </p>
            <p className='fs-5 w-50 text-md-center text-nowrap'>{t('Cash balance')}:
              <span className='yellowText'> {formattingNumber(user.cash)}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs='12' lg='7' className='mx-auto'>
            <Row>
              <Col xs='12' sm='6' className='d-flex flex-wrap'>
                <p className='mb-1 fs-5 text-center w-100'>{t('Select card or cash')}:</p>
                <Form.Check
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
                />
              </Col>
              <Col xs='12' sm='6'>
                <p className='mb-1 fs-5 text-center w-100'>{t('Select category')}:</p>
                <Form.Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}>
                  <option className='d-none' value=''>{t('Select category')}</option>
                  {categories &&
                  categories
                    .filter((category) => category.isExpense === isExpense)
                    .map((el) =>
                      <option
                        key={el._id}
                        value={el._id}
                      >
                        {lang === 'en' ? el.nameEn : el.nameRu}
                      </option>
                    )}
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
                  onChange={handleChangeTitle}
                />
              </Col>
              <Col xs='6' className='d-flex flex-wrap'>
                <p className='mb-1  fs-5'>{t('Enter the sum of transaction')}:</p>
                <FormControl
                  type='text'
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
  )
}

export default CreateTransaction