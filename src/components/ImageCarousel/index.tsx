import React, {useCallback, useEffect, useState} from 'react';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Wrapper,

} from './styles';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const ImageCarousel: React.FC = () => {
  const navigation = useNavigation();

  const images = [
    {
      id: 1,
      img: require('./logo/logo-horizontal.png'),
    },
    {
      id: 2,
      img: require('./logo/logo-horizontal.png'),
    },
    {
      id: 3,
      img: require('./logo/logo-horizontal.png'),
    },
  ];

  const WIDTH = Dimensions.get('window').width
  const HEIGHT = Dimensions.get('window').height;

 const [imgActive, setimgActive] = useState(null)

 const onChange = (nativeEvent: any) => {
    if(nativeEvent){
        const slide = Math.ceil(nativeEvent.containerOffset.x / nativeEvent.layoutMesurement.width)
        if(slide !== imgActive){
            setimgActive(slide as any)
        }
    }
  };


 const styles = StyleSheet.create({
   wrap: {
     width: WIDTH,
     height: HEIGHT * 0.25,
     borderRadius: 50,
   },
   wrapDot: {
     position: 'absolute',
     bottom: 0,
     flexDirection: 'row',
     alignSelf: 'center',
   },
   dotActive: {
     margin: 3,
     color: 'black',
   },
   dot: {
     margin: 3,
     color: 'red',
   },
 });

  
  return (
    <View style={styles.wrap}>
      <ScrollView
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.wrap}>
        {images.map((e, index) => (
          <Animated.Image
            key={index}
            source={{uri: e.img}}
          />
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {images.map((e, index) => (
          <Text
            key={index}
            style={imgActive === index ? styles.dotActive : styles.dot}>
            {'\u2B24'}
          </Text>
        ))}
      </View>
    </View>
  );
};



export default ImageCarousel;
