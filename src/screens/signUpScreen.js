import React, { useState } from "react";
import { StyleSheet, ImageBackground, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryInput from "../components/PrimaryInput";
import ReturnBtn from "../components/ReturnBtn";
import SecondaryBtn from "../components/SecondaryBtn";
import RegisterEmailModal from "../components/RegisterEmailModal";
import { useDispatch} from "react-redux";
import { userActions } from "../store/userSlice";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const userIcon = require("../../assets/icons/user-icon.png");
  const showEmailModal = () => {
    setEmailModalVisible(!emailModalVisible);
  };
  // Let's add the username to the userSlice by dispatching the setUsername action
  // Let's use the dispatch method from the useDispatch hook to dispatch the setUsername action
  // Let's import the useDispatch hook from react-redux

  const getUsername = (enteredText) => {
    setUsername(enteredText);
  };
  const handleUsername = () => {
    console.log(username);
    if (username.trim().length > 0) {
      dispatch(userActions.setUsername(username));
      setEmailModalVisible(true);
      dispatch(userActions.logUser());
    }
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
        <ReturnBtn method={() => navigation.navigate("Welcome")} />

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
            value={username}
            method={getUsername}
          />
          <SecondaryBtn
            title={"CONTINUE!"}
            textStyle
            onPress={handleUsername}
          />
        </View>
        <RegisterEmailModal
          visible={emailModalVisible}
          username={username}
          hideEmailModal={showEmailModal}
        />
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
  },
  input: {
    marginTop: 36,
  },
});

export default SignUpScreen;
