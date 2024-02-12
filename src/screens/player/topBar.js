import styles from "@screens/player/styles";
import IconButton from "@components/IconButton";
import {Text, View} from "react-native";
import {usePlayerEventEmitter} from "@utils/emitters";

export const PlayerTopBar = ({currentSong,toggleModal}) => {
    const playerEventEmitter = usePlayerEventEmitter();

  return (

      <View style={styles.topContainer}>
          <IconButton
              src={require("@assets/icons/down-icon.png")}
              onPress={() => playerEventEmitter.emit('closePlayer')}
          />

          <View style={styles.albumTitleContainer}>
              <Text style={styles.nowPlaying}>Now playing</Text>
              <Text style={styles.albumTitle}>{currentSong.title}</Text>
          </View>

          <IconButton
                onPress={toggleModal}
              src={require("@assets/icons/more-icon.png")}
          />
      </View>
  )
}

export default PlayerTopBar;