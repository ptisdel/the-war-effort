import React from 'react';
import * as Styles from './styles';
import pages from './pages';
import shared from '../../components';

const { Swiper } = shared;

const { AnalyticsPage } = pages;

const IntelligenceView = () => (
    <Styles.Root>
      <Swiper>
        <AnalyticsPage/>
      </Swiper>
    </Styles.Root>
);

export default IntelligenceView;
