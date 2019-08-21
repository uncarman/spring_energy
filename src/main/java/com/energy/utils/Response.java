package com.energy.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/17.
 */
public class Response {

    public Response() {
        this.code = Constant.RES_SUCCESS_CODE;
        this.message = Constant.RES_SUCCESS_MESSAGE;
    }

    public Response(Object data) {
        this.code = Constant.RES_SUCCESS_CODE;
        this.message = Constant.RES_SUCCESS_MESSAGE;
        this.setData(data);
    }

    private Integer code;

    private String message;

    private Object data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void makeSuccess(Object data) {
        this.setCode(Constant.RES_SUCCESS_CODE);
        this.setMessage(Constant.RES_SUCCESS_MESSAGE);
        this.setData(data);
    }

    public void makeFailed(Exception ex) {
        this.setCode(Constant.RES_FAIL_CODE);
        this.setMessage(ex.getMessage());
    }

    public void makeFailed(String errMsg) {
        this.setCode(Constant.RES_FAIL_CODE);
        this.setMessage(errMsg);
    }

    public void makeFailed() {
        this.setCode(Constant.RES_FAIL_CODE);
        this.setMessage(Constant.RES_FAIL_MESSAGE);
        this.setData(null);
    }

    public void superNatural() {
        this.code = Constant.RES_FAIL_CODE;
        this.message = Constant.RES_FAIL_MESSAGE;
    }
}
