import React, {useState} from 'react';
import {Text, View} from 'react-native';
import FastImage from "react-native-fast-image";
import { BlurView } from "expo-blur";
import styles from './styles';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PlayerTopBar from "@screens/player/topBar";
import PlayerInfo from "@screens/player/playerInfo";
import PlayerControls from "@screens/player/PlayerControls";
import Popup from "@screens/player/popup";
import {useMusicPlayer} from "@context/MusicPlayerContext";
import useMusicTimer from "@utils/hooks/useMusicTimer";



const Player = () => {
    const { currentSong, isPlaying } = useMusicPlayer();
    const insets = useSafeAreaInsets();
    const [isModalVisible, setModalVisible] = useState(false);
    // const {timeUntilNextStar} = useMusicTimer()
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    if (!currentSong)
        return <Text>Loading...</Text>;

    return (
        <View style={{...styles.outerContainer, paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <FastImage
                source={{ uri: currentSong.cover_image[0].url, priority: FastImage.priority.normal }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.bgImage}
            />
            <BlurView style={styles.blurView} tint="dark" intensity={75} />

            <PlayerTopBar currentSong={currentSong} toggleModal={toggleModal} />
            <PlayerInfo currentSong={currentSong} />
            <PlayerControls isPlaying={isPlaying} />

            <Popup setModalVisible={toggleModal} modalVisible={isModalVisible} track={currentSong} />
        </View>
    );
};

export default Player;
