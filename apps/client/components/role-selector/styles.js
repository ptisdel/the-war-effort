import styled from 'styled-components';

export const Root = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
}));


export const Button = styled.button(({ theme }) => ({
  marginBottom: '20px',
  padding: '10px',
}));