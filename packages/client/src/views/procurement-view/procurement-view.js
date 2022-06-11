import React from 'react';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const {
  ProductionPage,
  ResearchPage,
} = pages;
const { Swiper } = shared;

const ProcurementView = () => {
  return (
    <Styles.Root>
      <Swiper>
        <ProductionPage/>
        <ResearchPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default ProcurementView;
