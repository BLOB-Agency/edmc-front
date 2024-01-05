import React, {Fragment, useState} from "react";
import withSequentialModals from "../../components/withSequentialModals";
import RegisterUsernameModal from "./modals/RegisterUsernameModal";
import RegisterEmailModal from "./modals/RegisterEmailModal";
import RegisterPasswordModal from "./modals/RegisterPasswordModal";
import VerifyEmailCode from "./modals/RegisterVerifyEmailCode";
import RegisterCheckEmailModal from "./modals/RegisterCheckEmailModal";

const Modals = withSequentialModals([
    RegisterUsernameModal,
    RegisterEmailModal,
    RegisterPasswordModal,
    RegisterCheckEmailModal,
    VerifyEmailCode
]);

export default function () {

    return (
        <Modals></Modals>
    )
}