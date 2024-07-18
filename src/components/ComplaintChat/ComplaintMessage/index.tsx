import React, {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {Text, View, TouchableWithoutFeedback, Platform} from 'react-native';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import FileViewer from 'react-native-file-viewer';

import TextToAudio from './TextToAudio';

import {
  MessageContainer,
  MessageItem,
  MessageContent,
  MessageInfo,
  MessageAudio,
  MessageListen,
  MessageAudioProgressContainer,
  // MessageButton,
  // MessageButtonText,
  MessageImage,
  MessageDocumentContainer,
  MessageDocumentTitle,
} from './styles';
import Sound from 'react-native-sound';

interface IMessageProps {
  message: any;
}

const ComplaintMessage: React.FC<IMessageProps> = ({message}) => {
  const {_raw: msg} = message;

  const [playAudio, setPlayAudio] = useState(false);
  const [playTime, setPlayTime] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    Sound.setCategory('Playback'); // Habilitar reprodução em modo de silêncio
  }, []);

  const playAudioNew = (audioPath, audioDuration) => {
    setPlayAudio(!playAudio);
    const audio = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Erro ao carregar o áudio:', error);
        return;
      }

      audio.setPitch(2);
      audio.play(success => {
        if (success) {
          console.log('Áudio reproduzido com sucesso');
        } else {
          console.log('Erro ao reproduzir o áudio');
        }

        audio.stop(() => {
          setPlayAudio(!playAudio);
        });
      });

      const timer = setInterval(() => {
        audio.getCurrentTime(seconds => {
          setSliderValue(seconds / audioDuration);
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
      }, audio.getDuration() * 1000);
    });
  };

  const progressEl = useRef<any>(null);

  const audioRecorderPlayer = useMemo(() => {
    return new AudioRecorderPlayer();
  }, []);

  const handleOpenImage = useCallback((url): any => {
    console.log(url);
  }, []);

  const handleAudioDuration = useCallback(seconds => {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
  }, []);

  const handleAudioPlayerValueChange = useCallback((value: number) => {
    return setCurrentPositionSec(value);
  }, []);

  const handlePlayAudio = useCallback(
    async ({mediaUrl, mediaDuration}: any) => {
      setPlayAudio(!playAudio);

      if (!playAudio) {
        await audioRecorderPlayer.startPlayer(mediaUrl);
        audioRecorderPlayer.addPlayBackListener((e: any) => {
          const timeCount = Math.floor(e.currentPosition / 1000);
          setPlayTime(audioRecorderPlayer.mmss(timeCount));
          const progressValue = e.currentPosition / 1000;
          handleAudioPlayerValueChange(progressValue);

          if (timeCount === mediaDuration) {
            setPlayAudio(false);
            setCurrentPositionSec(0);
          }
        });

        return;
      }

      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      const originalTimer = handleAudioDuration(mediaDuration);
      setPlayTime(originalTimer);

      return;
    },
    [
      playAudio,
      audioRecorderPlayer,
      handleAudioDuration,
      handleAudioPlayerValueChange,
    ],
  );

  const handleAudioProgressComplete = useCallback(
    async value => {
      await audioRecorderPlayer.seekToPlayer(value);
      await audioRecorderPlayer.resumePlayer();
    },
    [audioRecorderPlayer],
  );

  const handleOpenDocument = useCallback(async path => {
    await FileViewer.open(path);
  }, []);

  return (
    <MessageContainer>
      <MessageItem isMyMessage={msg.key_from_me === 'outgoing'}>
        <MessageContent isMyMessage={msg.key_from_me === 'outgoing'}>
          {msg.message_type === 'image' && (
            <TouchableWithoutFeedback
              onPress={() => handleOpenImage(msg.media_url)}>
              <MessageImage
                source={
                  Platform.OS === 'ios'
                    ? {uri: `file:///${msg.media_url}`}
                    : {uri: `file://${msg.media_url}`}
                }
              />
            </TouchableWithoutFeedback>
          )}
          {msg.message_type === 'text' && <Text>{msg.data}</Text>}
          {msg.message_type === 'document' && (
            <MessageDocumentContainer
              onPress={() => handleOpenDocument(msg.media_url)}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Icon name="file" size={24} style={{marginRight: 8}} />
                <MessageDocumentTitle>{msg.data}</MessageDocumentTitle>
              </View>
              <Icon name="download" size={24} style={{marginLeft: 24}} />
            </MessageDocumentContainer>
          )}
          {msg.message_type === 'audio' && (
            <MessageAudio>
              <MessageListen onPress={async () => playAudioNew(msg.media_url, msg.media_duration)}>
                {!playAudio ? (
                  <Icon name="play" size={24} color="#ffffff" />
                ) : (
                  <Icon name="pause" size={24} color="#ffffff" />
                )}
              </MessageListen>
              <MessageAudioProgressContainer>
                <Text>
                  {playTime === ''
                    ? handleAudioDuration(msg.media_duration)
                    : playTime}
                </Text>
                <Slider
                  style={{width: 130}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  value={sliderValue}
                />
              </MessageAudioProgressContainer>
            </MessageAudio>
          )}
        </MessageContent>
        {msg.message_type === 'text' && msg.key_from_me === 'income' && (
          <TextToAudio messageId={msg.id} key={msg.id} />
        )}
      </MessageItem>
    </MessageContainer>
  );
};

export default ComplaintMessage;
