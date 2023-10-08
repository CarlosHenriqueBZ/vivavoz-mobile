import styled from 'styled-components/native';

interface TextProps {
  status: 'danger' | 'success' | 'warning';
}

export const Container = styled.View`
  flex: 1;
  background: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const ContentContainer = styled.ScrollView`
  flex: 1;
  border: solid 2px white;
`;

export const Title = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 32px;
  color: #006633;
  margin-bottom: 8px;
`;

export const BoxTerms = styled.View`,
  flex: 1;
  background: #f2f2f2;
  min-height: 500px;
  
`;

export const PageContent = styled.View`
  flex: 1;
  padding: 24px 16px;
`;

export const SubscriptionsInfoContainer = styled.View`
  margin: 24px 0;
  padding: 0 16px;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding-bottom: 24px;
  flex-direction: row;
`

export const SubscriptionText = styled.Text`
  flex: 1;
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Demi';
  color: #006633;
`;

export const SubscriptionDate = styled.Text`
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Demi';
`;
