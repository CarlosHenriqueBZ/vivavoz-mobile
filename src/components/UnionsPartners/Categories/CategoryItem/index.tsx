import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Container, IconContainer, ButtonText } from './styles';

interface ICategory {
  id: string;
  title: string;
  icon: string;
}

interface IProps{
  category: ICategory;
}

const CategoryItem: React.FC<IProps> = ({category})=>{
  const navigation = useNavigation();

  return (
    <Container
      onPress={()=>navigation.navigate('UnionsListPartners', {categoryId: category.id, categoryName: category.title})}
      style={{
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 0}
        }}
    >
      <IconContainer>
        <Icon name={category.icon || 'circle' } color="#ff6400" size={24} />
      </IconContainer>
      <ButtonText>{category.title}</ButtonText>
    </Container>

  );
}

export default CategoryItem;
