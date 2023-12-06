import React, { useEffect, useState } from 'react';
import InnerPages from '../../../components/InnerPages';
import AppLoadingState from '../../../components/AppLoadingState';
import PartnerItem from '../../../components/UnionsPartners/PartnerItem';
import { useRoute, RouteProp } from '@react-navigation/native';

import { Text } from 'react-native';

import api from '../../../services/api';

import {
  ComboMessage,
  Container,
  PageContent,
  PartnerCategory,
  PartnersBlank,
  PartnersList,
  Title,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';

type StackParamsList = {
  A: undefined;
  B: {
    categoryId: string;
    categoryName: string;
  };
}

interface IPartner{
    id: string;
    name: string;
    address: string;
    address2: string;
    postal_code: string;
    city_id: string;
    state: string;
    whatsapp: string;
    phone: string;
    email: string;
    avatar: string;
    description: string;
    category_id: string;
    syndicate_id: string;
    city: {
      id: number;
      nome: string;
      uf: string;
    };
    syndicate: {
      id: string;
      nome_fantasia: string;
    }
    category: {
      id: string;
      title: string;
    }
}

const ListPartners: React.FC = ()=>{
  const route = useRoute<RouteProp<StackParamsList, 'B'>>();

  const { categoryId, categoryName } = route.params;

  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<IPartner[]>([]);

  useEffect(()=>{
    const loadData = async ()=>{
      const loadedPartners = await api.get<IPartner[]>(`/unions-partners/category/${categoryId}`);
      setPartners(loadedPartners.data);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <InnerPages name="Convênios">
      {loading && <AppLoadingState />}
      {!loading && partners.length ? (
        <Container>
          <PartnersList
            ListHeaderComponent={() => (
              <PageContent>
                <PartnerCategory>Convênios: {categoryName}</PartnerCategory>
              </PageContent>
            )}
            data={partners}
            keyExtractor={(partner: any) => partner.id}
            renderItem={({item}: any) => <PartnerItem partner={item} />}
          />
        </Container>
      ) : (
        <Container>
          <PartnersBlank>
            <ComboMessage>
              <Icon
                name="info"
                size={35}
                color="#006633"
                style={{marginTop: 10}}
              />
              <Title>Nenhum Convênio de {categoryName} Cadastrado</Title>
            </ComboMessage>
          </PartnersBlank>
        </Container>
      )}
    </InnerPages>
  );
}

export default ListPartners;
