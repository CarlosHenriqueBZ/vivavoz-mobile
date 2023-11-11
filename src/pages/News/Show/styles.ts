import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background: #ffffff;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

export const PageContent = styled.View`
  padding: 16px 24px;
  flex: 1;
`;

export const Title = styled.Text`
  color: #006633;
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 32px;
  line-height: 32px;
  margin-bottom: 16px;
`

export const TextContent = styled.Text`
  margin-top: 8px;
  font-size: 16px;
`;

export const MediaContainer = styled.View`
  margin-bottom: 24px;
`;

export const ImageContent = styled.Image`
  flex: 1;
`;

export const Credits = styled.Text`
  font-style: italic;
  font-size: 12px;
`;

export const IntroTextContent = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
   text-align: left;
`;

export const IntroTextContainer = styled.View`
  margin: 0 16px;
  background: #f38725;
  padding: 24px;
  border-radius: 16px;
`;
