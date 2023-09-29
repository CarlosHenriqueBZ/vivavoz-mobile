import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
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
} from './styles';
import format from 'date-fns/format';
import {Text} from 'react-native-paper';

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
          <FlatList
            ListHeaderComponent={
              <FeatureContainer
                onPress={() =>
                  navigation.navigate('ShowNews', {id: posts[0]?.id})
                }>
                <>
                  {posts[0]?.featured_image !== null && (
                    <FeatureImage source={{uri: posts[0]?.featured_image}} />
                  )}
                  <FeatureTitle>{posts[0]?.title}</FeatureTitle>
                  <FeatureInfoContainer>
                    <FeatureInfo>
                      {posts[0]?.categories
                        .map(category => category.title)
                        .join(', ')}
                    </FeatureInfo>
                    <FeatureInfo>
                      {posts[0]
                        ? format(
                            new Date(posts[0]?.publishedAt),
                            "dd/MM/yyyy 'às' HH:mm",
                          )
                        : format(new Date(), "dd/MM/yyyy 'às' HH:mm")}
                    </FeatureInfo>
                  </FeatureInfoContainer>
                </>
              </FeatureContainer>
            }
            data={posts}
            keyExtractor={post => post.id}
            renderItem={({item, index}) => (
              <PostItemList post={item} index={index} />
            )}
          />
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
