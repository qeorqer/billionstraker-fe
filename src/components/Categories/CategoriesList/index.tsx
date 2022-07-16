import React from 'react';
import { Card, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { categoryType } from 'types/category.type';
import CustomToggle from 'components/CustomToggle';

type propTypes = {
  categories: categoryType[];
};

const CategoriesList: React.FC<propTypes> = ({ categories }) => {
  const { t } = useTranslation();

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
      >
        {categories.map((category) => (
          <SwiperSlide className="mb-3" key={category._id}>
            <Card>
              <Card.Header>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id='dropdown-custom-components'
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as='span'
                      onClick={() => {
                      }}
                    >
                      {t('edit')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as='span'
                      onClick={() => {
                      }}
                    >
                      {t('remove')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>{`${t('category type')}: ${t(
                  category.categoryType,
                )}`}</Card.Text>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

export default CategoriesList;
