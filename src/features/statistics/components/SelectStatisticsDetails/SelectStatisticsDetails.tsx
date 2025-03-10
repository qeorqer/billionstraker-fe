import { Col, Row } from 'react-bootstrap';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import CustomSelect from 'components/Shared/CustomSelect';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { balanceData } from 'features/balance';
import { useTranslation } from 'react-i18next';
import { statisticsData } from 'features/statistics/store/selector';

type SelectStatisticsDetailsProps = {
  setMonthsRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  monthsRange: [Date, Date];
  balanceName: string;
  setBalanceName: Dispatch<SetStateAction<string>>;
};

const SelectStatisticsDetails: FC<SelectStatisticsDetailsProps> = ({
  monthsRange,
  setMonthsRange,
  balanceName,
  setBalanceName,
}) => {
  const { statistics } = useAppSelector(statisticsData);

  const [dateRangeMaxDetail, setDateRangeMaxDetail] = useState<
    'year' | 'month'
  >('year');
  const [isDateRangeOpen, setIsDateRangeOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const { lang, user } = useAppSelector(userData);
  const { balances } = useAppSelector(balanceData);

  if (!statistics) {
    return null;
  }

  return (
    <Row className="d-flex justify-content-center text-center white-space-nowrap">
      <p className="h4 mb-1 fw-bold text-center">
        {t('Configure to see detailed statistics')}
      </p>
      <Col xs={12} sm={6} lg={4} className="max-width-220 p-1">
        <p className="mb-1 fw-bold text-center">{t('Select range')}:</p>
        <DateRangePicker
          autoFocus={false}
          onChange={(newValue) => setMonthsRange(newValue as [Date, Date])}
          maxDetail={dateRangeMaxDetail}
          value={monthsRange}
          locale={lang}
          calendarIcon={null}
          clearIcon={null}
          format="MM.y"
          minDetail="year"
          minDate={new Date(user.created)}
          maxDate={new Date()}
          onClick={() => setIsDateRangeOpen(true)}
          onCalendarClose={() => setIsDateRangeOpen(false)}
          className="data-range-picker w-100 cursor-pointer"
          onFocus={(e: any) => (e.target.readOnly = true)}
          isOpen={isDateRangeOpen}
        />
      </Col>
      <Col xs={12} sm={6} lg={4} className="max-width-220 p-1">
        <p className="mb-1 fw-bold text-center">{t('range detail')}:</p>
        <CustomSelect
          defaultButtonText={t('year')}
          defaultButtonValue="year"
          data={[
            { name: 'year', _id: 'year' },
            { name: 'month', _id: 'month' },
          ]}
          selectedValue={dateRangeMaxDetail}
          setSelectedValue={
            setDateRangeMaxDetail as Dispatch<SetStateAction<string>>
          }
          fieldToSelect="name"
          withTranslate
          showDefaultValue={false}
        />
      </Col>
      <Col xs={12} lg={4} className="max-width-220 p-1">
        <p className="mb-1 fw-bold text-center white-space-nowrap">
          {t('select balance')}
        </p>
        <CustomSelect
          defaultButtonText={t('show all')}
          defaultButtonValue=""
          data={balances.map((balance) => ({
            _id: balance._id,
            name: balance.name,
          }))}
          selectedValue={balanceName}
          setSelectedValue={setBalanceName}
          fieldToSelect="name"
        />
      </Col>
    </Row>
  );
};

export default SelectStatisticsDetails;
