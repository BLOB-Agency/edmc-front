import React, { useState, useEffect, useRef } from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput, Animated, StyleSheet, Image} from 'react-native';
import { BlurView } from "expo-blur";
import styles, {popupStyles, reportStyles} from "@screens/player/styles";
import PrimaryBtn from "@components/PrimaryBtn";
import PrimaryInput from "@components/PrimaryInput";

const ReportModal = ({ isVisible, onClose, onSubmit }) => {
    const [reportReason, setReportReason] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 1 : 0,
                duration: 500,
                useNativeDriver: true,
            }
        ).start();
    }, [isVisible, fadeAnim]);

    const handleOnSubmit = () => {
        onSubmit(reportReason);
        setReportReason('');
        onClose();
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <BlurView style={[styles.blurView, {
                paddingHorizontal: 24
            }]} tint="dark" intensity={20}>
                <Animated.View style={[reportStyles.reportModalContent, { opacity: fadeAnim }]}>
                    <View style={reportStyles.topContainer}>

                        <Text style={reportStyles.title}>
                            Submit a report
                        </Text>

                        <TouchableOpacity style={[popupStyles.closeButton, reportStyles.closeButton]} onPress={onClose}>
                            <Image style={popupStyles.closeButtonImage} source={require("@assets/icons/close-icon.png")}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={reportStyles.description}>
                        If this song contains inappropriate content or violates our community standards, please let us know. Briefly describe the issue below.
                    </Text>
                    <PrimaryInput
                        value={reportReason}
                        method={setReportReason}
                        label={"Reason"}
                        placeholder={"Reason for reporting"}

                    />
                    <PrimaryBtn
                        disabled={reportReason.trim().length <= 5}
                        title={"Submit report"}
                    />
                </Animated.View>
            </BlurView>
        </Modal>
    );
};


export default ReportModal;
