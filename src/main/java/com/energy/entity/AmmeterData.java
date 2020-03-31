package com.energy.entity;

import lombok.Data;

import java.util.Date;

@Data
public class AmmeterData {
    private int id;
    private int itemId;

    // 记录当前的实际值
    private float activeEnergy;
    private float jianEnergy;
    private float fengEnergy;
    private float pingEnergy;
    private float guEnergy;

    // 记录和最近一次记录的差值
    private float diffActiveEnergy;
    private float diffJianEnergy;
    private float diffFengEnergy;
    private float diffPingEnergy;
    private float diffGuEnergy;

    // 根据diff计算后的费用
    private float activeFee;
    private float jianFee;
    private float fengFee;
    private float pingFee;
    private float guFee;

    // 剩余费用--表上的读数
    private float remaindFee;

    private Date recordedAt;
    private Date createdAt;

}
