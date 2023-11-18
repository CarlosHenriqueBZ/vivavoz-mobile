import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {format} from 'date-fns';
import {Image} from 'react-native';
import api from '../../../services/api';

import syndicatePlaceholder from '../../../assets/logo/1x/symbol.png';
import vivaVozIcon from '../../../assets/logo/1x/vivaVozIcon.png';

import {
  PageContent,
  SyndicateContainer,
  SyndicateLogo,
  SyndicateName,
  AssociateContainer,
  AssociateId,
  AssociateInfoBody,
  AssociateInfoFooter,
  AssociateInfoContainer,
  AssociateInfoLabel,
  AssociateInfo,
  HomeShortcutsButtons,
  ShortcutButton,
  ShortcutDetail,
  ShortcutDeatailIcon,
  ShortcutName,
  CardContent,
  LogoCard,
  SyndicateLogoCard,
} from './styles';

interface IProps {
  worker: any;
}

const IsSyndicateApprovedTrue: React.FC<IProps> = ({worker}) => {
  const navigation = useNavigation();
  const [union, setUnion] = useState<any>();

  const loadUnion = useCallback(async () => {
    try {
      const response = await api.get(`/unions/${worker.syndicate_id}`);
      setUnion(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [worker]);

  useEffect(() => {
    loadUnion();

    return () => {
      setUnion(null);
    };
  }, []);

  return (
    <>
      {worker && union && (
        <>
          <PageContent>
            <SyndicateContainer
              style={{
                shadowColor: '#000000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: {width: 0, height: 0},
              }}>
              <SyndicateLogo
                source={
                  union.avatar ? {uri: union.avatar} : syndicatePlaceholder
                }
                resizeMethod="resize"
                resizeMode="cover"
              />
              <SyndicateName>{worker.syndicate.nome_fantasia}</SyndicateName>
            </SyndicateContainer>
          </PageContent>
          <CardContent
            style={{
              shadowColor: '#000000',
              shadowOpacity: 0.15,
              shadowRadius: 4,
              shadowOffset: {width: 0, height: 0},
            }}>
            <AssociateContainer
              >
              <LogoCard>
                <SyndicateLogoCard
                  source={
                    union.avatar ? {uri: union.avatar} : syndicatePlaceholder
                  }
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </LogoCard>

              <AssociateId>{worker.syndicate.nome_fantasia}</AssociateId>

              <AssociateInfoBody>
                <AssociateInfoContainer>
                  <AssociateId>{worker.cpf}</AssociateId>
                  <AssociateInfo>
                    {worker.first_name + ' ' + worker.last_name}
                  </AssociateInfo>
                </AssociateInfoContainer>
              </AssociateInfoBody>

              <AssociateInfoFooter>
                <AssociateInfoContainer>
                  <AssociateInfoLabel>Associado desde</AssociateInfoLabel>
                  <AssociateInfo>
                    {format(
                      new Date(worker.syndicate_approved_at),
                      'dd/MM/yyyy',
                    )}
                  </AssociateInfo>
                </AssociateInfoContainer>
              </AssociateInfoFooter>
            </AssociateContainer>
          </CardContent>

          <HomeShortcutsButtons>
            <ShortcutButton
              onPress={() => navigation.navigate('UnionsPartners')}
              style={{
                shadowColor: '#000000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: {width: 0, height: 0},
              }}>
              <ShortcutDetail>
                <ShortcutDeatailIcon>
                  <Image
                    source={vivaVozIcon}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={{height: 32}}
                  />
                </ShortcutDeatailIcon>
                <ShortcutName>Convênios</ShortcutName>
              </ShortcutDetail>
              <Icon name="chevron-right" size={24} color="#F38725" />
            </ShortcutButton>

            <ShortcutButton
              onPress={() => navigation.navigate('NewComplaint')}
              style={{
                shadowColor: '#000000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: {width: 0, height: 0},
              }}>
              <ShortcutDetail>
                <ShortcutDeatailIcon>
                  <Image
                    source={vivaVozIcon}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={{height: 32}}
                  />
                </ShortcutDeatailIcon>
                <ShortcutName>Novo relato de problemas</ShortcutName>
              </ShortcutDetail>
              <Icon name="chevron-right" size={24} color="#F38725" />
            </ShortcutButton>

            <ShortcutButton
              onPress={() => navigation.navigate('ComplaintsList')}
              style={{
                shadowColor: '#000000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: {width: 0, height: 0},
              }}>
              <ShortcutDetail>
                <ShortcutDeatailIcon>
                  <Icon name="eye" size={24} color="#F38725" />
                </ShortcutDeatailIcon>
                <ShortcutName>Relatar problemas</ShortcutName>
              </ShortcutDetail>
              <Icon name="chevron-right" size={24} color="#F38725" />
            </ShortcutButton>
          </HomeShortcutsButtons>
        </>
      )}
    </>
  );
};

export default IsSyndicateApprovedTrue;
