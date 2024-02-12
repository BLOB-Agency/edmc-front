import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image, Share} from 'react-native';
import {BlurView} from "expo-blur";
import styles, {popupStyles} from "@screens/player/styles";
import {formatNamesWithAnd} from "@utils/helpers";
import ReportModal from "@screens/player/reportModal";

const Popup = ({modalVisible, setModalVisible, track}) => {
    const [reportModalVisible, setReportModalVisible] = useState(false);

    const onShare = async () => {
        try {
            const link = `dropper://track/${track.id}`;
            await Share.share({
                message: `Check out ${track.title} by ${formatNamesWithAnd(track.artists)} on Dropper: ${link}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <BlurView style={popupStyles.blurView} tint="dark" intensity={20}>
                <View style={popupStyles.content}>
                    <View style={popupStyles.topContent}>
                        <View>
                            <Text style={popupStyles.title}>{track.title}</Text>
                            <Text style={popupStyles.artist}>{formatNamesWithAnd(track.artists)}</Text>
                        </View>

                        <TouchableOpacity style={popupStyles.closeButton} onPress={() => setModalVisible(false)}>
                            <Image style={popupStyles.closeButtonImage} source={require("@assets/icons/close-icon.png")}/>
                        </TouchableOpacity>
                    </View>

                    <View style={popupStyles.optionContainer}>
                        <TouchableOpacity style={popupStyles.option}><Text style={popupStyles.optionText}>View the artist</Text></TouchableOpacity>
                        <TouchableOpacity
                            style={popupStyles.option}
                            onPress={onShare}
                        >
                            <Text style={popupStyles.optionText}>Share</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[popupStyles.option, {borderBottomWidth: 0}]}
                            onPress={() => setReportModalVisible(true)}
                        >
                            <Text style={popupStyles.optionText}>Report</Text></TouchableOpacity>
                    </View>
                </View>
            </BlurView>
            <ReportModal
                isVisible={reportModalVisible}
                onClose={() => setReportModalVisible(false)}
                onSubmit={(reason) => {
                    console.log('Reported for reason:', reason);
                    // Handle report submission logic
                }}
            />

        </Modal>
    );
};

export default Popup
