import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { BlurView } from "expo-blur";
import { styles } from "./styles"
import PrimaryInput from "@components/PrimaryInput";
import passwordIcon from "@assets/icons/lock-icon.png";
import {useEffect, useState} from "react";
import PrimaryBtn from "@components/PrimaryBtn";
import {useChangePasswordMutation} from "@store/api/auth";

export default function PasswordChangeModal({ visible, onClose }) {
    const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();

    const [passwords, setPasswords] = useState({
        current_password_password: "",
        new_password: "",
        confirmation: ""
    });
    const [errors, setErrors] = useState({
        current_password_password: null,
        new_password: null,
        confirmation: null
    });
    const [touched, setTouched] = useState({
        current_password: false,
        new_password: false,
        new_password_confirmation: false
    });
    const [canSubmit, setCanSubmit] = useState(false);

    const handleInputChange = (name, value) => {
        setPasswords(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));
        validateInputs({ ...passwords, [name]: value }, { ...touched, [name]: true });
    };

    const validateInputs = (passwordsToValidate, touchedFields) => {
        let newErrors = {};
        let isValid = true;

        if (touchedFields.current_password && (!passwordsToValidate.current_password || passwordsToValidate.current_password.length < 6)) {
            newErrors.current_password = "current_password password is too short.";
            isValid = false;
        }

        if (touchedFields.new && (!passwordsToValidate.new_password || passwordsToValidate.new_password.length < 6)) {
            newErrors.new_password = "New password is too short.";
            isValid = false;
        }

        if (touchedFields.new_password_confirmation && passwordsToValidate.new_password_confirmation !== passwordsToValidate.new_password_confirmation) {
            newErrors.new_password_confirmation= "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);
        setCanSubmit(isValid);
    };

    const onSubmit = () => {
                if (canSubmit) {
            changePassword(passwords).unwrap()
                .then((payload) => {
                    // Handle success
                                        onClose(); // Close the modal if needed
                })
                .catch((error) => {
                                        // Handle error
                });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const renderInput = (label, name, isPassword = true) => (
        <PrimaryInput
            label={label}
            placeholder={"*******"}
            icon={passwordIcon}
            isPassword={isPassword}
            extraStyle={{ ...styles.input }}
            value={passwords[name]}
            method={(value) => handleInputChange(name, value)}
            errorMessage={touched[name] ? errors[name] : null}
        />
    );

    
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
                            <Text style={styles.title}>Change Password</Text>
                            <Text style={styles.subtitle}>Improve your security!</Text>
                        </View>
                    </View>
                    {isLoading && (
                        <Text>Loading...</Text>
                    )}

                    {isError && (
                        <Text>Something went wrong...</Text>
                    )}

                    {!isLoading && (
                        <View style={styles.inputContainer}>
                        {renderInput("Current Password", "current_password")}
                        {renderInput("New password", "new_password")}
                        {renderInput("Confirm new password", "new_password_confirmation")}
                        </View>
                    )}

                    {!isLoading && (
                    <PrimaryBtn
                        title={"SAVE NEW PASSWORD"}
                        onPress={onSubmit}
                        disabled={!canSubmit} />
                        )}
                    />1

                    {isSuccess && (
                        <Text>Password changed successfully!</Text>
                    )}
                </View>
            </View>
        </Modal>
    );
}
