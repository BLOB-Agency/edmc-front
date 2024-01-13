import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
import verifyCode from "@utils/verifyCode";
import { authActions } from "@store/authSlice";
import Background from "@components/auth/bg"
import {authStyles} from "@components/auth/styles";
const VerifyEmailCode = ({goNext, goPrevious}) => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputRefs = [];

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0) {
      // If Backspace key is pressed and not the first input
      inputRefs[index - 1].focus(); // Move focus to the previous input
    } else if (key !== "Backspace" && index < inputRefs.length - 1) {
      // If a number key is pressed and not the last input
      inputRefs[index + 1].focus(); // Move focus to the next input
    }
  };
  const handleInputChange = async (text, index) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);

  };
  useEffect(() => {
    if (verificationCode.join("").length === 4) {
      console.log("userEmail: ", props.userData.email);
      const verificationCodeString = verificationCode.join("");

      // Call verifyCode and update the token state
      verifyCode(verificationCodeString, props.userData.email)
        .then((datas) => {
          // Dispatch the token to the store
          console.log("datas: ", datas);  
          dispatch(authActions.setToken(datas.token));
          if (datas.token) {
            dispatch(authActions.setIsLoggedIn(true));
            dispatch(authActions.setId(datas.id));
            dispatch(authActions.getStatus());

            closeAllModals();
            props.method();
            // Let's navigate to the next screen without the navigation prop
          }
        })
        .catch((error) => {
          console.error("Error in checkCode:", error);
        });
    }
  }, [verificationCode]);

  return (

      <Background>

          <View style={styles.containerMain}>
            <View style={styles.containerText}>
              <View>
                <Text style={authStyles.title}>Verify your email</Text>
                <Text style={authStyles.subtitle}>
                  Enter the code we sent to your e-mail adress
                </Text>
              </View>
              <View style={styles.containerDigitInput}>
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs[index] = ref)} // Assign a ref to each TextInput
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    style={styles.digitInput}
                    onChangeText={(text) => handleInputChange(text, index)}
                    maxLength={1} // Allow only one character input
                    onKeyPress={({ nativeEvent: { key } }) =>
                      handleKeyPress(index, key)
                    }
                  />
                ))}
              </View>
            </View>
          </View>
      </Background>
    
  );
};

export default VerifyEmailCode;
