import styled from 'styled-components';

export const Root = styled.div(() => ({}));

export const Information = styled.div(() => ({
  alignItems: 'flex-start',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
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
  opacity: '0.5',
  padding: '20px',
  pointerEvents: 'none',
  ...(isOpen && {
    display: 'block',
  }),
}));

export const Map = styled.div(() => ({
  height: '100%',
  width: '100%',
  position: 'fixed',
}));

// export const Map = styled.div(() => ({
//   height: '100%',
// }));

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

export const Resources = styled.div(() => ({

}));

export const ResourcesTitle = styled.div(() => ({
  fontWeight: 'bold',
}));

export const ResourcesList = styled.div(() => ({

}));

export const Resource = styled.div(() => ({

}));

export const ResourceName = styled.div(() => ({

}));


export const Units = styled.div(() => ({

}));

export const UnitsTitle = styled.div(() => ({
  fontWeight: 'bold',
}));

export const UnitsList = styled.div(() => ({

}));

export const Unit = styled.div(() => ({

}));

export const UnitName = styled.div(() => ({

}));

export const Features = styled.div(() => ({

}));

export const FeaturesTitle = styled.div(() => ({
  fontWeight: 'bold',
}));

export const FeaturesList = styled.div(() => ({

}));

export const Feature = styled.div(() => ({

}));

export const FeatureName = styled.div(() => ({

}));
