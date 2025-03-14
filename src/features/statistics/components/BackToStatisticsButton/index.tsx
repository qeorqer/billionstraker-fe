import { Affix, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const BackToStatisticsButton = () => {
  const { t } = useTranslation();
  const { goBack } = useHistory();

  return (
    <Affix position={{ top: 30, right: 20 }}>
      <Button onClick={goBack} size="sm" variant="light">
        {t('back to statistics')}
      </Button>
    </Affix>
  );
};

export default BackToStatisticsButton;
