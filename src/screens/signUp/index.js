import React, {Fragment, useState} from "react";
import withSequentialModals from "../../components/withSequentialModals";
import RegisterUsernameModal from "./modals/RegisterUsernameModal";
import RegisterEmailModal from "./modals/RegisterEmailModal";
import RegisterPasswordModal from "./modals/RegisterPasswordModal";


export default function ({navigation}) {

    const Modals = withSequentialModals([
        RegisterUsernameModal,
        RegisterEmailModal,
        RegisterPasswordModal,
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

