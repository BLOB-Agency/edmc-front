import {View, Text, Modal, TouchableOpacity, Image} from "react-native";
import {styles} from "./styles";
import {BlurView} from "expo-blur";
import PrimaryBtn from "@components/PrimaryBtn";

export default function SignOut({ visible, onClose, onSubmit}) {
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
                            <Text style={styles.title}>Log out</Text>
                            <Text style={styles.subtitle}>Are you sure you want to sign out of your accout?</Text>
                        </View>
                    </View>
                    <PrimaryBtn
                        title={"SIGN OUT"}
                        onPress={onSubmit}
                        disabled={false}
                    />
                </View>
            </View>
        </Modal>
    );
}