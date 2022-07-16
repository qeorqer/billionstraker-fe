import React from 'react';
import { Card, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { categoryType } from 'types/category.type';
import CustomToggle from 'components/CustomToggle';
import { useAppDispatch } from 'hooks/react-redux.hook';
import { deleteCategory } from 'store/reducers/category.reducer';

type propTypes = {
  categories: categoryType[];
};

const CategoriesList: React.FC<propTypes> = ({ categories }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  if (!categories.length) {
    return null;
  }

  return (
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
        centerInsufficientSlides
      >
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
                    <Dropdown.Item as="span" onClick={() => {}}>
                      {t('edit')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="span"
                      onClick={() =>
                        dispatch(deleteCategory({ categoryId: category._id! }))
                      }
                    >
                      {t('remove')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

export default CategoriesList;
