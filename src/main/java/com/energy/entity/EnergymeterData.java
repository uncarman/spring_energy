package com.energy.entity;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/17.
 */

public class EnergymeterData {

    private Integer id;
    private String meterId;
    private Double indication;
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

    public Double getIndication() {
        return indication;
    }

    public void setIndication(Double indication) {
        this.indication = indication;
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
        return "EnergymeterData{" +
                "id=" + id +
                ", meterId='" + meterId + '\'' +
                ", indication=" + indication +
                ", otherData='" + otherData + '\'' +
                ", recordedAt=" + recordedAt +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
