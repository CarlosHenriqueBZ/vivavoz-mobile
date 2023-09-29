import React, {useCallback, useEffect, useState} from 'react';

import {useAuth} from '../../hooks/auth';

import syndicatePlaceholder from '../../assets/logo/1x/symbol.png';

import InnerPages from '../../components/InnerPages';
import AppLoadingState from '../../components/AppLoadingState';
import CategoryItem from '../../components/UnionsPartners/Categories/CategoryItem';

import api from '../../services/api';

import {
  Container,
  PageContent,
  SyndicateContainer,
  SyndicateLogo,
  SyndicateName,
  PartnersContainer,
  PartnersTitle,
  PartnersList,
} from './styles';

interface ICategory {
  id: string;
  title: string;
  icon: string;
}


const UnionsPartners: React.FC = ()=>{
  const { worker } = useAuth();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const createRows = useCallback((data: ICategory[], columns: number) => {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;

    while(lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        title: `empty-${lastRowElements}`,
        icon: `empty-${lastRowElements}`,
      });
      lastRowElements =+ 1;
    };

    return data;
  }, []);

  useEffect(()=>{

    const loadData = async ()=>{
      const loadedCategories = await api.get<ICategory[]>('/unions-partners/categories');
      setCategories(loadedCategories.data);

      setLoading(false);
    };

    loadData();
  }, [])

  return (
    <InnerPages name="Convênios">
      {loading && <AppLoadingState />}
      {!loading && (
      <Container>
        <PartnersContainer>
          <PartnersList
            ListHeaderComponent={()=>(
              <PageContent>
                <SyndicateContainer style={{shadowColor: '#000000', shadowOpacity: 0.15, shadowRadius: 4, shadowOffset: {width: 0, height: 0}}}>
                  <SyndicateLogo
                    source={worker.syndicate.avatar ? {uri: worker.syndicate.avatar} : syndicatePlaceholder}
                    resizeMethod="resize"
                    resizeMode="cover"
                  />
                  <SyndicateName>{worker.syndicate.nome_fantasia}</SyndicateName>
                </SyndicateContainer>
                <PartnersTitle>Selecione a categoria de convênio</PartnersTitle>
              </PageContent>
            )}
            data={categories}
            keyExtractor={(item: any)=> item.id}
            renderItem={({item}: {item: any}) => <CategoryItem category={item}/>}
            numColumns={2}
          />
        </PartnersContainer>
      </Container>
      )}
    </InnerPages>
  );
}

export default UnionsPartners;
