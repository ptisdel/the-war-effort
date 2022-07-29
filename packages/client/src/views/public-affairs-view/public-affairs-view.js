import React from 'react';
import shared from '../../components';
import * as Styles from './styles';
import { CensorshipPage, PropagandaPage } from './pages';

const { Swiper } = shared;

const PublicAffairsView = () => (
    <Styles.Root>
      <Swiper>
        <PropagandaPage/>
        <CensorshipPage/>
      </Swiper>
    </Styles.Root>
);

export default PublicAffairsView;
