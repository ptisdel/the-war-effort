import styled, { css, keyframes } from 'styled-components';
import common from '@the-war-effort/common';

const { models } = common;
const { Theme } = models;

const animationSpeed = '0.15s';

const stretchOnHorizontalMovement = keyframes`
  0% {
    transform: scaleX(1);
    filter: blur(0px);
  }

  50% {
    transform: scaleX(2);
    filter: blur(0.75px);
  }

  100% {
    transform: scaleX(1);
    filter: blur(0px);
  }
`;

const transition = `${animationSpeed} ease-out`;

export const Root = styled.div(() => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
}));

export const PagesContainer = styled.div(({ xShift }) => ({
  display: 'flex',
  height: '100%',
  position: 'absolute',
  transform: `translateX(${xShift * -100}vw)`,
  transition,
}));

export const Page = styled.div(() => ({
  height: '100vh',
  width: '100vw',
}));

export const Pagination = styled.div(() => ({
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
}));

export const PaginationDotCurrent = styled.div(({ shouldAnimate, theme, xShift }) => css`
  animation: ${shouldAnimate ? stretchOnHorizontalMovement : null} ${animationSpeed} ease;
  background: ${Theme.getColor(theme, 'action')};
  border-radius: 100%;
  height: 12px;
  margin: 5px 10px 5px 10px;
  pointer-events: none;
  position: absolute;
  transition: ${transition};
  left: ${xShift * 32}px;
  width: 12px;
`);

export const PaginationDot = styled.div(({ theme }) => ({
  border: `2px solid ${Theme.getColor(theme, 'action')}`,
  borderRadius: '100%',
  cursor: 'pointer',
  display: 'inline-block',
  height: '12px',
  margin: '5px 10px 5px 10px',
  width: '12px',
}));
