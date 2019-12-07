import styled from 'styled-components';

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
  transition: '0.3s ease',
}));

export const Page = styled.div(() => ({
  height: '100vh',
  width: '100vw',
}));

export const Pagination = styled.div(() => ({
  position: 'fixed',
  bottom: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
}));

export const PaginationDot = styled.div(({ current }) => ({
  background: current ? 'black' : 'grey',
  borderRadius: '100%',
  display: 'inline-block',
  height: '12px',
  ':not(:last-child)': {
    marginRight: '15px',
  },
  transition: '0.3s ease',
  width: '12px',
}));
