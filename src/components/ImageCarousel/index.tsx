import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';


const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://cdn.pixabay.com/photo/2016/03/06/17/39/banner-1240822_1280.jpg',
    'https://media.istockphoto.com/id/587185052/pt/vetorial/cosmic-vector-background-with-blue-glowing-vortex.jpg?s=2048x2048&w=is&k=20&c=A4UfijaSud9l2gUrjd6ygd0Xl3ppFuKWgBE_X3QbvVk=',
    'https://media.istockphoto.com/id/1159228611/pt/vetorial/vector-realistic-isolated-black-hole-in-space-background-for-template-decoration-and.jpg?s=2048x2048&w=is&k=20&c=W-iC2gE5-vIIFmc9GOXfEzH_cRp3XplhDY4vxqpMahA=',
  ];

  const handleIndexChanged = index=> {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={12}
        onIndexChanged={handleIndexChanged}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{uri: image}} style={styles.image} />
          </View>
        ))}
      </Swiper>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 160,
    marginVertical: 5,
  },
  wrapper: {},
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  image: {
    width: '90%',
    height: 130,
    borderRadius: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationText: {
    color: 'black',
    margin: 3,
    fontSize: 18,
  },
  paginationTextActive: {
    color: 'red',
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: 'black',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default ImageCarousel;
