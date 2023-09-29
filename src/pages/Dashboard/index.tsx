import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import InnerPages from '../../components/InnerPages';
import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import ResearchSection from '../../components/Dashboard/ResearchSection';
import FinancialSection from '../../components/Dashboard/FinancialSection';

import {sync} from '../../services/sync';

import vivaVozIcon from '../../assets/logo/1x/vivaVozIcon.png';
import covidIcon from '../../assets/icone-covid.png';

import {database} from '../../data/database';

import {
  Container,
  Content,
  UserTitle,
  WelcomeUser,
  WelcomeUserGreeting,
  WelcomeUserName,
  UserLogoutContainer,
  UserLogoutText,
  IntroTextContainer,
  IntroTextContent,
  HomeShortcutsButtons,
  ShortcutButton,
  ShortcutDetail,
  ShortcutDeatailIcon,
  ShortcutName,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import {useSync} from '../../hooks/sync';

const Dashboard: React.FC = () => {
  const {signOut, worker, updateWorker} = useAuth();
  const {syncData} = useSync();
  const navigation = useNavigation();

  const [fillProfile, setFillProfile] = useState(false);

  const handleSignOut = useCallback(async () => {
    await analytics().logEvent('logOut');
    await signOut();
  }, []);

  const handleRefreshWorker = useCallback(async () => {
    const updatedWorker = await api.get(`/workers/${worker.id}`);
    updateWorker(updatedWorker.data);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleRefreshWorker();

      const checkWorkerFields = Object.values(worker).some(
        field => field === null || field === '' || field === undefined,
      );
      setFillProfile(checkWorkerFields);

      // database.write(()=>database.unsafeResetDatabase().then(()=>console.info('unsafe reset database')).catch((error)=>console.error(error)));

      syncData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <InnerPages name="Início">
      <Container>
        <Content>
          <UserTitle>
            <WelcomeUser>
              <WelcomeUserGreeting>Olá,</WelcomeUserGreeting>
              <WelcomeUserName>
                {worker.first_name + ' ' + worker.last_name}
              </WelcomeUserName>
            </WelcomeUser>
            <UserLogoutContainer onPress={() => handleSignOut()}>
              <UserLogoutText>Sair</UserLogoutText>
              <Icon name="log-out" size={24} color="#006633" />
            </UserLogoutContainer>
          </UserTitle>

          <IntroTextContainer>
            <IntroTextContent>
              Relate problemas no seu trabalho, acompanhe notícias, acesse
              convênios e sindicalize-se pelo Viva Voz.
            </IntroTextContent>
          </IntroTextContainer>

          <HomeShortcutsButtons>
            <ShortcutButton onPress={() => navigation.navigate('NewComplaint')}>
              <ShortcutDetail>
                <ShortcutDeatailIcon>
                  <Image
                    source={vivaVozIcon}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={{height: 32}}
                  />
                </ShortcutDeatailIcon>
                <ShortcutName>Relatar problemas em sigilo</ShortcutName>
              </ShortcutDetail>
              <Icon name="chevron-right" size={24} color="#F38725" />
            </ShortcutButton>

            <ShortcutButton
              onPress={() => navigation.navigate('ComplaintsList')}>
              <ShortcutDetail>
                <ShortcutDeatailIcon>
                  <Icon name="eye" size={24} color="#F38725" />
                </ShortcutDeatailIcon>
                <ShortcutName>Relatar problema</ShortcutName>
              </ShortcutDetail>
              <Icon name="chevron-right" size={24} color="#F38725" />
            </ShortcutButton>

            <ShortcutButton
              onPress={() => navigation.navigate('NewCovidComplaint')}>
              <ShortcutDetail>
                <ShortcutDeatailIcon>
                  <Image
                    source={covidIcon}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={{height: 32}}
                  />
                </ShortcutDeatailIcon>
                <ShortcutName>Nova denúncia Covid 19</ShortcutName>
              </ShortcutDetail>
              <Icon name="chevron-right" size={24} color="#F38725" />
            </ShortcutButton>
          </HomeShortcutsButtons>

          {fillProfile && (
            <IntroTextContainer>
              <IntroTextContent>
                Entre em Cadastro e preencha os dados para acessar todos os
                benefícios do aplicativo.
              </IntroTextContent>
            </IntroTextContainer>
          )}

          <FinancialSection />

          <ResearchSection />
        </Content>
      </Container>
    </InnerPages>
  );
};

export default Dashboard;
