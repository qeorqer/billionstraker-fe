import { FC } from 'react';
import { Container, Grid, Box, Title, Stack } from '@mantine/core';

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
        <Grid>
          <Grid.Col span={{ base: 12, md: 5 }} offset={{ md: 3.5 }}>
            <Stack align="center" gap="md">
              <Title order={2} fw={500} ta="center">
                {t('add new category')}
              </Title>
              <Box maw="320px" w="100%">
                <CategoryForm buttonText="create" />
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  </Box>
);

export default CategoryPageView;
