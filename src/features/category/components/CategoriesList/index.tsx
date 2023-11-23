import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Category, categoryData } from 'features/category';
import CategoryListItem from 'features/category/components/CategoryListItem';
import { useAppSelector } from 'store/hooks';

const CategoriesList = () => {
  const { t } = useTranslation();
  const { categories } = useAppSelector(categoryData);

  if (!categories.length) {
    return (
      <p className="fs-4 fw-bold text-center py-2">
        {t('your categories will be here')}
      </p>
    );
  }

  return (
    <Row className="mb-3  justify-content-center d-flex">
      <p className="fs-4 fw-bold text-center py-2">
        {t('all your categories')}
      </p>

      <Swiper
        spaceBetween={15}
        slidesPerView={2}
        className="justify-content-center d-flex px-2"
        breakpoints={{
          400: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        centerInsufficientSlides>
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <CategoryListItem category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

export default CategoriesList;
