import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native'; 
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
        <Warning>
            {}
            <LottieView
              source={{ uri: 'https://lottie.host/35480a3c-135f-4d79-b3ec-1eb3b14ce60a/s2Oymke3GC.json' }}
              autoPlay
              loop
              style={{ width: 100, height: 100 }}
            />
          </Warning>
          <Message> Erro! </Message>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};