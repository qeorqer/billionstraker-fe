import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Text, Group, Stack, ActionIcon } from '@mantine/core';
import { IconPencil, IconX } from '@tabler/icons-react';

import { Category } from 'features/category/types';
import DeleteCategoryModal from 'features/category/components/DeleteCategoryModal';
import EditCategoryModal from 'features/category/components/EditСategoryModal';

type CategoryListItemProps = {
  category: Category;
};

const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Card
        withBorder
        radius="md"
        p="sm"
        h="100%"
        style={{ justifyContent: 'center' }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Stack gap={4}>
            <Text fw={500} size="sm" lineClamp={2}>
              {category.name}
            </Text>
            <Text size="xs" c="dimmed" fs="italic">
              {`${t('category type')}: ${t(category.categoryType)}`}
            </Text>
          </Stack>
          <Stack gap={4}>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setIsEditCategoryModalOpen(true)}
              size="sm">
              <IconPencil style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setIsDeleteCategoryModalOpen(true)}
              size="sm">
              <IconX style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </Stack>
        </Group>
      </Card>
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        handleClose={() => setIsEditCategoryModalOpen(false)}
        category={category}
      />
      <DeleteCategoryModal
        isOpen={isDeleteCategoryModalOpen}
        handleClose={() => setIsDeleteCategoryModalOpen(false)}
        category={category}
      />
    </>
  );
};

export default CategoryListItem;
