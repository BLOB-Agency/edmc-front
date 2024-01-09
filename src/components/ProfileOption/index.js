import React, { useEffect } from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import styles from "./styles";

const ProfileOption = ({ icon, text, method, isLast = false }) => {
    const borderBottomWidth = isLast ? 0 : 1;
    return (
        <TouchableOpacity onPress={method}>
            <View style={{...styles.containerOption, borderBottomWidth}}>
                <Image source={icon} style={styles.icon} />
                <Text style={styles.textOption}>{text}</Text>
                <Image
                    source={require("@assets/icons/chevron-right.png")}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ProfileOption;
