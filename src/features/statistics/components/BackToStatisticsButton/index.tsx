import { Affix, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const BackToStatisticsButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Affix position={{ top: 75, right: 20 }}>
      <Button onClick={() => navigate(-1)} size="sm" variant="light">
        {t('back to statistics')}
      </Button>
    </Affix>
  );
};

export default BackToStatisticsButton;
