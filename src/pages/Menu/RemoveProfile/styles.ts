import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background: #ffffff;
  margin: 20px;
  border-radius: 10px;
  padding: 32px;
  justify-content: center;
  align-items: center;
`
export const ModalHeader = styled.View`
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  color: #006633;
  font-size: 18px;
`;

export const ModalBody = styled.View``;

export const ModalFooter = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
  border-top-width: 1px;
  border-top-color: #cccccc;
  padding-top: 8px;
`;

export const CancelButton = styled.TouchableOpacity`
  padding: 8px 32px;
  border-right-color: #cccccc;
  border-right-width: 1px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  padding: 16px;
`;

// modalView: {
//   margin: 20,
//   backgroundColor: "white",
//   borderRadius: 20,
//   padding: 35,
//   alignItems: "center",
//   shadowColor: "#000",
//   shadowOffset: {
//     width: 0,
//     height: 2
//   },
//   shadowOpacity: 0.25,
//   shadowRadius: 4,
//   elevation: 5
// },
