import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Platform, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {v4 as uuid} from 'uuid';
import Icon from 'react-native-vector-icons/Feather';

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import {
  PanGestureHandler,
  State,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import MessagesRepository from '../../../../repositories/MessagesRepository';
import Complaint from '../../../../data/models/Complaint';

import {MessageIconContainer} from './styles';

interface ILocalization {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface IProps {
  complaint: Complaint;
  messagesRepository: MessagesRepository;
  location: ILocalization;
  recordTime: string;
  handleRecordTime: (value: string) => void;
  recordAudio: boolean;
  handleRecordAudio: (value: boolean) => void;
}

const AudioButton: React.FC<IProps> = ({
  messagesRepository,
  location,
  complaint,
  recordTime,
  handleRecordTime,
  recordAudio,
  handleRecordAudio,
}) => {
  const [buttonHandlerState, setButtonHandlerState] = useState(0);
  const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), []);

  //Animations contants

  const micPressAnimation = useSharedValue(1);
  //Mic Animation
  const micTranslateX = useSharedValue(0);
  const micBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: micPressAnimation.value },
        { translateX: interpolate(micTranslateX.value, [-360, 0], [-120, 0], Animated.Extrapolate.CLAMP) },
      ],
    }
  });

  //MicPressHandler functions
  const handleMicGesture = useCallback(
    async ({nativeEvent}) => {
      micTranslateX.value = nativeEvent.translationX;
      micPressAnimation.value = withTiming(2.5, {
        duration: 100,
      });

      if (nativeEvent.translationX < -120) {
        handleRecordAudio(false);
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        handleRecordTime('');
      }
    },
    [micTranslateX, micPressAnimation, audioRecorderPlayer],
  );

  const handleMicStateChange = useCallback(
    e => {
      const {nativeEvent} = e;

      if (
        nativeEvent.oldState === State.ACTIVE ||
        nativeEvent.oldState === State.BEGAN
      ) {
        micTranslateX.value = withSpring(0);
        micPressAnimation.value = withTiming(1, {
          duration: 100,
        });
      }
    },
    [micTranslateX, micPressAnimation],
  );

  const micStateHandler = useCallback(
    async ({nativeEvent}: HandlerStateChangeEvent) => {
      if (
        nativeEvent.state === State.ACTIVE ||
        nativeEvent.state === State.BEGAN
      ) {
        setButtonHandlerState(nativeEvent.state);

        const audioPermisions =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.MICROPHONE
            : PERMISSIONS.ANDROID.RECORD_AUDIO;
        const result = await check(audioPermisions);

        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              'Erro',
              'Essa função não está disponível para o seu aparelho.',
            );
            break;
          case RESULTS.DENIED:
            request(audioPermisions);
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              'Erro',
              'É necessário conceder permissões para o aplicativo poder gravar áudio.',
            );
            break;
          case RESULTS.GRANTED:
            //Start audio record
            handleRecordAudio(true);
            break;
          case RESULTS.BLOCKED:
            Alert.alert('The permission is denied and not requestable anymore');
            break;
        }
      }

      if (nativeEvent.state === State.END) {
        setButtonHandlerState(nativeEvent.state);
        handleRecordAudio(false);
        return;
      }
    },
    [],
  );

  //Trigger handle audio
  // Start or stop record when state changes
  useEffect(() => {
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.medium,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const meteringEnabled = false;

    const startRecord = async () => {
      micPressAnimation.value = withTiming(2.5, {
        duration: 100,
      });

      const checkDestDir = await RNFS.readDir(RNFS.DocumentDirectoryPath);

      const checkAudiosDir = checkDestDir.find(item => item.name === 'Audios');

      if (!checkAudiosDir) {
        await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/Audios`);
      }

      const iosPath = `file:///${
        RNFS.DocumentDirectoryPath
      }/Audios/vivavoz-${uuid()}.m4a`;
      const androidPath = `${
        RNFS.DocumentDirectoryPath
      }/Audios/vivavoz-${uuid()}.mp4`;

      const recordPath = Platform.OS === 'ios' ? iosPath : androidPath;

      await audioRecorderPlayer.startRecorder(
        recordPath,
        audioSet,
        meteringEnabled,
      );

      audioRecorderPlayer.addRecordBackListener((e: any) => {
        const timeCount = Math.floor(e.currentPosition / 1000);
        handleRecordTime(audioRecorderPlayer.mmss(timeCount));
      });
    };

    const stopRecord = async () => {
      micPressAnimation.value = withTiming(1, {
        duration: 100,
        easing: Easing.ease,
      });

      if (buttonHandlerState === State.END) {
        handleRecordAudio(false);
        const audioPath = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();

        const audioDuration = recordTime.split(':');
        const durationSeconds =
          Number(audioDuration[0]) * 60 + Number(audioDuration[1]);

        handleRecordTime('');

        await messagesRepository.createMessage({
          keyFromMe: 'outgoing',
          status: 1,
          needPush: 0,
          messageType: 'audio',
          mediaUrl: audioPath, //audioPath.replace('file:///', '')
          mediaDuration: durationSeconds,
          mediaMimeType: 'audio/mpeg',
          mediaSize: 0,
          latitude: location?.coords.latitude ? location.coords.latitude : null,
          longitude: location?.coords.longitude
            ? location.coords.longitude
            : null,
          complaint: complaint,
        });
      }
    };

    if (recordAudio) {
      startRecord();
    }

    if (!recordAudio) {
      stopRecord();
    }
  }, [recordAudio, micPressAnimation, audioRecorderPlayer]);

  return (
    <PanGestureHandler
      onGestureEvent={handleMicGesture}
      onHandlerStateChange={handleMicStateChange}>
      <Animated.View style={micBtnStyle}>
        <MessageIconContainer onHandlerStateChange={micStateHandler}>
          <Icon name="mic" size={20} color="#ffffff" />
        </MessageIconContainer>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default AudioButton;
