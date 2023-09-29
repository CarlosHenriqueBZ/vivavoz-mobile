import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ILeftHeaderProps {
  routeName: string;
}

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background: #006633;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px 0;
  justify-content: space-between;
`;

export const LeftHeader = styled.View<ILeftHeaderProps>`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.routeName === 'Dashboard' ? '0 16px' : '0px'};
`;

export const RightHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  color: #ffffff;
  font-size: 20px;
`;
