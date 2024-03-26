import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { verifyEmail } from '@store/authSlice';
import Background from '@components/auth/bg';
import  { authStyles, genericStyles } from '@components/auth/styles';

import styles from './styles';
import {userActions} from "@store/userSlice";
import {useResendPasswordCodeMutation} from "@store/api/user";
const initialCode = ['', '', '', ''];

const useKeyPressHandler = (inputRefs, setVerificationCode) => {
  return useCallback((index, key) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (key !== 'Backspace' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }, [inputRefs]);
};

const DigitInput = React.forwardRef(({ index, onChange, onKeyPress }, ref) => (
    <TextInput
        ref={ref}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        style={styles.digitInput}
        maxLength={1}
        onChangeText={onChange}
        onKeyPress={onKeyPress}
    />
));

const VerifyEmailCode = ({ goNext, navigation, goPrevious }) => {
  const [verificationCode, setVerificationCode] = useState(initialCode);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const user = useSelector((state) => state.user);
  const [stateError, setStateError] = useState(null);
  const [resendPasswordCode, { isLoading, isError, error }] = useResendPasswordCodeMutation();

  const handleInputChange = useCallback(
      (text, index) => {
        const newCode = [...verificationCode];
        newCode[index] = text;
        setVerificationCode(newCode);
        setStateError(null);
      },
      [verificationCode]
  );

  const handleKeyPress = useKeyPressHandler(inputRefs, setVerificationCode);

  useEffect(() => {
    if (verificationCode.join('').length === 4) {
      const verificationCodeString = verificationCode.join('');
      dispatch(verifyEmail({ email: user.email, code: verificationCodeString }))
          .unwrap()
          .then(async ({ user }) => {
            dispatch(userActions.setUser(user));
            goNext();
          })
          .catch((err) => setStateError(err.message || ''));
    }
  }, [verificationCode, dispatch, user.email, goNext]);

    const handleResendCode = () => {
        resendPasswordCode(user.email)
            .then(() => {
                // Show alert when email is successfully resent
                Alert.alert(
                    'Code Resent',
                    'A new verification code has been sent to your email.',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                            style: 'default',
                        },
                    ],
                    { cancelable: false }
                );
            })
            .catch((err) => {
                console.error(err);
            });
    };

  return (
      <Background>
        <View style={styles.containerMain}>
          <View style={styles.containerText}>
            <View>
              <Text style={authStyles.title}>Verify your email</Text>
              <Text style={authStyles.subtitle}>
                Enter the code we sent to your e-mail address
              </Text>
            </View>
            <View style={styles.containerDigitInput}>
              {initialCode.map((_, index) => (
                  <DigitInput
                      key={index}
                      index={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(text) => handleInputChange(text, index)}
                      onKeyPress={({ nativeEvent: { key } }) =>
                          handleKeyPress(index, key)
                      }
                  />
              ))}
            </View>
            {stateError && (
                <Text style={[genericStyles.errorText, { marginTop: 16, textAlign: 'center' }]}>
                  {stateError}
                </Text>
            )}

              <View style={styles.containerResendCode}>
                  <Text style={{ color: "#fff" }}>Don't have a code?</Text>
                  <TouchableOpacity onPress={handleResendCode}>
                      <Text style={styles.sendCodeLink}>Resend now</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      </Background>
  );
};

export default VerifyEmailCode;
