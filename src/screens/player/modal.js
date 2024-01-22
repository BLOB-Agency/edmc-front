import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Player from './index';

const PlayerModal = ({modalVisible, setModalVisible}) => {

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            isVisible={modalVisible}
            onSwipeComplete={closeModal}
            swipeDirection="down"
            onBackdropPress={closeModal}
            onBackButtonPress={closeModal}
            style={{ margin: 0 }}
        >
            <Player />
        </Modal>
    );
};

export default PlayerModal;
