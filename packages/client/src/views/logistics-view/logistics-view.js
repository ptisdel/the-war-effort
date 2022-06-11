import React from 'react';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const {
  FobResourcesPage,
  HomeResourcesPage,
  TravelGroupsPage,
} = pages;
const { Swiper } = shared;

const LogisticsView = () => {

  return (
    <Styles.Root>
      <Swiper>
        <HomeResourcesPage/>
        <FobResourcesPage/>
        <TravelGroupsPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default LogisticsView;
