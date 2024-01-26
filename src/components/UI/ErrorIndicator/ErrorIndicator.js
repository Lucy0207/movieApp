import React from "react";
import { Alert, Space } from 'antd';

import "./ErrorIndicator.css";

const onClose = (e) => {
    console.log(e, 'I was closed.');
};
const ErrorIndicator = () => (
    <Space
        direction="vertical"
        style={{
            width: '100%',
        }}
    >
       {/* <Alert
            message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
            type="warning"
            closable
            onClose={onClose}
        />*/}
        <Alert
            message="Oooops, we're soooo sorry"
            description="An error has occurred but we're trying to fix it. Bear with us"
            type="error"
            closable
            onClose={onClose}
        />
    </Space>
);
export default ErrorIndicator;