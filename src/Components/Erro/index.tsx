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

export const ErrorOverlay = ({ visible }: { visible: boolean }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
        <Warning>
            {}
            <LottieView
              source={{ uri: 'https://lottie.host/b2cf600f-e10d-458a-8d1e-d32a53d0545d/JeysaxOUIY.json' }}
              autoPlay
              loop
              style={{ width: 90, height: 90 }}
            />
          </Warning>
          <Message> Erro! </Message>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};