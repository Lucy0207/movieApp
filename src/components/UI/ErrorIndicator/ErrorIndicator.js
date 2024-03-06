import React from "react";
import { Alert, Space } from 'antd';

import "./ErrorIndicator.css";

const onClose = (e) => {
    console.log(e, 'I was closed.');
};
const ErrorIndicator = ({description}) => (
    <Space
        direction="vertical"
        style={{
            width: '100%',
        }}
    >

        <Alert

            description={description}
            type="error"
            closable
            onClose={onClose}
        />
    </Space>
);
export default ErrorIndicator;