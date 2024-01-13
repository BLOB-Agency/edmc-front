import VerifyEmailCode from "./modals/RegisterVerifyEmailCode";
import RegisterCheckEmailModal from "./modals/RegisterCheckEmailModal";
import withSequentialModals from "@components/withSequentialModals";


const Modals = withSequentialModals([
    RegisterCheckEmailModal,
    VerifyEmailCode,
]);

export default function () {

    return (
        <Modals></Modals>
    )
}

