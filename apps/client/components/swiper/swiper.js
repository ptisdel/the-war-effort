import _ from 'lodash';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable'
import * as Styles from './swiper.styles';

const Swiper = (props) => {
  const { children } = props;
  const pageCount = children.length;
  const [currentPage, setCurrentPage] = useState(0);

  const handleSwipeRight = () => {
    if (currentPage <= 0) return;
    setCurrentPage(currentPage => (currentPage - 1));
  };

  const handleSwipeLeft = () => {
    if (currentPage >= pageCount) return;
    setCurrentPage(currentPage => (currentPage + 1));
  };

  const swipingHandlers = useSwipeable({ 
    onSwipedLeft: handleSwipeLeft, 
    onSwipedRight: handleSwipeRight, 
  });

  const renderPages = () => {
    console.log(children);
    return (
      <Styles.PagesContainer { ...swipingHandlers } xShift = { currentPage }>
        { _.map(children, (c, i) => <Styles.Page key = { i } >{ c }</Styles.Page>) }
      </Styles.PagesContainer>
    );
  };

  const renderPagination = () => 
    <Styles.Pagination>
      { _.times(pageCount, n => 
        <Styles.PaginationDot key = { n }  current = { n === currentPage } />) 
      }
    </Styles.Pagination>

  return (
    <Styles.Root>
      { renderPages() }
      { renderPagination() }
    </Styles.Root>
  );
};

export default Swiper;