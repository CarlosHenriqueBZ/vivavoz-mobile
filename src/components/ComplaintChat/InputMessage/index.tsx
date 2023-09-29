import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Platform, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {v4 as uuid} from 'uuid';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';

import {useDatabase} from '@nozbe/watermelondb/hooks';
import MessagesRepository from '../../../repositories/MessagesRepository';

import Complaint from '../../../data/models/Complaint';

import AudioButton from  './AudioButton';
import AnimatedMic from './AnimatedMic';

import {
  MessageInputContainer,
  MessageInput,
  MessageInputTextContainer,
  MessageAssetsInputs,
  MessageAttachButton,
  MessagePictureButton,
  MessageIconContainer,
  PictureModal,
  PictureModalContent,
  PictureModalBody,
  PictureModalBtn,
  PictureModalBtnText,
  MessageAudioInput,
  MessageAudioTimerContent,
  MessageAudioInputTimer,
  MessageAudioCancelContainer,
  MessageAudioInputCancel,
} from './styles';

interface IInputProps {
  complaint: Complaint;
}

interface ILocalization {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const InputMessage: React.FC<IInputProps> = ({complaint}: IInputProps) => {
  const [message, setMessage] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState<ILocalization>();

  //Audio state
  const [recordAudio, setRecordAudio] = useState<boolean>(false);
  const [recordTime, setRecordTime] = useState('00:00');

  const database = useDatabase();

  const messagesRepository = useMemo(() => new MessagesRepository(database), [database]);

