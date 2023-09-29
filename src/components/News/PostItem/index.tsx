import React from 'react';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  PostContainer,
  PostImage,
  PostInfo,
  PostTitle,
  PostCategory
} from './styles';

interface ICategory {
  id: string;
  title: string;
}

interface IPost{
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

interface PostItemProps{
  post: IPost;
  index: number;
}

const PostItem: React.FC<PostItemProps> = ({post, index})=>{

  const navigation = useNavigation();

  return(
    <Container>
      {index > 0 && (
        <PostContainer onPress={() => navigation.navigate('ShowNews', {id: post.id})}>
          {post.featured_image !== null && (
            <>
            <PostImage source={{uri: post.featured_image}} />
            <PostInfo  hasFeaturedImage={true}>
              <PostTitle hasFeaturedImage={true}>{post.title}</PostTitle>
              <PostCategory>{post.categories.map((category)=>category.title).join(', ')}</PostCategory>
              <PostCategory>{format(new Date(post.publishedAt), "dd/MM/yyyy 'às' HH:mm")}</PostCategory>
            </PostInfo>
            </>
          )}
          {post.featured_image === null && (
            <PostInfo hasFeaturedImage={false}>
              <PostTitle hasFeaturedImage={false}>{post.title}</PostTitle>
              <PostCategory>{post.categories.map((category)=>category.title).join(', ')}</PostCategory>
              <PostCategory>{format(new Date(post.publishedAt), "dd/MM/yyyy 'às' HH:mm")}</PostCategory>
            </PostInfo>
          )}
        </PostContainer>
      )}
    </Container>

  )
}

export default PostItem;
