import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const PageContent = styled.View`
  flex: 1;
  padding: 24px 16px;
`;

export const PartnerCategory = styled.Text`
  margin-bottom: 16px;
  font-weight: bold;
  color: #cccccc;
`;

export const PartnersList = styled.FlatList`
  flex: 1;
  display: flex;
  padding: 0 16px;
`;
