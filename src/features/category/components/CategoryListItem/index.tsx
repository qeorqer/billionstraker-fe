import { Card } from 'react-bootstrap';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Category } from 'features/category/types';
import DeleteCategoryModal from 'features/category/components/DeleteCategoryModal';
import EditCategoryModal from 'features/category/components/EditСategoryModal';

import './styles.scss';

type CategoryListItemProps = {
  category: Category;
};

type ActionOption = {
  onClick: () => void;
  classes: string;
};

const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const { t } = useTranslation();

  const options: ActionOption[] = [
    {
      classes: 'bi bi-pencil text-dark mx-1',
      onClick: () => setIsEditCategoryModalOpen(true),
    },
    {
      classes: 'bi bi-x-lg text-dark',
      onClick: () => setIsDeleteCategoryModalOpen(true),
    },
  ];

  return (
    <>
      <Card className="h-100">
        <Card.Body className="d-flex justify-content-between category-card-body-content">
          <div className="pr-1 flex-grow-1">
            <Card.Title className="category-card-body-title" as="p">
              {category.name}
            </Card.Title>
            <Card.Text className="category-card-body-type">
              {`${t('category type')}: ${t(category.categoryType)}`}
            </Card.Text>
          </div>
          <div className="d-flex flex-column align-items-end justify-content-center">
            {options.map(({ classes, onClick }, index) => (
              <div
                key={index}
                onClick={onClick}
                className="category-action-button">
                <i className={classes} />
              </div>
            ))}
          </div>
        </Card.Body>
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
