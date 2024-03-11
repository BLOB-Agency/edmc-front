import {Image, Text, TouchableOpacity, View} from "react-native";
import {trackStyles} from "./styles";
import {formatNamesWithAnd} from "@utils/helpers";

const Track = ({ track, onClick, index, last = false }) => {
    return (
        <TouchableOpacity onPress={() => onClick(track, index)} style={trackStyles.outerContainer}>
            <View style={trackStyles.container}>
                <View style={trackStyles.leftContainer}>
                    <Text style={trackStyles.index}>{index}</Text>

                    <View>
                        <Text style={trackStyles.title}>{track.title}</Text>
                        <Text style={trackStyles.artists}>{formatNamesWithAnd(track.artists)}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => {/* Handle more icon click here */}}>
                    <Image source={require('@assets/icons/more-icon.png')} style={trackStyles.moreIcon} />
                </TouchableOpacity>
            </View>

            {!last && <View style={trackStyles.separator}/>}
        </TouchableOpacity>
    );
};

export default Track;