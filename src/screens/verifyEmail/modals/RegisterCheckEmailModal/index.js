import React, {useEffect, useState} from "react";
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import styles from "./styles";
import PrimaryBtn from "@components/PrimaryBtn";
import resendCode from "@utils/resendCode";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Background from "@components/auth/bg"
import ReturnBtn from "@components/ReturnBtn";
import {authStyles} from "@components/auth/styles";

const CheckEmailModal = ({goNext, goPrevious}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const userData = useSelector((state) => state.user);
  const handleResendCode = () => {
    stopTimer();

    resendCode(userData.email).then(() => {
      console.info("Resent code");
    }).catch((err) => {
        console.error(err);
    }).finally(startTimer);
  };

  const goToNextScreen = () => {
    stopTimer();
    goNext();
  }

  const openEmailApp = async () => {
    stopTimer();
    
    Linking
        .canOpenURL("mailto:")
        .then((supported) => {
          if (!supported) {
                        } else {
              return Linking.openURL("mailto:");
          }
        })
        .catch((err) =>
            console.error("An error occurred", err)
        ).finally(() => {
      goToNextScreen(); });
  };

  const stopTimer = () => clearTimeout(timeoutId);
  const startTimer = () => {
    const id = setTimeout(goToNextScreen, 20_000);
    setTimeoutId(id);
  };

  useEffect(() => {
    startTimer();

    return stopTimer;
  }, []);

  return (

  <Background>
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <View></View>


        <View style={{flex: 1, justifyContent: "center", gap: 24}}>
          <View style={styles.background}>
            <BlurView style={styles.blurView} tint="light" intensity={20} />

            <View style={styles.containerMain}>
              <View style={styles.containerText}>
                <Text style={authStyles.title}>Check your email</Text>
                <Text style={authStyles.subtitle}>
                  We’ve sent you instructions on how to verify your email.
                </Text>
              </View>
              <Image
                  source={require("@assets/icons/send-email-icon.png")}
                  style={{ width: 96, height: 96, paddingVertical: -72, alignSelf: "center" }}
              />
              <PrimaryBtn onPress={openEmailApp} title={"OPEN YOUR E-MAIL"} />
            </View>
          </View>

          <TouchableOpacity onPress={goToNextScreen}>
            <Text style={styles.skip}>I have the code. Continue.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerResendCode}>
          <Text style={{ color: "#fff" }}>Don't have a code?</Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.sendCodeLink}>Resend now</Text>
          </TouchableOpacity>
        </View>
      </View>

  </Background>

  );
};

export default CheckEmailModal;
