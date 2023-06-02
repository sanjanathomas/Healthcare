package com.jnit.healthcare.exception;

import org.springframework.stereotype.Component;

public class BussinessException extends Exception {

    public static final long serialVersionUID = 1;

    private Integer errorCode;

    public BussinessException() {
    }

    public BussinessException(String message) {
        super(message);
    }

    public BussinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public BussinessException(Throwable cause) {
        super(cause);
    }

    public BussinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
