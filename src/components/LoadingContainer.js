import {Animated, StyleSheet, View, Text} from "react-native";

export default function() {
    return (
        <View style={styles.container}>
            <Animated.View style={styles.background}>
                <Text>Logging you in</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        zIndex: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    background: {
        backgroundColor: 'rgba(255, 255, 255, .5)',
        borderColor: 'rgba(255, 255, 255, .5)',
        borderWidth: 1,
        borderRadius: 8
    }
})