  const checkImageDir = useMemo(async () => {
    const checkDestDir = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    const checkImagesDir = checkDestDir.find((item) => item.name === 'Images');

    if (!checkImagesDir) {
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/Images`);
    }
  }, []);

  //realiza as tratativas para o envio da mensagem
  const handleMessageSubmit = useCallback(async () => {
    await messagesRepository.createMessage({
      keyFromMe: 'outgoing',
      status: 1,
      needPush: 0,
      messageType: 'text',
      data: message,
      latitude: location?.coords.latitude ? location.coords.latitude : null,
      longitude: location?.coords.longitude ? location.coords.longitude : null,
      complaint: complaint,
    });

    setMessage('');
  }, [complaint, message, location, messagesRepository]);

  //realiza envio de mensagens contendo imagens
  const handleFilePath = useCallback(
    async (uri, type, fileName) => {
      await checkImageDir;
      const fileExtension = fileName.split('.').pop();

      const destPath = `${
        RNFS.DocumentDirectoryPath
      }/Images/vivavoz-${uuid()}.${fileExtension}`;

      await RNFS.copyFile(uri, destPath);
      await RNFS.stat(destPath);
      return destPath;
    },
    [checkImageDir],
  );

  const handleImageSubmit = useCallback(
    async (picture: any) => {
      const pictureUri = await handleFilePath(
        picture.uri,
        picture.type,
        picture.fileName,
      );

      try{
        await messagesRepository.createMessage({
          keyFromMe: 'outgoing',
          status: 1,
          needPush: 0,
          messageType: 'image',
          mediaUrl: pictureUri,
          mediaMimeType: picture.type,
          mediaSize: picture.fileSize,
          latitude: location?.coords.latitude ? location.coords.latitude : null,
          longitude: location?.coords.longitude
            ? location.coords.longitude
            : null,
          complaint: complaint,
        });
      }catch(error){
        Alert.alert('Não foi possível enviar a sua imagem.')
      }


    },
    [complaint, handleFilePath, location, messagesRepository],
  );

  const handleDocumentSubmit = useCallback(async () => {

    try{
      const document = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const checkDestDir = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      const checkDocumentsDir = checkDestDir.find((item) => item.name === 'Documents');

      if (!checkDocumentsDir) {
        await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/Documents`);
      }

      const documentOriginPath = document.fileCopyUri;
      const documentDestPath = `${RNFS.DocumentDirectoryPath}/Documents/VivaVoz-${uuid()}-${document.name}`;

      await RNFS.copyFile(documentOriginPath, documentDestPath);

      await messagesRepository.createMessage({
        keyFromMe: 'outgoing',
        status: 1,
        needPush: 0,
        messageType: 'document',
        data: document.name,
        mediaUrl: documentDestPath,
        mediaMimeType: document.type,
        mediaSize: document.size,
        latitude: location?.coords.latitude ? location.coords.latitude : null,
        longitude: location?.coords.longitude ? location.coords.longitude : null,
        complaint: complaint,
      });
    }catch (error: unknown) {
      if (DocumentPicker.isCancel(error)) {
        //user cancel the upload.
       } else {
         throw error;
       }
    }

  }, [messagesRepository, complaint, location]);

  useEffect(() => {

    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always',
    });

    Geolocation.getCurrentPosition(({coords}) => {
      setLocation({coords});
    }, (error)=>{
      if(error.PERMISSION_DENIED === 1){
        const permissions = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        request(permissions);
      }
    });

  }, []);

  return (
    <>
      <MessageInputContainer>
        <MessageInputTextContainer>
          {recordAudio === false ? (
            <>
              <MessageInput
                placeholder="Comece digitando aqui.."
                multiline
                value={message}
                onChangeText={(value) => setMessage(value)}
              />
              {!message && (
                <MessageAssetsInputs>
                  <MessageAttachButton onPress={handleDocumentSubmit}>
                    <Icon name="paperclip" size={20} color="#666666" />
                  </MessageAttachButton>
                  <MessagePictureButton onPress={() => setModalVisible(true)}>
                    <Icon name="camera" size={20} color="#666666" />
                  </MessagePictureButton>
                </MessageAssetsInputs>
              )}
            </>
          ) : (
            <MessageAudioInput>
              <MessageAudioTimerContent>
                <AnimatedMic />
                <MessageAudioInputTimer>{recordTime}</MessageAudioInputTimer>
              </MessageAudioTimerContent>
              <MessageAudioCancelContainer>
                <Icon name="chevron-left" size={20} />
                <MessageAudioInputCancel>
                  Arraste para cancelar
                </MessageAudioInputCancel>
              </MessageAudioCancelContainer>
            </MessageAudioInput>
          )}
        </MessageInputTextContainer>

        {message ? (
          <MessageIconContainer onPress={handleMessageSubmit}>
            <Icon name="send" size={20} color="#ffffff" />
          </MessageIconContainer>
        ) : (
          <AudioButton
            messagesRepository={messagesRepository}
            location={location!}
            complaint={complaint}
            recordAudio={recordAudio}
            handleRecordAudio={setRecordAudio}
            recordTime={recordTime}
            handleRecordTime={setRecordTime}
          />
        )}
      </MessageInputContainer>

      <PictureModal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <PictureModalContent
          style={Platform.select({
            ios: {
              shadowColor: '#000',
              shadowRadius: 2,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.16,
            },
            android: {
              elevation: 4,
            },
          })}>
          <PictureModalBody>
            <PictureModalBtn
              onPress={() => {
                launchCamera({mediaType: 'photo', quality: 0.5, cameraType: 'back'}, (response: any) => {
                  if(!response.didCancel){
                    handleImageSubmit(response);
                    setModalVisible(!modalVisible);
                  }
                });
              }}>
              <PictureModalBtnText>
                Tirar uma foto com a câmera
              </PictureModalBtnText>
            </PictureModalBtn>
            <PictureModalBtn
              onPress={() => {
                launchImageLibrary({mediaType: 'photo'}, (response: any) => {
                  if(!response.didCancel){
                    handleImageSubmit(response);
                    setModalVisible(!modalVisible);
                  }
                });
              }}>
              <PictureModalBtnText>
                Selecionar foto da galeria
              </PictureModalBtnText>
            </PictureModalBtn>
            <PictureModalBtn onPress={() => setModalVisible(false)}>
              <PictureModalBtnText>Cancelar</PictureModalBtnText>
            </PictureModalBtn>
          </PictureModalBody>
        </PictureModalContent>
      </PictureModal>
      </>
  );
};

export default InputMessage;
