import styled from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface IActiveProps {
  active: boolean;
}

export const Container = styled.TouchableOpacity<IActiveProps>`
  margin: 0 24px;
  background: ${props => props.active ? '#ff6600' : 'transparent'};
  padding: 8px;
  border-radius: 8px;
`;

export const Icon = styled(FeatherIcons)`
  color: #ffffff;
`;

export const Badge = styled.View`
  background: #ff0000;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  right: 0;
`

export const BadgeText = styled.Text`
  color: #ffffff;
  font-size: 12px;
`
