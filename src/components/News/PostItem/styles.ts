import styled from 'styled-components/native';

interface IPostTitleProps {
  hasFeaturedImage: boolean;
}

export const Container = styled.View``;

export const PostContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 24px;
  background: #ffff;
  gap: 8px;
  border: solid 2px #f2f2f2;
  padding: 16px;
  border-radius: 10px;
`;

export const PostImage = styled.Image`
  background: #cccccc;
  height: 96px;
  width: 96px;
  border-radius: 10px;
`;

export const PostInfo = styled.View<IPostTitleProps>`
  margin-left: ${props => (props.hasFeaturedImage ? '16px' : '0')};
  flex-direction: column;
  justify-content: space-between;
`;

export const PostTitle = styled.Text<IPostTitleProps>`
  font-family: 'AvenirNextLTPro-Demi';
  color: #006633;
  font-size: 18px;
  line-height: 22px;
  max-width: ${props => (props.hasFeaturedImage ? '200px' : '100%')};
  margin-bottom: ${props => (props.hasFeaturedImage ? '0' : '8px')};
`;

export const PostCategoryChip = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  border: solid 1px #96faa8;
  text-align: center;
  width: 100%;
  border-radius: 25px;
  background: #d1ffda;
  color: black;
`;

export const PostCategory = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #666666;
`;
