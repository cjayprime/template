import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { SEND_SMS } from 'graphql/mutations/SMS/sendSms'; 
const compose = require('lodash').flowRight

const sendMessage = (WrappedComponent) => {
    const sendMessage = ({ sendSms, ...props }) => {
        return (
            <WrappedComponent sendSms={sendSms} {...props} />
        )
    }
    const sendMessagePG = graphql(SEND_SMS, {
        name: 'sendSms'
    }) 

    return compose(sendMessagePG)(sendMessage)
} 

export default sendMessage;

