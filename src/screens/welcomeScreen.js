// src/screens/WelcomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryBtn from "../components/PrimaryBtn";
import SecondaryBtn from "../components/SecondaryBtn";
import { StatusBar } from "expo-status-bar";

const WelcomeScreen = ({ navigation }) => {
  return (
    <>
    <StatusBar style="light" />
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(30,30,30,0.0)", "rgba(30, 30, 30, 0.7)", "#1E1E1E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.linearGradient}
      >
        <Text style={styles.heroText}>Welcome to EDMC</Text>
        <SecondaryBtn
          title="Sign In"
          onPress={() => navigation.navigate("SignIn")}
        />
        <PrimaryBtn
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
        {/* Add your social media sign-ins here */}
      </LinearGradient>
    </ImageBackground>
    
    </>
   
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  heroText: {
    fontFamily: "Cereal-Medium",
    fontSize: 36,
    color: "#FFFFFF",
    letterSpacing: -1.1,
    lineHeight: 44,
  },
  linearGradient: {
    flex: 1,
    gap: 24,
    padding: 24,
    justifyContent: "flex-end",
    paddingBottom: 72,
  },
  container: {
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 60,
    textAlign: "center",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontFamily: "Cereal-Medium",
    fontSize: 16,
    color: "#BB61C9",
    letterSpacing: -0.49,
    textAlign: "center",
    textTransform: "uppercase",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default WelcomeScreen;
