import styled from 'styled-components';

export const Root = styled.div(() => ({
}));

export const UnitGroup = styled.div(({ selected }) => ({
  ...(selected && {
    color: 'red',
  }),
}));

export const Location = styled.div(() => ({
}));
