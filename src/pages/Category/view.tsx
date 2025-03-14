import { FC } from 'react';
import { Container, Box, Title, Stack } from '@mantine/core';

import CategoriesList from 'features/category/components/CategoriesList';
import CategoryForm from 'features/category/components/CategoryForm';

type CategoryPageViewProps = {
  t: (text: string) => string;
};

const CategoryPageView: FC<CategoryPageViewProps> = ({ t }) => (
  <Box component="main" bg="dark" c="white" style={{ minHeight: '100vh' }}>
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <CategoriesList />
        <Stack
          align="center"
          maw="420px"
          w="100%"
          style={{ alignSelf: 'center' }}>
          <Title order={2} fw={500} ta="center">
            {t('add new category')}
          </Title>
          <CategoryForm buttonText="create" />
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default CategoryPageView;
