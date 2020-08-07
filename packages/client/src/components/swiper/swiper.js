import _ from 'lodash-es';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as Styles from './styles';

const Swiper = (props) => {
  const children = React.Children.toArray(_.get(props, 'children'));
  const pageCount = _.get(children, 'length') || 0;
  const [currentPage, setCurrentPage] = useState(0);

  const didMountRef = useRef(false);
  const [shouldAnimatePagination, setShouldAnimatePagination] = useState(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
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

  const renderPagination = () => {
    if (pageCount < 2) return null;

    return (
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
  };

  return (
    <Styles.Root>
      { renderPages() }
      { renderPagination() }
    </Styles.Root>
  );
};

Swiper.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default Swiper;
