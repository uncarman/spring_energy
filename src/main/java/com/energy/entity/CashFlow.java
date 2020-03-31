package com.energy.entity;

import lombok.Data;

import java.util.Date;

@Data
public class CashFlow {

    private int id;
    private int operatorId;
    private int itemId;
    private float fee;
    private String event;
    private String source;
    private String orderId;
    private String notes;
    private Date createdAt;
    private Date updatedAt;

}
