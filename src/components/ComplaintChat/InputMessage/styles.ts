import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const MessageInputContainer = styled.View`
  padding: 16px;

  border-top-width: 1px;
  border-color: #dedede;

  background: #f7f7f7;

  align-self: flex-end;

  flex-direction: row;
  align-items: center;
`;

export const MessageInputTextContainer = styled.View`
  background-color: #ececec;
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: 72px;

  margin-right: 8px;

  border-radius: 56px;

  padding: 8px 16px;
`;

export const MessageInput = styled.TextInput`
  flex: 1;
`;

export const MessageAssetsInputs = styled.View`
  flex-direction: row;
`;

export const MessageAttachButton = styled(RectButton)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

export const MessagePictureButton = styled(RectButton)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const PictureModal = styled.Modal`
  padding: 24px;
  elevation: 5;
`;

export const MessageIconContainer = styled(RectButton)`
  background-color: #f38725;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 8px;

  align-items: center;
  justify-content: center;
`;


export const PictureModalContent = styled.View`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  background: #f7f7f7;
  border-width: 1px;
  border-color: #ececec;

  width: 100%;
  height: 200px;

  padding: 16px;

  position: absolute;
  bottom: 0;
`;

export const PictureModalBody = styled.View``;

export const PictureModalBtn = styled.Pressable`
  background: #d3d3d3;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 16px;
`;

export const PictureModalBtnText = styled.Text`
  color: #006633;
  font-family: 'AvenirNextLTPro-Demi';
`;

export const MessageAudioInput = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  padding: 8px;
`;

export const MessageAudioTimerContent = styled.View`
  flex-direction: row;
`;

export const MessageAudioInputTimer = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  font-size: 22px;
  margin-left: 8px;
`;

export const MessageAudioCancelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const MessageAudioInputCancel = styled.Text`
  font-size: 12px;
  color: 	#FF0000;
  font-family: 'AvenirNextLTPro-Demi';
`;
