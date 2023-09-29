import React, {useState, useCallback, useEffect} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {Container, Button, ListenText} from './styles';
import api from '../../../../services/api';

interface IProps {
  postId: string;
  postTitle: string;
}

export const ListenNews: React.FC<IProps> = ({postId, postTitle}) => {
  const [playing, setPlaying] = useState(false);

  TrackPlayer.getState().then(state => console.log('ESTADO', state));
  console.log('PLAYING STATE', playing);

  const handleListen = useCallback(async (value: boolean) => {
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
    });

    console.log('HANDLE LISTEN VALUE', value);

    if (value) {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected !== true) {
        Alert.alert(
          'É necessário estar conectado à internet para usar este recurso.',
        );
        return;
      }

      Alert.alert('A notícia está sendo carregada. Espere um momento.');

      setPlaying(value);

      try {
        const trackURI = await api.post(`/news/listen/${postId}`);

        await TrackPlayer.add({
          id: `vivavoz-${postId}`,
          url: trackURI.data,
          title: postTitle,
          artist: 'Viva Voz',
        });

        await TrackPlayer.play();
      } catch (error) {
        console.error(error);
      }
    } else {
      setPlaying(false);
      await TrackPlayer.reset();
    }
  }, []);

  const setupPlayer = useCallback(
    async () => await TrackPlayer.setupPlayer({waitForBuffer: true}),
    [],
  );
  const clearEffect = useCallback(async () => await TrackPlayer.reset(), []);

  useEffect(() => {
    setupPlayer();
    return () => {
      clearEffect();
    };
  }, []);

  return (
    <Container>
      {playing && (
        <Button onPress={() => handleListen(false)}>
          <Icon name="pause-circle" color="#006633" size={48} />
        </Button>
      )}
      {!playing && (
        <Button onPress={() => handleListen(true)}>
          <Icon name="play-circle" color="#006633" size={48} />
        </Button>
      )}
      <ListenText>Ouvir essa notícia</ListenText>
    </Container>
  );
};

export default ListenNews;
