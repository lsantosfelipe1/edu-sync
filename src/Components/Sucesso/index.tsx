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

export const SuccessOverlay: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Warning>
            {}
            <LottieView
              source={{ uri: 'https://lottie.host/b3c801b1-eb9f-4f11-83bf-72fcd8db42cb/ZH8uAU00pt.json' }}
              autoPlay
              loop
              style={{ width: 100, height: 100 }}
            />
          </Warning>
          <Message> Sucesso! </Message>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};