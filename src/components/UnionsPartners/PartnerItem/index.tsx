import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Linking } from 'react-native';

import syndicatePlaceholder from '../../../assets/logo/1x/symbol.png';

import {
  Container,
  Body,
  Footer,
  PartnerInfo,
  PartnerLogoContainer,
  PartnerLogo,
  PartnerInfoContainer,
  PartnerName,
  PartnerAddress,
  PartnerDescription,
  FooterButton,
  FooterButtonText
} from './styles';

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

interface IProps {
  partner: IPartner;
}

const PartnerItem: React.FC<IProps> = ({partner})=>{
  return (
    <Container
      style={{
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 0},
      }}>
      <Body>
        <PartnerInfo>
          <PartnerLogoContainer>
            <PartnerLogo
              source={partner.avatar ? {uri: partner.avatar} : syndicatePlaceholder}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </PartnerLogoContainer>
          <PartnerInfoContainer>
            <PartnerName>{partner.name}</PartnerName>
            <PartnerAddress>{`${partner.address}, ${partner.address2}`}</PartnerAddress>
            <PartnerAddress>{`${partner.city.nome}/${partner.city.uf} - CEP: ${partner.postal_code}`}</PartnerAddress>
          </PartnerInfoContainer>
        </PartnerInfo>
        <PartnerDescription>
          {partner.description || 'Nenhuma descrição foi informada.'}
        </PartnerDescription>
      </Body>
      <Footer>
        {!!partner.whatsapp && (
          <FooterButton
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?text=ola&phone=+55${partner.whatsapp}`,
              )
            }>
            <Icon name="whatsapp" color="#006633" size={24} />
            <FooterButtonText>Whatsapp</FooterButtonText>
          </FooterButton>
        )}
        {!!partner.phone && (
          <FooterButton
            onPress={() => Linking.openURL(`tel:+55${partner.phone}`)}>
            <Icon name="phone" color="#006633" size={24} />
            <FooterButtonText>Telefone</FooterButtonText>
          </FooterButton>
        )}
        {!!partner.email && (
          <FooterButton
            onPress={() => Linking.openURL(`mailto:${partner.email}`)}>
            <Icon name="email-outline" color="#006633" size={24} />
            <FooterButtonText>E-mail</FooterButtonText>
          </FooterButton>
        )}
      </Footer>
    </Container>
  );
};

export default PartnerItem;
