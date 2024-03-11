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



export default function ({visible, onClose}) {
    const trackEvent = useTrackEvent();
    const [initialColor, setInitialColor] = useState(false)
    const [currentColor, setCurrentColor] = useState(false)
    const { color } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentColor(color)
        setInitialColor(color)
    }, []);

    const onSubmit = () => {
        dispatch(saveColor(currentColor))

        trackEvent(TrackableEvents.Ui.ChangeColor, {
            initialColor,
            newColor: currentColor
        })

        onClose();
    }

    const closeNonSave = () => {
        dispatch(userActions.setColor(initialColor));
        onClose()
    }

    const handleColorSelection = (color) => {
        setCurrentColor(color);
        dispatch(userActions.setColor(color));

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

                            <Image source={require('@assets/icons/close-icon.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                Pick a color
                            </Text>

                            <Text style={styles.subtitle}>
                                Change the look of your EDMC.
                            </Text>
                        </View>
                    </View>

                   <View style={styles.colorPickerContainer}>
                       <View style={[styles.currentColor, {backgroundColor: color}]}></View>

                       <FlatList
                           data={config.COLORS}
                           style={styles.colorsContainer}
                           contentContainerStyle={{
                               justifyContent: "space-between",
                               alignItems: "center",
                           }}
                           numColumns={6}
                           renderItem={(color) => {
                               return (
                                   <TouchableOpacity
                                        key={color.item.name}
                                        style={[styles.smallColor, {
                                            borderWidth: currentColor === color.item.colorCode ? 3 : 0,
                                            borderColor: color.item.colorCode,
                                            backgroundColor: currentColor === color.item.colorCode ? "transparent" : color.item.colorCode
                                        }]}
                                        onPress={() => {
                                            handleColorSelection(color.item.colorCode);
                                        }}
                                    />
                               )
                           }}
                       />

                   </View>

                    <PrimaryBtn
                        title={"SAVE"}
                        onPress={onSubmit}
                        disabled={false}
                    />
                </View>
            </View>
        </Modal>
    );
}