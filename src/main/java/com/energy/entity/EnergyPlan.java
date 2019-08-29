package com.energy.entity;

import lombok.Data;

import java.util.Date;


@Data
public class EnergyPlan {

    private Integer id;
    private Integer buildingId;
    private String type;     // 能耗类型
    private String planType;  // 计划类型 周末/节假日/普通
    private Date planDate; // 计划日期
    private float planVal;  // 计划值
    private float planValAvg;
    private String planMethod;
    private String note;

}
