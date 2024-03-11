import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import {BlurView} from "expo-blur";
import {styles} from "./styles"
import PrimaryInput from "@components/PrimaryInput";
import passwordIcon from "@assets/icons/lock-icon.png";
import {useEffect, useState} from "react";
import SecondaryBtn from "@components/SecondaryBtn";
import PrimaryBtn from "@components/PrimaryBtn";
import IconButton from "@components/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {FlatList} from "react-native-gesture-handler";
import {saveColor, userActions} from "@store/userSlice";
import config from "../../../config";
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";

const emailIcon = require("@assets/icons/email-icon.png");


export default function ({visible, onClose}) {
    const trackEvent = useTrackEvent();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const onSubmit = () => {


        onClose();
    }

    const closeNonSave = () => {
        onClose()
    }

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

                            <Image source={require('@assets/icons/close-icon.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                My Account
                            </Text>
                        </View>
                    </View>


                    <View>
                        <PrimaryInput
                            disabled={true}
                            label={"Email address"}
                            value={user.email}
                            icon={emailIcon}
                        />

                    </View>

                </View>
            </View>
        </Modal>
    );
}