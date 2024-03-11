import React from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";
import styles from "./styles";
import {genericStyles} from "@components/auth/styles";

const PrimaryInput = ({
  label,
  extraStyle,
  icon,
  method,
  value,
  placeholder,
  errorMessage,
  isPassword,
    disabled,
    tallField = false
}) => {
  return (
    <View style={[styles.container, extraStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
          style={[
            styles.inputContainer,
            errorMessage ? styles.inputError : null,
            disabled ? styles.disabledInputContainer : null, // Apply disabled styling if needed
          ]}
      >
        {icon && <Image source={icon} style={[{ width: 18, height: 18 }, {marginTop: tallField ? 6: 0}]} />}
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder={placeholder}
          style={[
            styles.input,
            tallField ? {height: 100} : {},
            disabled ? styles.disabledInput : null, // Apply disabled input styling
          ]}
          multiline={tallField}
          value={value}
          onChangeText={method}
          {...(isPassword && {
            passwordRules:
              "required: upper; required: lower; required: digit; required: [-]; minlength: 8;",
          })}
          editable={!disabled}
          {...(isPassword && { secureTextEntry: true })}
        />
      </View>

      {errorMessage && <Text style={{...genericStyles.errorText, marginTop:6, marginLeft: 12}}>{errorMessage}</Text>}
    </View>
  );
};

export default PrimaryInput;
