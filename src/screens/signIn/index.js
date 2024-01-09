import withSequentialModals from "@components/withSequentialModals";
import LoginEmailModal from "@screens/signIn/LoginEmailModal";
import LoginPasswordModal from "@screens/signIn/LoginPasswordModal";

const Modals = withSequentialModals([
    LoginEmailModal,
    LoginPasswordModal,
]);

export default function () {

    return (
        <Modals></Modals>
    )
}