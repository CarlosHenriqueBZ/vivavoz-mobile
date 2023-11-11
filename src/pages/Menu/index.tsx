import React, { useCallback, useState } from 'react';
import InnerPages from '../../components/InnerPages';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';

import RemoveProfile from './RemoveProfile';

import {useAuth} from '../../hooks/auth';

import {
  Container,
  Content,
  WorkerContainer,
  Worker,
  WorkerInitials,
  WorkerName,
  HomeShortcutsButtons,
  ShortcutButton,
  ShortcutDetail,
  ShortcutDeatailIcon,
  ShortcutName,
  AppInfoText,
  ContentContainer,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

const Menu: React.FC = () => {
  const { signOut, worker } = useAuth();
  const navigation = useNavigation();

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleSignOut = useCallback(async ()=>{
    await analytics().logEvent('logOut');
    await signOut();
  }, []);

  return (
    <InnerPages name="Menu">
      <ContentContainer>
        <Container>
          <Content>
            <WorkerContainer>
              <Worker>
                <WorkerInitials>
                  {worker.first_name.charAt(0)}
                  {String(worker.last_name.split(' ').slice(1)).charAt(0)}
                </WorkerInitials>
              </Worker>
              <WorkerName>
                {worker.first_name + ' ' + worker.last_name}
              </WorkerName>
            </WorkerContainer>

            <HomeShortcutsButtons>
              <ShortcutButton
                onPress={() => navigation.navigate('EditProfile')}>
                <ShortcutDetail>
                  <ShortcutDeatailIcon>
                    <Icon name="edit" size={24} color="#F38725" />
                  </ShortcutDeatailIcon>
                  <ShortcutName>Editar perfil</ShortcutName>
                </ShortcutDetail>
                <Icon name="chevron-right" size={24} color="#F38725" />
              </ShortcutButton>

              <ShortcutButton onPress={() => navigation.navigate('Sindicato')}>
                <ShortcutDetail>
                  <ShortcutDeatailIcon>
                    <Icon name="help-circle" size={24} color="#F38725" />
                  </ShortcutDeatailIcon>
                  <ShortcutName>Sobre o App</ShortcutName>
                </ShortcutDetail>
                <Icon name="chevron-right" size={24} color="#F38725" />
              </ShortcutButton>

              <ShortcutButton onPress={() => navigation.navigate('Terms')}>
                <ShortcutDetail>
                  <ShortcutDeatailIcon>
                    <Icon name="file-text" size={24} color="#F38725" />
                  </ShortcutDeatailIcon>
                  <ShortcutName>Termos de Uso</ShortcutName>
                </ShortcutDetail>
                <Icon name="chevron-right" size={24} color="#F38725" />
              </ShortcutButton>

              <ShortcutButton
                style={{marginTop: 32}}
                onPress={() => setShowRemoveModal(true)}>
                <ShortcutDetail>
                  <ShortcutDeatailIcon>
                    <Icon name="trash-2" size={24} color="#F38725" />
                  </ShortcutDeatailIcon>
                  <ShortcutName style={{color: 'red'}}>
                    Excluir conta
                  </ShortcutName>
                </ShortcutDetail>
                <Icon name="chevron-right" size={24} color="#F38725" />
              </ShortcutButton>

              <ShortcutButton onPress={() => handleSignOut()}>
                <ShortcutDetail>
                  <ShortcutDeatailIcon>
                    <Icon name="log-out" size={24} color="#F38725" />
                  </ShortcutDeatailIcon>
                  <ShortcutName style={{color: 'red'}}>Sair</ShortcutName>
                </ShortcutDetail>
                <Icon name="chevron-right" size={24} color="#F38725" />
              </ShortcutButton>

              <AppInfoText>Versão 1.8.0</AppInfoText>
            </HomeShortcutsButtons>

            <RemoveProfile
              handleVisible={setShowRemoveModal}
              visible={showRemoveModal}
            />
          </Content>
        </Container>
      </ContentContainer>
    </InnerPages>
  );
};

export default Menu;
