import styled from 'styled-components';

export const Root = styled.div(() => ({}));

export const Information = styled.div(() => ({
  backgroundColor: 'white',
  position: 'absolute',
}));

export const InformationHeader = styled.div(() => ({
  cursor: 'pointer',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '5px',
}));

export const InformationContent = styled.div(({ isOpen }) => ({
  display: 'none',
  padding: '20px',
  ...(isOpen && {
    display: 'initial',
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
