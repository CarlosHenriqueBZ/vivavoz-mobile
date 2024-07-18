import React, {useState, useEffect} from 'react';

import {Container, Button, ListenText} from './styles';

import {View, Text, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Feather';


interface IProps {
  postId: string;
  postTitle: string;
  urlAudio: string;
}

export const ListenNews: React.FC<IProps> = ({urlAudio}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    sound?.setCategory('Playback');

    const audio = new Sound(urlAudio, sound?.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Erro ao carregar o áudio:', error);
        return;
      }
      setSound(audio);
    });

    return () => {
      if (sound) {
        sound?.stop();
        sound?.release();
      }
    };
  }, []);


  useEffect(() => {
    sound?.stop();
  } , [])
    

  const toggleSound = () => {
    if (sound) {
      if (isPlaying) {
        sound?.pause();
      } else {
        sound?.play((success) => {
          if (success) {
            console.log('Áudio reproduzido com sucesso');
          } else {
            console.log('Erro na reprodução do áudio');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Container>
      <View>
        {isPlaying ? (
          <Button onPress={toggleSound}>
            <Icon name="pause-circle" color="#006633" size={48} />
          </Button>
        ) : (
          <Button onPress={toggleSound}>
            <Icon name="play-circle" color="#006633" size={48} />
          </Button>
        )}
      </View>
      <ListenText>Ouvir essa notícia</ListenText>
    </Container>
  );
};

export default ListenNews;
