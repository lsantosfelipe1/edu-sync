import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import { 
  Overlay, 
  ModalContainer, 
  Warning, 
  Message,
} from './style';

export function Erro() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
      <ErrorOverlay visible={modalVisible} />
  );
}

export const ErrorOverlay = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Warning name = "error-outline"/>
          <Message> Erro! </Message>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};