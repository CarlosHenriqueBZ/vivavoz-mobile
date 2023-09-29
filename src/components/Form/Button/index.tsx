import React from 'react';
import {Container, ButtonText} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

interface IButtonProps extends RectButtonProps{
  children: string;
}

const Button: React.FC<IButtonProps> = ({children, ...rest}) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
