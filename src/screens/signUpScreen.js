// src/screens/SignUpScreen.js
import React, { useState } from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgUri } from "react-native-svg";
import PrimaryInput from "../components/PrimaryInput";
import { backIcon } from "../../assets/icons/back-icon.svg";
import { userIcon } from "../../assets/icons/user icon.svg";
import SecondaryBtn from "../components/SecondaryBtn";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Validate the input fields
    // If everything is correct, navigate to the next screen or sign the user up
    navigation.navigate("Home"); // Replace with actual next step in your app
  };

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
        <SvgUri width="24" height="24" source={backIcon} />
        <View style={styles.containerMain}>
          <View style={styles.containerText}>
            <Text style={styles.title}>Welcome to EDMC</Text>
            <Text style={{ color: "#fff" }}>
              Let's start with your username
            </Text>
          </View>
          <PrimaryInput
            label={"Username"}
            placeholder="Username"
            Icon={userIcon}
            extraStyle={styles.input}
          />
        </View>
        <SecondaryBtn  title={"CONTINUE!"} textStyle onPress={handleSignUp} />
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
  },
  containerText: {
    justifyContent: "center",
    marginTop: 24,
    rowGap:9,
  },
  title: {
    fontSize: 36,
    marginVertical:0,
    color: "#fff",
    fontFamily: "Cereal-Medium",
    
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Gordita-Medium",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
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
  backIcon: {
    width: 24,
    height: 24,
    marginTop: 24,
    marginLeft: 24,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 24,
  },
  input: {
    marginTop: 36,
  },
});

export default SignUpScreen;
