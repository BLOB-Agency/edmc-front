import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import ReturnBtn from "../components/ReturnBtn";
import SecondaryBtn from "../components/SecondaryBtn";
const SignUpColorPick = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <LinearGradient
        colors={["rgba(30,30,30,0.0)", "rgba(30, 30, 30, 0.89)", "#1E1E1E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          ...styles.linearGradient,
        }}
      >
        <ReturnBtn method={() => navigation.navigate("Welcome")} />

        <View style={styles.containerMain}>
          <View style={styles.containerText}>
            <Text style={styles.title}>Pick your color</Text>
            <Text style={{ color: "#fff" }}>
              Music is subjective, and so is our app. Pick a color you like!
            </Text>
          </View>
          <SecondaryBtn
            title={"CONTINUE!"}
            textStyle
            // onPress={handleUsername}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    imageBg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      containerMain: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        gap: 12,
      },
      containerText: {
        justifyContent: "center",
        marginTop: 24,
        rowGap: 9,
      },
      title: {
        fontSize: 36,
        marginVertical: 0,
        color: "#fff",
        fontFamily: "Cereal-Medium",
      },
      subtitle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Gordita-Medium",
      },
    
      button: {
        backgroundColor: "#A020F0",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
        marginTop: 10,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "600",
      },
      linearGradient: {
        flex: 1,
        gap: 24,
        padding: 24,
        justifyContent: "space-between",
        paddingBottom: 72,
      },
      image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 24,
      }
});

export default SignUpColorPick;
