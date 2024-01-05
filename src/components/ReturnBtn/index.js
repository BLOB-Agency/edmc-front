import React from "react";

import IconButton from "@components/IconButton";

const ReturnBtn = ({ method, style }) => <IconButton style={style} onPress={method} src={require("../../../assets/icons/back-icon.png")} />

export default ReturnBtn;
