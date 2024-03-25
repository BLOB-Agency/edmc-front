import {Image, Text, TouchableOpacity, View} from "react-native";
import {trackStyles} from "./styles";
import {formatNamesWithAnd} from "@utils/helpers";
import {styles} from "@screens/artistProfile/styles";
import FastImage from "react-native-fast-image";

const Track = ({ track, onClick, index,  last = false, image  = false,}) => {
    return (
        <TouchableOpacity onPress={() => onClick(track, index)} style={trackStyles.outerContainer}>
            <View style={trackStyles.container}>
                <View style={trackStyles.leftContainer}>
                    {!image && (
                        <Text style={trackStyles.index}>{index}</Text>
                    )}

                    {image && (
                        <FastImage
                            style={trackStyles.image}
                            source={{
                                uri: track.album[0].cover_image.url,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    )}

                    <View>
                        <Text style={trackStyles.title}>{track.title}</Text>
                        <Text style={trackStyles.artists}>{formatNamesWithAnd(track.artists)}</Text>
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