import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { BlurView } from "expo-blur";
import { styles } from "./styles"
import PrimaryInput from "@components/PrimaryInput";
import passwordIcon from "@assets/icons/lock-icon.png";
import { useState } from "react";
import PrimaryBtn from "@components/PrimaryBtn";

export default function PasswordChangeModal({ visible, onClose }) {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirmation: ""
    });
    const [errors, setErrors] = useState({
        current: null,
        new: null,
        confirmation: null
    });
    const [touched, setTouched] = useState({
        current: false,
        new: false,
        confirmation: false
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

        if (touchedFields.current && (!passwordsToValidate.current || passwordsToValidate.current.length < 6)) {
            newErrors.current = "Current password is too short.";
            isValid = false;
        }

        if (touchedFields.new && (!passwordsToValidate.new || passwordsToValidate.new.length < 6)) {
            newErrors.new = "New password is too short.";
            isValid = false;
        }

        if (touchedFields.confirmation && passwordsToValidate.new !== passwordsToValidate.confirmation) {
            newErrors.confirmation = "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);
        setCanSubmit(isValid);
    };

    const onSubmit = () => {
        if (validateInputs(passwords, { current: true, new: true, confirmation: true })) {
            // Submit logic here
        }
    };

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
                    <View style={styles.inputContainer}>
                        {renderInput("Current password", "current")}
                        {renderInput("New password", "new")}
                        {renderInput("Confirm new password", "confirmation")}
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
