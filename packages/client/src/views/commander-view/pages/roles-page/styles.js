import styled from 'styled-components';

export const Root = styled.div(() => ({
}));

export const Title = styled.div(() => ({
}));

export const Role = styled.div(() => ({
  backgroundColor: 'lightgray',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  padding: '5px',
}));

export const RoleInfo = styled.div(() => ({
  display: 'flex',
}));

export const RoleTitle = styled.div(() => ({
  marginRight: '10px',
}));

export const RolePlayer = styled.div(({ unoccupied }) => ({
  ...(unoccupied && {
    color: 'gray',
  }),
}));

export const RoleButtons = styled.div(() => ({
}));


export const RoleButton = styled.button(({ unoccupied }) => ({
  ...(unoccupied && {
    display: 'none',
  }),
}));
