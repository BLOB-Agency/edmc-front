import {View, Text, Modal, TouchableOpacity, Image} from "react-native";
import {styles} from "./styles";
import {BlurView} from "expo-blur";
import PrimaryBtn from "@components/PrimaryBtn";
import PrimaryInput from "@components/PrimaryInput";
import passwordIcon from "@assets/icons/lock-icon.png";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useCreateArtistProfileMutation} from "@store/api/artist";
import userIcon from "@assets/icons/user-icon.png";

export default function CreateArtistProfile({ visible, onClose, onSubmit}) {
    const [createArtistProfile, { isLoading, data, error }] = useCreateArtistProfileMutation();


    const realUsername = useSelector((state) => state.user.username);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        setUsername(realUsername);
    }, [realUsername]);

    const submit = async () => {
        try {
            await createArtistProfile({name: username, bio}).unwrap().then(() => {
                onSubmit();

            });
        } catch (e) {
                    }
    }
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
                            <Text style={styles.title}>Sign up as an artist</Text>
                            <Text style={styles.subtitle}>Create your EDMC-network artist profile</Text>
                        </View>
                    </View>
                    <View>
                        <PrimaryInput
                            label={"Artist username"}
                            placeholder={"Username"}
                            icon={userIcon}
                            isPassword={false}
                            extraStyle={{ ...styles.input }}
                            value={username}
                            method={setUsername}
                            errorMessage={null}
                        />

                        <PrimaryInput
                            tallField={true}
                            label={"Biography"}
                            placeholder={"Fill in your bio"}
                            icon={null}
                            isPassword={false}
                            extraStyle={{ ...styles.input }}
                            value={bio}
                            method={setBio}
                            errorMessage={null}
                        />
                    </View>

                    <PrimaryBtn
                        title={"CREATE PROFILE"}
                        onPress={submit}
                        disabled={false}
                    />
                </View>
            </View>
        </Modal>
    );
}