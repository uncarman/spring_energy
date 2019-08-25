package com.energy.entity;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/25.
 */
public class EnergyData {

    private Integer id;
    private Integer itemId;
    private float indication;
    private float diffIndication;
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

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public float getIndication() {
        return indication;
    }

    public void setIndication(float indication) {
        this.indication = indication;
    }

    public float getDiffIndication() {
        return diffIndication;
    }

    public void setDiffIndication(float realIndication) {
        this.diffIndication = realIndication;
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
        return "EnergyData{" +
                "id=" + id +
                ", itemId=" + itemId +
                ", indication=" + indication +
                ", diffIndication=" + diffIndication +
                ", otherData='" + otherData + '\'' +
                ", recordedAt=" + recordedAt +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
