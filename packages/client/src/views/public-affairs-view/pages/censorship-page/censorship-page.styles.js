import styled from 'styled-components';

export const Root = styled.div(() => ({}));

export const LiveArticles = styled.div(() => ({}));

export const CensoredArticles = styled.div(() => ({}));

export const Article = styled.div(() => ({
  marginBottom: '10px',
}));

export const Header = styled.div(() => ({
  display: 'flex',
}));
export const Title = styled.div(() => ({
  marginRight: '10px',
}));
export const Views = styled.div(() => ({}));
export const Expanded = styled.div(({ isOpen }) => ({
  height: '0px',
  ...(isOpen && {
    height: '100px',
  }),
  overflow: 'hidden',
  transition: '0.2s all ease',
}));

export const Body = styled.div(() => ({}));
export const Author = styled.div(() => ({}));
export const Censor = styled.div(() => ({}));
