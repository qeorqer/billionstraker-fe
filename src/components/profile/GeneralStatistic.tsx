import moment from 'moment';
import React, { FC } from 'react'
import { Col } from "react-bootstrap";
import { useAppSelector } from "../../hooks/react-redux.hook";
import { statisticData, userData } from "../../store/selectors";
import { useTranslation } from "react-i18next";
import 'moment/locale/ru'

const GeneralStatistic: FC = () => {
  const { generalStatistic } = useAppSelector(statisticData)
  const { user, lang } = useAppSelector(userData)
  const { t } = useTranslation()

  return (
    <Col md='6' xs='12'>
      {generalStatistic ? (
        <div className='my-3 my-md-0'>
          <p className='fs-5 mb-0 fw-bold'>{t('Spent this month')}: <span
            className='fst-italic yellowText'>{generalStatistic.userExpensesThisMonth}</span></p>
          <p className='fs-5 fw-bold'>{t('Spent for the whole time')}: <span
            className='fst-italic yellowText'>{generalStatistic.userExpenses}</span></p>
          <p className='fs-6 mb-0 fw-bold'>{t('On')} <span
            className='yellowText'>Billionstracker</span> {t('Since')} <span
            className='fst-italic yellowText'>{moment(user.created).locale(lang).format('LL')}</span></p>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center h-100 fw-bold my-3 my-md-0 '>
          <p>{t('Some of your statistic will be here')}</p>
        </div>
      )

      }
    </Col>
  )
}
export default GeneralStatistic