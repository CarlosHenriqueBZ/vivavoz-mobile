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

export const SyndicateContainer = styled.View`
  background: white;
  elevation: 5;
  padding: 24px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;

export const SyndicateLogo = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 50px;
  background: white;
`;

export const SyndicateName = styled.Text`
  color: #006633;
  font-size: 16px;
  line-height: 20px;
  font-family: 'AvenirNextLTPro-Demi';
  margin-left: 16px;
  max-width: 70%;
`;

export const PartnersContainer = styled.View``;

export const PartnersTitle = styled.Text`
  font-size: 12px;
  margin-top: 16px;
  font-weight: bold;
  color: #cccccc;
`;

export const PartnersList = styled.FlatList`
  display: flex;
  flex: 1 auto;
`;
