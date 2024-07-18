import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const FeatureContainer = styled.TouchableOpacity`
  padding: 24px 16px;
  margin-bottom: 16px;
`;

export const TutorialTextContainer = styled(View)`
  position: absolute;
  top: 50px;
  left: 20px;
  width: 90%;
  z-index: 999;
`;

export const TutorialTitle = styled(Text)`
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-shadow-color: rgba(0, 0, 0, 1); /* Sombra preta sutil */
  text-shadow-offset: { width: 2, height: 2 }; /* Deslocamento da sombra */
  text-shadow-radius: 5px; /* Raio da sombra */
`;

export const TutorialDescription = styled(Text)`
  color: white;
  font-size: 22px;
  text-shadow-color: rgba(0, 0, 0, 1); /* Sombra preta sutil */
  text-shadow-offset: { width: 2, height: 2 }; /* Deslocamento da sombra */
  text-shadow-radius: 5px; /* Raio da sombra */
`;
export const TutorialImage = styled(Image)`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
export const TutorialButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;
export const TutorialImageBackground = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  `;
export const TutorialButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
`;

export const TutorialButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  text-align: center;
`;

export const FeatureImage = styled.Image`
  background: #cccccc;
  border-radius: 25px;
  width: 100%;
  height: 172px;
  margin-bottom: 16px;
`;

export const FeatureText = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  font-weight: bold;
  font-family: 'AvenirNextLTPro-Regular';
  color: white;
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
