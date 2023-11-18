import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const FeatureContainer = styled.TouchableOpacity`
  border-top-color: #cccccc;
  border-bottom-width: 1px;
  padding: 24px 16px;
  margin-bottom: 16px;
`;

export const FeatureImage = styled.Image`
  background: #cccccc;
  border-radius: 25px;
  width: 100%;
  height: 172px;
  margin-bottom: 16px;
`;

export const FeatureTitle = styled.Text`
  margin-bottom: 16px;
  font-family: 'AvenirNextLTPro-Demi';
  color: #006633;
  font-size: 20px;
  line-height: 24px;
`;

export const FeatureInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const FeatureInfo = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #666666;
  font-weight: bold;
`;

export const NoPosts = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #666666;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-top: 50px;
`;
