import styles from "./styles";
import {ImageBackground} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient";
import {useEffect} from "react";

export default function ({children, style}) {

    return (
        <ImageBackground
            source={require("@assets/images/bg.png")}
            style={{ width: "100%", height: "100%" }}
        >
            <LinearGradient
                colors={["rgba(30,30,30,0.0)", "rgba(30, 30, 30, 0.89)", "#1E1E1E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    ...styles.gradient,

                }}
            >
               <SafeAreaView style={{...styles.container, ...style}}>
                   {children}
               </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    )
}