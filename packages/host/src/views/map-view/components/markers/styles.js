import styled from 'styled-components';

export const Marker = styled.div(({ lat, lng }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  pointerEvents: 'none',
  position: 'absolute',
  transform: 'translateX(-10px) translateY(-10px)',
  left: `${lat}%`,
  top: `${lng}%`,
}));

export const Icon = styled.div(() => ({
  alignItems: 'center',
  background: 'white',
  border: '1px solid black',
  color: 'black',
  display: 'flex',
  fontSize: '16px',
  fontWeight: 'bolder',
  justifyContent: 'center',
  flex: '0 0 auto',
  pointerEvents: 'none',
  height: '20px',
  width: '20px',
}));

export const Label = styled.div(() => ({
  marginLeft: '5px',
}));
