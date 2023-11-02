import React, { useState } from 'react';
import { Card, Dropdown, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import CustomToggle from 'components/Shared/CustomToggle';
import { useAppDispatch } from 'store/hooks';
import CategoryForm from 'features/category/components/CategoryForm';
import {
  deleteCategoryThunk,
  updateCategoryThunk,
  CategoryTypes,
  Category,
} from 'features/category';

type propsType = {
  categories: Category[];
};

const CategoriesList: React.FC<propsType> = ({ categories }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [categoryType, setCategoryType] = useState<CategoryTypes>('expense');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleEditClick = (categoryId: string) => {
    const selectedCategory = categories.find(
      (category) => category._id === categoryId,
    );

    setName(selectedCategory?.name!);
    setCategoryType(selectedCategory?.categoryType!);
    setSelectedCategoryId(categoryId);
    setIsModalShown(true);
  };

  const handleEditBalance = () => {
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId,
    );

    if (selectedCategory) {
      const categoryForUpdate = {
        ...selectedCategory,
        categoryType,
        name,
      };

      dispatch(
        updateCategoryThunk({
          categoryId: selectedCategoryId,
          category: categoryForUpdate,
        }),
      );
    }

    setSelectedCategoryId('');
    setName('');
    setCategoryType('expense');
    setIsModalShown(false);
  };

  if (!categories.length) {
    return null;
  }

  return (
    <>
      <Row className="mb-3  justify-content-center d-flex">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          className="mb-3  justify-content-center d-flex px-2"
          breakpoints={{
            450: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          centerInsufficientSlides>
          {categories.map((category) => (
            <SwiperSlide className="mb-3" key={category._id}>
              <Card className="h-100">
                <Card.Body className="d-flex justify-content-between">
                  <div>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text>
                      {`${t('category type')}: ${t(category.categoryType)}`}
                    </Card.Text>
                  </div>
                  <Dropdown drop="start">
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as="span"
                        onClick={() => handleEditClick(category._id!)}>
                        {t('edit')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="span"
                        onClick={() =>
                          dispatch(
                            deleteCategoryThunk({ categoryId: category._id! }),
                          )
                        }>
                        {t('remove')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <Modal
          show={isModalShown}
          onHide={() => setIsModalShown(false)}
          centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('edit category')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CategoryForm
              name={name}
              setName={setName}
              categoryType={categoryType}
              setCategoryType={setCategoryType}
              handleSubmit={handleEditBalance}
              buttonText="update"
            />
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
};

export default CategoriesList;