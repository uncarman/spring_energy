package com.energy.entity;

import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/17.
 */

public class AmmeterData {

    private Integer id;
    private String meterId;
    private Double positiveActivePower;
    private Double reverseActivePower;
    private String otherData;
    private Date recordedAt;
    private Date createdAt;
    private Date updatedAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMeterId() {
        return meterId;
    }

    public void setMeterId(String meterId) {
        this.meterId = meterId;
    }

    public Double getPositiveActivePower() {
        return positiveActivePower;
    }

    public void setPositiveActivePower(Double positiveActivePower) {
        this.positiveActivePower = positiveActivePower;
    }

    public Double getReverseActivePower() {
        return reverseActivePower;
    }

    public void setReverseActivePower(Double reverseActivePower) {
        this.reverseActivePower = reverseActivePower;
    }

    public String getOtherData() {
        return otherData;
    }

    public void setOtherData(String otherData) {
        this.otherData = otherData;
    }

    public Date getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(Date recordedAt) {
        this.recordedAt = recordedAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "AmmeterData{" +
                "id=" + id +
                ", meterId='" + meterId + '\'' +
                ", positiveActivePower=" + positiveActivePower +
                ", reverseActivePower=" + reverseActivePower +
                ", otherData='" + otherData + '\'' +
                ", recordedAt=" + recordedAt +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
