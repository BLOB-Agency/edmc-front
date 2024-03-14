import React from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import {BlurView} from "expo-blur";
import {styles} from "./styles"
import PrimaryInput from "@components/PrimaryInput";
import {useDispatch, useSelector} from "react-redux";
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";
import PrimaryBtn from "@components/PrimaryBtn";
import * as ImagePicker from 'expo-image-picker';
import {useUpdateProfilePictureMutation} from "@store/api/user";
import FastImage from "react-native-fast-image";

const emailIcon = require("@assets/icons/email-icon.png");

export default function ({visible, onClose}) {
    const trackEvent = useTrackEvent();

    const [updateProfilePicture] = useUpdateProfilePictureMutation();

    const handleImageUpload = async (imageUri) => {
        try {
            const response = await updateProfilePicture({ base64_profile_photo: imageUri }).unwrap(); // Assuming your backend expects a property named base64_profile_photo
            console.log('Image uploaded successfully:', response);
            onClose(); // For example, closing the modal upon successful upload
        } catch (err) {
            console.error('Error uploading image:', err);
            // Handle upload error, e.g., by showing an error message
        }
    };

    const processImageResult = async (result) => {
        if (!result.canceled) {
            await handleImageUpload(result.assets[0].base64); // or result.base64 if using base64
        }
    };

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return false;
        }
        return true;
    };
    const useCamera = async () => {
        const hasPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (!hasPermission.granted) {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true, // If you plan to use base64, otherwise handle the URI
        });

        await processImageResult(result);
    };

    const useLibrary = async () => {
        const hasPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!hasPermission.granted) {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true, // Same here for base64
        });

        await processImageResult(result);
    };

    const closeNonSave = () => {
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeNonSave}
        >
            <View style={styles.container}>
                <BlurView
                    style={styles.blur}
                    tint={"default"}
                    intensity={10}
                />

                <View style={styles.contentContainer}>

                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={closeNonSave} style={[styles.button]}>
                            <FastImage source={require('@assets/icons/close-icon.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                Set a new photo
                            </Text>
                        </View>
                    </View>

                    <View style={{display: "flex", gap: 12}}>
                        <PrimaryBtn
                            title={"Choose from library"}
                            onPress={useLibrary}
                        />

                        <PrimaryBtn
                            title={"Use camera"}
                            onPress={useCamera}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    );
}
