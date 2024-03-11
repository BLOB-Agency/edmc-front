import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";

const Playlist = ({ tag, title, subtitle, bg, onClick, style }) => {
    const tagWords = (tag || "").split(' ');

    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.7}>
            <ImageBackground
                style={[styles.container, style]}
                source={bg}
            >
                <View style={styles.bgOverlay} />
                <View style={styles.topTextContainer}>
                    {tagWords.map((word, index) => (
                        <Text key={index} style={styles.topText}>
                            {word}
                        </Text>
                    ))}
                </View>

                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>
                        {title}
                    </Text>
                    <Text style={styles.bottomSubText}>
                        {subtitle}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default Playlist;