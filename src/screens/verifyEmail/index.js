import VerifyEmailCode from "./modals/RegisterVerifyEmailCode";
import RegisterCheckEmailModal from "./modals/RegisterCheckEmailModal";
import withSequentialModals from "@components/withSequentialModals";
import ColorPicker from "@screens/verifyEmail/modals/ColorPicker";



export default function ({navigation}) {
    const Modals = withSequentialModals([
        RegisterCheckEmailModal,
        VerifyEmailCode,
        ColorPicker
    ], navigation, {
        onLastModalNext: () => {
            navigation.navigate('UserTabs');
        }
    });

    return (
        <Modals></Modals>
    )
}

