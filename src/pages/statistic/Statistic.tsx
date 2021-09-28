import React, { FC, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux.hook"
import { getStatisticForRange, getWholeStatistic } from "../../store/reducers/statistic.reducer"
import { statisticData, userData } from "../../store/selectors"
import 'moment/locale/ru'
import moment from "moment";
//@ts-ignore
//todo: learn how to work when there is no ts for library
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import Diagram from "../../components/statistic/Diagram";
import { List } from "../../components/statistic/List";
import { useTranslation } from "react-i18next";
import Loader from "../../components/loader/Loader";
import './statistic.scss'


const Statistic: FC = () => {
  const dispatch = useAppDispatch()
  const {
    wholeStatistic,
    statisticForRange,
    isWholeStatisticLoading,
    isStatisticForRangeLoading
  } = useAppSelector(statisticData)
  const { t } = useTranslation()
  const { user, lang } = useAppSelector(userData)
  const [monthsRange, setMonthsRange] = useState<Date[]>([new Date(user.created), new Date()]);
  const [useDiagram, setUseDiagram] = useState<boolean>(true)

  useEffect(() => {
    dispatch(getWholeStatistic())
    dispatch(getStatisticForRange({ from: monthsRange[0], to: monthsRange[1] }))
  }, [])

  if (isWholeStatisticLoading || isStatisticForRangeLoading) {
    return <Loader/>
  }

  return (
    <Container className='py-4'>
      {wholeStatistic && statisticForRange ? (
        <Row>
          <Col xs='12' md='6'>
            <p className='fs-5 mb-0 fw-bold'>{t('Select range')}:</p>
            <DateRangePicker
              onChange={setMonthsRange}
              maxDetail='year'
              value={monthsRange}
              locale='en'
              calendarIcon={null}
              clearIcon={null}
              format='MM.y'
              minDetail='year'
              minDate={new Date(2021, 3, 1)}
              maxDate={new Date()}
            />
            <div className='rangeHolder mt-3 text-center' data-tip='chart'>
              <div className='rangeHolderControls mb-3'>
                <Button
                  size='sm'
                  className={`mx-2 ${useDiagram ? 'text-white' : ''}`}
                  variant={useDiagram ? 'warning' : 'outline-warning'}
                  onClick={() => setUseDiagram(true)}
                >
                  {t('Pie chart')}
                </Button>
                <Button
                  size='sm'
                  className={useDiagram ? '' : 'text-white'}
                  variant={useDiagram ? 'outline-warning' : 'warning'}
                  onClick={() => setUseDiagram(false)}
                >
                  {t('List')}
                </Button>
              </div>
              <p className='fw-bold'>{t('Spent during this period')}:
                <span className='fst-italic yellowText'> {statisticForRange.totalSpent}</span></p>
              {useDiagram ?
                <Diagram
                  totalSpent={statisticForRange.totalSpent}
                  statisticForRange={statisticForRange.transactionsInRange}
                />
                :
                <List
                  userExpensesThisMonth={wholeStatistic.userExpensesThisMonth}
                  statisticForRange={statisticForRange.transactionsInRange}
                />}
            </div>
          </Col>
          <Col xs='12' md='6'>
            <p className='fs-5 mb-0 fw-bold'>{t('General statistic')}:</p>
            <div className='spent'>
              <p className='mb-0'>{t('Spent for the whole time')}:
                <span className='fst-italic yellowText'>
                {wholeStatistic.userExpenses}
              </span></p>
              <p className='mb-0'>{t('Spent this month')}:
                <span className='fst-italic yellowText'> {wholeStatistic.userExpensesThisMonth}
              </span></p>
            </div>
            <div className='earned mt-2'>
              <p className='mb-0'>{t('Earned for the whole time')}:
                <span className='fst-italic yellowText'>
             {wholeStatistic.userIncomes}
          </span></p>
              <p className='mb-1'>{t('Earned this month')}:
                <span className='fst-italic yellowText'>
              {wholeStatistic.userIncomesThisMonth}
          </span></p>
              <p className='fs-6 mb-0 fw-bold'>{t('On')} <span
                className='yellowText'>Billionstracker</span> {t('Since')} <span
                className='fst-italic yellowText'>{moment(user.created).locale(lang).format('LL')}</span></p>
            </div>
          </Col>
        </Row>
      ) : (
        <div className='d-flex justify-content-center align-items-center h-100 fw-bold my-3 my-md-0 '>
          <p>{t('Some of your statistic will be here')}</p>
        </div>
      )}
    </Container>
  )
}

export default Statistic