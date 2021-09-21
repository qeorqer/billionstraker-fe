import React, { FC } from 'react'
import { transactionType } from "../../types/transaction.type"
import { Card, Col, Row } from "react-bootstrap"
import { formatTransactionDate } from "../../helpers/time";
import { formattingNumber } from "../../helpers/index.js";
import { useAppSelector } from "../../hooks/react-redux.hook";
import { userData } from "../../store/selectors";

type propsType = {
  transaction: transactionType
}

const Transaction: FC<propsType> = ({ transaction }) => {
  const {lang} = useAppSelector(userData)

  return (
    <Card className='mb-3  w-75 mx-auto fw-bold text-center' bg='light' text='dark'>
      <Card.Body><
        Row>
        <Col xs='12' sm='4' className='mb-2 mb-sm-0'>{transaction.title}</Col>
        <Col xs='8' sm='4'>{formatTransactionDate(transaction.date, lang)}</Col>
        <Col xs='4' sm='4'>{
          transaction.isExpense ?
            <span className='text-danger'>-{formattingNumber(transaction.sum)}</span> :
            <span className='text-success'>+{formattingNumber(transaction.sum)}</span>}</Col>
      </Row>
      </Card.Body>
    </Card>
  )
}

export default Transaction