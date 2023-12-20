import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import styles from "./styles";

const PrimaryInput = ({
  label,
  extraStyle,
  icon,
  method,
  value,
  placeholder,
  errorMessage,
  isPassword,
}) => {
  return (
    <View style={[styles.container, extraStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.inputContainer, errorMessage ? styles.inputError : null]}
      >
        {icon && <Image source={icon} style={{ width: 24, height: 24 }} />}
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder={placeholder}
          style={[styles.input]}
          value={value}
          onChangeText={method}
          {...(isPassword && {
            passwordRules:
              "required: upper; required: lower; required: digit; required: [-]; minlength: 8;",
          })}
          {...(isPassword && { secureTextEntry: true })}
        />
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default PrimaryInput;
