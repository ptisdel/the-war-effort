import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as Styles from './swiper.styles';

const Swiper = (props) => {
  const { children } = props;
  const pageCount = children.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldAnimatePagination, setShouldAnimatePagination] = useState(false);

  useEffect(() => {
    setShouldAnimatePagination(true);
  }, [currentPage]);

  const resetAnimation = () => {
    setShouldAnimatePagination(false);
  };

  const handleSwipeRight = () => {
    if (currentPage <= 0) return;
    setCurrentPage(cp => (cp - 1));
  };

  const handleSwipeLeft = () => {
    if (currentPage >= pageCount - 1) return;
    setCurrentPage(cp => (cp + 1));
  };

  const handlePaginationDotClick = pageIndex => {
    setCurrentPage(pageIndex);
  };

  const swipingHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  const renderPages = () => (
    <Styles.PagesContainer { ...swipingHandlers } xShift = { currentPage }>
      { _.map(children, (c, i) => <Styles.Page key = { i } >{ c }</Styles.Page>) }
    </Styles.PagesContainer>
  );

  const renderPagination = () => (
    <Styles.Pagination>
      <Styles.PaginationDotCurrent
        onAnimationEnd={ resetAnimation }
        shouldAnimate = { shouldAnimatePagination }
        xShift = { currentPage} />
      { _.times(pageCount, n => <Styles.PaginationDot
        current = { n === currentPage }
        key = { n }
        onClick = { () => handlePaginationDotClick(n) }
      />) }
    </Styles.Pagination>
  );

  return (
    <Styles.Root>
      { renderPages() }
      { renderPagination() }
    </Styles.Root>
  );
};

Swiper.propTypes = ({
  children: PropTypes.node,
});

export default Swiper;
