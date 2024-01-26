import React, { useEffect } from "react";
import {TouchableOpacity, Text, Image, View, Switch} from "react-native";
import styles from "./styles";
import {useSelector} from "react-redux";

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


const ProfileToggleOption = ({ icon, text, isLast = false, toggleValue, onToggleChange }) => {
    const borderBottomWidth = isLast ? 0 : 1;
    const color = useSelector((state) => state.user.color || '#BB61C9');
    return (
        <View style={{...styles.containerOption, borderBottomWidth}}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.textOption}>{text}</Text>
            <Switch
                trackColor={{ false: '#767577', true: color }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor='#3e3e3e'
                onValueChange={onToggleChange}
                value={toggleValue}
            />
        </View>
    );
};

export {ProfileToggleOption} ;
export default ProfileOption;
