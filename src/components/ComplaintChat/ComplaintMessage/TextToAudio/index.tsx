import React, {useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../../../services/api';
import TrackPlayer from 'react-native-track-player';
import RNFS from  'react-native-fs';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

import {Container} from './styles';

interface IProps{
  messageId: string;
}

const TextToAudio: React.FC<IProps> = ({messageId})=>{

    const listenMessage = useCallback(async ()=>{

      const netInfo = await NetInfo.fetch();

      if(netInfo.isConnected !== true){
        Alert.alert('É necessário estar conectado a internet para usar este recurso.');
        return;
      }

      const response = await api.post(`/messages/listen-message/${messageId}`);

      const audioFolder = `${RNFS.DocumentDirectoryPath}/messages-audios`;
      const fileName = `${audioFolder}/${messageId}.wav`;

      const checkIfFolderExists = await RNFS.exists(audioFolder);

      if(!checkIfFolderExists){
        await RNFS.mkdir(audioFolder);
      }

      const checkIfFileExists = await RNFS.exists(fileName);

      if(!checkIfFileExists){
        RNFS.downloadFile({
          fromUrl: response.data,
          toFile: fileName
        });
      }

      try{
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id: messageId,
          url: fileName, //fileName
          title: 'Viva Voz',
          artist: 'Viva Voz',
        })
        await TrackPlayer.play();
      }catch(error){
        console.error(error);
      }
  }, []);

  const setupPlayer = useCallback(async () => await TrackPlayer.setupPlayer(), []);

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <Container onPress={() => listenMessage()}>
      <Icon name="volume-2" size={24} color="#b6b6b6"/>
    </Container>
  );
};

export default TextToAudio;
