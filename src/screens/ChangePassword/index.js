import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import {BlurView} from "expo-blur";
import {styles} from "./styles"
import PrimaryInput from "@components/PrimaryInput";
import passwordIcon from "@assets/icons/lock-icon.png";
import {useEffect, useState} from "react";
import PrimaryBtn from "@components/PrimaryBtn";
import IconButton from "@components/IconButton";
export default function ({visible, onClose}) {
    const [canSubmit, setCanSubmit] = useState(false);

    /// --- Current password --- \\\
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState(null);

    const onCurrentPasswordChange = (password) => {
        setCurrentPassword(password)
    }

    /// --- New password --- \\\
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(null);

    const onNewPasswordChange = (password) => {
        setNewPassword(password)
    }

    /// --- New password confirmation --- \\\
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [newPasswordConfirmationError, setNewPasswordConfirmationError] = useState(null);

    const onNewPasswordConfirmationChange = (password) => {
        setNewPasswordConfirmation(password)
    }

    /// --- Submit --- \\\
    const onSubmit = () => {
        if (validateInputs()) {

        }
    }


    const validateInputs = () => {
        let isValid = true;

        // Example validations
        if (!currentPassword || currentPassword.length < 6) {
            setCurrentPasswordError("Current password is too short.");
            isValid = false;
        } else {
            setCurrentPasswordError(null);
        }

        if (!newPassword || newPassword.length < 6) {
            setNewPasswordError("New password is too short.");
            isValid = false;
        } else {
            setNewPasswordError(null);
        }

        if (newPassword !== newPasswordConfirmation) {
            setNewPasswordConfirmationError("Passwords do not match.");
            isValid = false;
        } else {
            setNewPasswordConfirmationError(null);
        }

        return isValid;
    };

    useEffect(() => {
        setCanSubmit(validateInputs());
    }, [currentPassword, newPassword, newPasswordConfirmation]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}

        >
          <View style={styles.container}>
              <BlurView
                  style={styles.blur}
                  tint={"default"}
                  intensity={10}
              />

              <View style={styles.contentContainer}>

                  <View style={styles.topContainer}>
                      <TouchableOpacity onPress={onClose} style={[styles.button]}>

                          <Image source={require('@assets/icons/close-icon.png')} style={styles.icon} />
                      </TouchableOpacity>
                      <View style={styles.titleContainer}>
                          <Text style={styles.title}>
                              Change Password
                          </Text>

                          <Text style={styles.subtitle}>
                              Improve your security!
                          </Text>
                      </View>
                  </View>

                  <View style={styles.inputContainer}>
                      <PrimaryInput
                          label={"Current password"}
                          placeholder={"*******"}
                          icon={passwordIcon}
                          isPassword={true}
                          extraStyle={{...styles.input}}
                          value={currentPassword}
                          method={onCurrentPasswordChange}
                          errorMessage={currentPasswordError}
                      />

                          <PrimaryInput
                              label={"New password"}
                              placeholder={"*******"}
                              icon={passwordIcon}
                              isPassword={true}
                              extraStyle={{...styles.input}}
                              value={newPassword}
                              method={onNewPasswordChange}
                              errorMessage={newPasswordError}
                          />

                          <PrimaryInput
                              label={"Confirm new password"}
                              placeholder={"*******"}
                              icon={passwordIcon}
                              isPassword={true}
                              extraStyle={{...styles.input}}
                              value={newPasswordConfirmation}
                              method={onNewPasswordConfirmationChange}
                              errorMessage={newPasswordConfirmationError}
                          />
                  </View>

                  <PrimaryBtn
                      title={"SAVE NEW PASSWORD"}
                      onPress={onSubmit}
                      disabled={!canSubmit}
                  />
              </View>
          </View>
        </Modal>
    );
}