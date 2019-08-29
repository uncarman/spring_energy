package com.energy.entity;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/28.
 */

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Integer buildingIdbuildingId) {
        this.buildingId = buildingId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPlanType() {
        return planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
    }

    public Date getPlanDate() {
        return planDate;
    }

    public void setPlanDate(Date planDate) {
        this.planDate = planDate;
    }

    public float getPlanVal() {
        return planVal;
    }

    public void setPlanVal(float planVal) {
        this.planVal = planVal;
    }

    public float getPlanValAvg() {
        return planValAvg;
    }

    public void setPlanValAvg(float planValAvg) {
        this.planValAvg = planValAvg;
    }

    public String getPlanMethod() {
        return planMethod;
    }

    public void setPlanMethod(String planMethod) {
        this.planMethod = planMethod;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "EnergyPlan{" +
                "id=" + id +
                "buildingId=" + buildingId +
                ", type='" + type + '\'' +
                ", planType='" + planType + '\'' +
                ", plantDate=" + planDate +
                ", plantVal=" + planVal +
                ", plantValAvg=" + planValAvg +
                ", plantMethod='" + planMethod + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
