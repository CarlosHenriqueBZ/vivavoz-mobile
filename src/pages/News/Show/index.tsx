import React, {useEffect, useState} from 'react';
import InnerPages from '../../../components/InnerPages';
import {useRoute, RouteProp} from '@react-navigation/native';
import AppLoadingState from '../../../components/AppLoadingState';
import HTML from 'react-native-render-html';
import iframe from '@native-html/iframe-plugin';

import ListenNews from './ListenNews';

import api from '../../../services/api';

import {
  Container,
  PageContent,
  Title,
  MediaContainer,
  TextContent,
  ImageContent,
  Credits,
} from './styles';
import {Linking} from 'react-native';

type StackParamsList = {
  A: undefined;
  B: {
    id: string;
    name: string;
  };
};

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
  audio_file: string;
  publishedAt: Date;
  categories: ICategory[];
  author: {
    first_name: string;
    last_name: string;
  };
}

const ShowNews: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, 'B'>>();
  const {id} = route.params;

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<IPost>();

  const htmlConfig = {
    renderers: {
      iframe,
    },
    tagsStyles: {
      iframe: {
        alignSelf: 'center',
      },
    },
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get<IPost>(`/news/${id}`);

      setPost(response.data);
      setLoading(false);
    };

    if (loading) {
      loadData();
    }
  }, []);

  return (
    <InnerPages name="Notícias">
      {loading && <AppLoadingState />}
      {post && (
        <Container>
          <PageContent>
            {post.featured_image && (
              <MediaContainer>
                <ImageContent
                  source={{uri: post.featured_image}}
                  style={{width: '100%', height: 220}}
                  resizeMode="contain"
                />
                {/* <Credits>Foto 1: com homem na tela é de Dariusz Misztal</Credits> */}
              </MediaContainer>
            )}
            <Title>{post.title}</Title>

            {post.excerpt && (
              <ListenNews
                postId={post.id}
                postTitle={post.title}
                urlAudio={post.excerpt}
              />
            )}

            <HTML
              key={post.id}
              source={{html: post.content}}
              renderersProps={{
                iframe: {scalesPageToFit: true},
              }}
              onLinkPress={(event, href) => {
                Linking.openURL(href);
              }}
              {...htmlConfig}
              debug={false}
            />
          </PageContent>
        </Container>
      )}
    </InnerPages>
  );
};

export default ShowNews;
