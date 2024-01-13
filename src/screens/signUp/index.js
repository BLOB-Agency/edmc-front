import React, {Fragment, useState} from "react";
import withSequentialModals from "../../components/withSequentialModals";
import RegisterUsernameModal from "./modals/RegisterUsernameModal";
import RegisterEmailModal from "./modals/RegisterEmailModal";
import RegisterPasswordModal from "./modals/RegisterPasswordModal";

const Modals = withSequentialModals([
    RegisterUsernameModal,
    RegisterEmailModal,
    RegisterPasswordModal,
]);

export default function () {
    return (
        <Modals></Modals>
    )
}

