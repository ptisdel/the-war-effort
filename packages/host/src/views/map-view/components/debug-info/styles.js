import styled from 'styled-components';

export const Information = styled.div(() => ({
  alignItems: 'flex-start',
  pointerEvents: 'none',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
}));

export const InformationHeader = styled.div(() => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 2px rgba(0,0,0,0.4)',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '5px',
  flexGrow: 0,
}));

export const InformationContent = styled.div(({ isOpen }) => ({
  backgroundColor: 'white',
  display: 'none',
  flexGrow: '1',
  // opacity: '0.5',
  padding: '20px',
  pointerEvents: 'none',
  ...(isOpen && {
    display: 'block',
  }),
}));

export const PlayerList = styled.div(() => ({
  marginBottom: '30px',
}));

export const Locations = styled.div(() => ({
  display: 'grid',
  columnGap: '20px',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'auto',
  rowGap: '60px',
}));

export const LocationName = styled.div(() => ({
  fontWeight: 'bold',
}));

export const ResourcesTitle = styled.div(() => ({
  fontWeight: 'bold',
}));

export const UnitsTitle = styled.div(() => ({
  fontWeight: 'bold',
}));

export const FeaturesTitle = styled.div(() => ({
  fontWeight: 'bold',
}));
