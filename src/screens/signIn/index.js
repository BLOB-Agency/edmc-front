import withSequentialModals from "@components/withSequentialModals";
import LoginEmailModal from "@screens/signIn/LoginEmailModal";
import LoginPasswordModal from "@screens/signIn/LoginPasswordModal";



export default function ({navigation}) {
    const Modals = withSequentialModals([
        LoginEmailModal,
        LoginPasswordModal,
    ],
        navigation,
        {
        onFirstModalBack: () => {
            navigation.goBack();
        }

    });

    return (
        <Modals></Modals>
    )
}