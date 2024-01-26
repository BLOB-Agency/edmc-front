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

const colors = [
    { name: "Purple", colorCode: "#BB61C9" },
    { name: "Lila", colorCode: "#8083FF" },
    { name: "Salmon", colorCode: "#FB6376" },
    { name: "Cream", colorCode: "#FAB3A9" },
    { name: "Electric", colorCode: "#FAB565" },
    { name: "Sunset", colorCode: "#FF715B" },
    { name: "Abyss", colorCode: "#0267C1" },
    { name: "Rock", colorCode: "#6E8894" },
    { name: "Bali", colorCode: "#A9CEC2" },
    { name: "Mekong", colorCode: "#5B9279" },
    { name: "Duck", colorCode: "#0E7C7B" },
    { name: "Pine", colorCode: "#005A34" },
];


export default function ({visible, onClose}) {
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
        onClose();
    }

    const closeNonSave = () => {
        dispatch(userActions.setColor(initialColor));
        onClose()
    }

    const handleColorSelection = (color) => {
        setCurrentColor(color);
        dispatch(userActions.setColor(color));

        console.log("SelectedColor: ", color);
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
                           data={colors}
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