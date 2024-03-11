import {Image, Text, TouchableOpacity, View} from "react-native";
import {trackStyles} from "./styles";
import {formatNamesWithAnd} from "@utils/helpers";
import FastImage from "react-native-fast-image";
const Track = ({ track, onClick, index, last = false }) => {
        return (
        <TouchableOpacity onPress={() => onClick(track, index)} style={trackStyles.outerContainer}>
            <View style={trackStyles.container}>
                <View style={trackStyles.leftContainer}>
                    <FastImage
                        source={{
                            uri: track.album[0].cover_image[0].url,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={trackStyles.image}
                    />

                    <View>
                        <Text style={trackStyles.title}>{track.title}</Text>
                        <Text style={trackStyles.artists}>Uploaded on {track.created_at} · {track.likes_count} likes · {track.play_count} plays</Text>
                    </View>
                </View>

                {/*<TouchableOpacity onPress={() => /!* Handle more icon click here *!/}>*/}
                {/*    <Image source={require('@assets/icons/more-icon.png')} style={trackStyles.moreIcon} />*/}
                {/*</TouchableOpacity>*/}
            </View>

            {!last && <View style={trackStyles.separator}/>}
        </TouchableOpacity>
    );
};

export default Track;