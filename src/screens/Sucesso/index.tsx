import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import { 
  Overlay, 
  ModalContainer, 
  Warning, 
  Message,
} from './style';

export function Sucesso() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
      <SuccessOverlay visible={modalVisible} />
  );
}

export const SuccessOverlay = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Warning>✔</Warning>
          <Message> Sucesso! </Message>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};