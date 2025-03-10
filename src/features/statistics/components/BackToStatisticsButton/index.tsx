import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import './styles.scss';

const BackToStatisticsButton = () => {
  const { t } = useTranslation();
  const { goBack } = useHistory();

  return (
    <Button variant="warning backToStatisticsButton" onClick={goBack}>
      {t('back to statistics')}
    </Button>
  );
};

export default BackToStatisticsButton;
