import React from 'react';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const {
  CommandPage,
} = pages;
const { Swiper } = shared;

const GroundForcesView = () => (
    <Styles.Root>
      <Swiper>
        <CommandPage/>
        <div></div>
      </Swiper>
    </Styles.Root>
);

export default GroundForcesView;
