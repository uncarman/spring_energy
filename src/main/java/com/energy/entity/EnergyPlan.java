package com.energy.entity;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/28.
 */

public class EnergyPlan {

    private Integer id;
    private String type;     // 能耗类型
    private String planType;  // 计划类型 周末/节假日/普通
    private Date plantDate; // 计划日期
    private float plantVal;  // 计划值
    private float plantValAvg;
    private String plantMethod;
    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Date getPlantDate() {
        return plantDate;
    }

    public void setPlantDate(Date plantDate) {
        this.plantDate = plantDate;
    }

    public float getPlantVal() {
        return plantVal;
    }

    public void setPlantVal(float plantVal) {
        this.plantVal = plantVal;
    }

    public float getPlantValAvg() {
        return plantValAvg;
    }

    public void setPlantValAvg(float plantValAvg) {
        this.plantValAvg = plantValAvg;
    }

    public String getPlantMethod() {
        return plantMethod;
    }

    public void setPlantMethod(String plantMethod) {
        this.plantMethod = plantMethod;
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
                ", type='" + type + '\'' +
                ", planType='" + planType + '\'' +
                ", plantDate=" + plantDate +
                ", plantVal=" + plantVal +
                ", plantValAvg=" + plantValAvg +
                ", plantMethod='" + plantMethod + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
