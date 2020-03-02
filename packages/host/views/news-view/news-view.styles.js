import styled from 'styled-components';

export const Root = styled.div(() => ({
  background: 'gray',
  bottom: 0,
  left: 0,
  padding: '30px',
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%',
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
