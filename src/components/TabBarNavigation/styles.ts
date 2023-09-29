import styled from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  isFocused: boolean;
}

export const Container = styled(SafeAreaView)`
  width: 100%;
  flex-direction: row;
  padding: 16px;
  border-top-width: 2px;
  border-top-color: #dedede;
  justify-content: space-between;
  background: #f7f7f7;
`;

export const Button = styled.TouchableOpacity<IProps>`
  padding: 8px;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.isFocused ? '#F38725' : '#EFEFEF')};
  border-radius: 8px;
  min-width: 72px;
`;

export const Icon = styled(FeatherIcons)<IProps>`
  margin-bottom: 4px;
  color: ${(props) => (props.isFocused ? '#ffffff' : '#006633')}; ;
`;

export const FaIcon = styled(FontAwesomeIcons)<IProps>`
  margin-bottom: 4px;
  color: ${(props) => (props.isFocused ? '#ffffff' : '#006633')}; ;
`;

export const ButtonText = styled.Text<IProps>`
  color: ${(props) => (props.isFocused ? '#ffffff' : '#006633')};
  font-family: ${(props) =>
    props.isFocused ? 'AvenirNextLTPro-Bold' : 'AvenirNextLTPro-Demi'};
`;
