import React, {useState} from 'react';
import {TextInputProps} from 'react-native';
import {Container, TextInput, Icon} from './styles';
import {TextInputMask} from 'react-native-masked-text';

interface InputProps  extends TextInputProps{
  name: string;
  icon: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({name, icon, secureTextEntry, ...rest}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordIcon, setHidePasswordIcon] = useState('eye')

  function showPassword(){
    if(hidePassword){
      setHidePasswordIcon('eye-off')
      setHidePassword(false);
      return;
    }

    setHidePasswordIcon('eye')
    setHidePassword(true);
  }

  return (
    <Container isErrored={false} isFocused={false}>
      <Icon name={icon} size={24} />
      {name === 'cpf' ? <TextInputMask type={'cpf'} {...rest} /> : (
        <>
          <TextInput secureTextEntry={hidePassword} {...rest} />
          <Icon style={{marginRight: 0}} name={hidePasswordIcon} size={24} onPress={() => showPassword()} />
        </>
      )}

    </Container>
  );
};

export default Input;
