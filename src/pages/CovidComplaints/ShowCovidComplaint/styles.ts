import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  display: flex;
  background: #006633;
`;

export const ChatContainer = styled.SafeAreaView`
  background-color: #ffffff;
  padding-top: 2px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex: 1;
`;

export const ChatMain = styled.KeyboardAvoidingView`
  flex: 1 auto;
`;

export const ChatBody = styled.View`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex: 1 auto;
`;

export const ChatMessages = styled.FlatList`
  flex: 1 auto;
  flex-direction: column;
  padding: 16px;
`;

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

  margin-right: 8px;

  border-radius: 30px;

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

export const MessageIconContainer = styled(RectButton)`
  background-color: #f38725;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 8px;

  align-items: center;
  justify-content: center;
`;
