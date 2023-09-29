import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface MessageContentProps {
  isMyMessage: boolean;
}

export const MessageContainer = styled.View`
  flex: 1 auto;
`;

export const MessageItem = styled.View<MessageContentProps>`
  flex: 1 auto;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.isMyMessage ? 'flex-end' : 'flex-start')};;
`;

export const MessageContent = styled.View<MessageContentProps>`
  padding: 16px;
  flex: 1;
  background: ${(props) => (props.isMyMessage ? '#cef2e0' : '#ececec')};
  border-radius: 20px;
  margin: 8px 0;
  position: relative;
  max-width: 80%;
`;

export const MessageAudio = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MessageListen = styled(RectButton)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #006633;

  align-items: center;
  justify-content: center;

  margin: 0 8px;
`;

export const MessageAudioProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MessageButton = styled(RectButton)`
  margin: 4px 0;
  border-radius: 10px;
  background-color: #fafafa;
  padding: 8px;
`;

export const MessageButtonText = styled.Text`
  margin: 0 8px;
`;

export const MessageImage = styled.Image`
  max-width: 100%;
  width: 250px;
  height: 250px;
  margin-bottom: 8px;
`;

export const MessageInfo = styled.Text`
  margin-top: 8px;
  font-size: 10px;
  color: #666666;
  align-self: flex-end;
`;

export const MessageDocumentContainer = styled.TouchableOpacity`
  padding: 16px;
  background: rgba(0, 0, 0, 0.08);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;

export const MessageDocumentTitle = styled.Text`
  max-width: 110px;
`;
