import {Text, TouchableOpacity, View} from "react-native";
import {playlistStyles} from "./styles";
import FastImage from "react-native-fast-image";

const Playlist = ({title, subtitle, bg, onPress, containerStyles}) => {
    return (
        <TouchableOpacity style={[playlistStyles.container, containerStyles]} onPress={onPress}>
            <FastImage
                style={playlistStyles.image}
                source={{
                    uri: bg,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={playlistStyles.textContainer}>
                <Text style={playlistStyles.title}>{title}</Text>
                {subtitle && <Text style={playlistStyles.subtitle}>{subtitle}</Text>}
            </View>
        </TouchableOpacity>

    )

}

export default Playlist;