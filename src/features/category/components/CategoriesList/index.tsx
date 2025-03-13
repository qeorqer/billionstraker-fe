import { useTranslation } from 'react-i18next';
import { Title, Stack, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { categoryData } from 'features/category';
import CategoryListItem from 'features/category/components/CategoryListItem';
import { useAppSelector } from 'store/hooks';

const CategoriesList = () => {
  const { t } = useTranslation();
  const { categories } = useAppSelector(categoryData);

  if (!categories.length) {
    return (
      <Title order={2} ta="center" py="md" fw={500}>
        {t('your categories will be here')}
      </Title>
    );
  }

  return (
    <Stack gap="md">
      <Title order={2} ta="center" fw={500}>
        {t('all your categories')}
      </Title>

      <Box px={8}>
        <Carousel
          slideSize={{ base: '50%', xs: '33.333333%', md: '25%', lg: '20%' }}
          slideGap="md"
          align="start"
          withControls={false}
          slidesToScroll={1}
          containScroll="keepSnaps">
          {categories.map((category) => (
            <Carousel.Slide key={category._id}>
              <CategoryListItem category={category} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Stack>
  );
};

export default CategoriesList;
