import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import InnerPages from '../../components/InnerPages';
import {useNavigation} from '@react-navigation/native';

import PostItemList from '../../components/News/PostItem';
import AppLoadingState from '../../components/AppLoadingState';

import api from '../../services/api';

import {
  Container,
  FeatureContainer,
  FeatureImage,
  FeatureTitle,
  FeatureInfoContainer,
  FeatureInfo,
  NoPosts,
  FeatureText,
  TutorialImage,
  TutorialButton,
  TutorialButtonText,
  TutorialButtonContainer,
  TutorialDescription,
  TutorialTextContainer,
  TutorialTitle,
} from './styles';
import format from 'date-fns/format';
import {Text} from 'react-native-paper';
import {useAuth} from '../../hooks/auth';
import {NextStep, NextStepText} from '../Research/styles';
import {IntroTextContainer, IntroTextContent} from './Show/styles';

interface ICategory {
  id: string;
  title: string;
}

interface IPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  status: string;
  type: string;
  author_id: string;
  featured_image: string;
  publishedAt: Date;
  categories: ICategory[];
  author: {
    first_name: string;
    last_name: string;
  };
}

const News: React.FC = () => {
  const navigation = useNavigation();
  const {worker, updateWorker} = useAuth();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get('/news');

      setPosts(response.data);
      setLoading(false);
    };

    if (loading) {
      loadData();
    }
  }, []);

  return (
    <InnerPages name="Notícias">
      {loading && <AppLoadingState />}
      {posts?.length ? (
        <Container>
          {worker.is_syndicate_approved === null ? (
            <Container>
              <TutorialTextContainer>
                <TutorialTitle>Fique por dentro</TutorialTitle>
                <TutorialDescription numberOfLines={7}>
                  todas as novidades, atualizações e informações na palma da
                  mão. Solicitar sindicalização agora para receber as melhores
                  notícias diretamente em seu dispositivo.
                </TutorialDescription>
              </TutorialTextContainer>
              <TutorialImage
                source={require('./cover.png')}
                resizeMode="cover"
              />
              <TutorialButtonContainer>
                <TutorialButton onPress={() => console.log('click')}>
                  <NextStep onPress={() => navigation.navigate('Sindicato')}>
                    <NextStepText>Solicitar sindicalização</NextStepText>
                  </NextStep>
                </TutorialButton>
              </TutorialButtonContainer>
            </Container>
          ) : (
            <FeatureContainer>
              <FlatList
                data={posts}
                keyExtractor={post => post.id}
                renderItem={({item, index}) => (
                  <PostItemList post={item} index={index} />
                )}
              />
            </FeatureContainer>
          )}
        </Container>
      ) : (
        <Container>
          <NoPosts>Nenhum post encontrado</NoPosts>
        </Container>
      )}
    </InnerPages>
  );
};

export default News;
