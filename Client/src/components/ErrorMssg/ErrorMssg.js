import React, { useEffect } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import './ErrorMssg.css';

const ErrorMssg =({ message, closeErrorMssg}) => {

    useEffect(() => {
    });

    const close = () => {
        closeErrorMssg();
    }
    return (
        <p className="error">{message}
        <AiFillCloseCircle className="close-icon" onClick={close} />
        </p>
    )
}

export default ErrorMssg;