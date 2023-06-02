import React, { useEffect } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import './SuccessMssg.css';

const SuccessMssg =({ message, closeSuccessMssg}) => {

    const close = () => {
        closeSuccessMssg();
    }
    return (
        <p className="success">{message}
        <AiFillCloseCircle className="close-icon-success" onClick={close} />
        </p>
    )
}

export default SuccessMssg;