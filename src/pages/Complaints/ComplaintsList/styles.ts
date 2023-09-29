import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #006633;
`;

export const ListContainer = styled.View`
  background-color: #ececec;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex: 1;

  align-items: center;
`;

export const ComplaintContainer = styled.FlatList`
  width: 100%;
  margin-top: 2px;
  padding: 0 16px;
`;
