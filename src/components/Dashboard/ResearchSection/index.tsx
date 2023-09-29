import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../../services/api';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  IntroContainer,
  IntroText,
  Wrapper,
  ShortcutButton,
  ShortcutDetail,
  ShortcutDeatailIcon,
  ShortcutName,
  NoAvailableText
} from './styles';

interface IResearch {
  id: string;
  title: string;
  description: string;
  start_date: Date;
  finish_date: Date;
  status: string;
}

const ResearchSection: React.FC = ()=>{
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [researches, setReseaches] = useState<IResearch[]>();

  useEffect(()=>{
    const loadData = async () => {
      const availableResearches = await api.get<IResearch[]>('/research/mobile-list');
      setReseaches(availableResearches.data);
      setLoading(false);
    };

    if(loading){
      loadData();
    }

    return () => {
      setLoading(true);
      setReseaches([]);
    }
  }, []);

  return (
  <Container>
    <IntroContainer>
      <IntroText>Pesquisas</IntroText>
    </IntroContainer>

    <Wrapper>
      {loading && <Loading />}
      {(!loading && researches) && (
        researches.map((research)=>(
          <ShortcutButton key={research.id} onPress={() => navigation.navigate('Research', { id: research.id })}>
            <ShortcutDetail>
              <ShortcutDeatailIcon>
                <Icon name="message-circle" size={24} color="#F38725" />
              </ShortcutDeatailIcon>
              <ShortcutName>{research.title}</ShortcutName>
            </ShortcutDetail>
            <Icon name="chevron-right" size={24} color="#F38725" />
          </ShortcutButton>
        ))
      )}
      {(!loading && researches?.length === 0) && (<NoAvailableText>Nenhuma pesquisa disponível no momento.</NoAvailableText>)}
    </Wrapper>

  </Container>
  );
};

export default ResearchSection;
