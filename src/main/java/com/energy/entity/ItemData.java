package com.energy.entity;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/25.
 */
public class ItemData {

    private Integer id;
    private Integer itemId;
    private float indication;
    private String otherData;
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

    public String getOtherData() {
        return otherData;
    }

    public void setOtherData(String otherData) {
        this.otherData = otherData;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "ItemData{" +
                "id=" + id +
                ", itemId=" + itemId +
                ", indication=" + indication +
                ", otherData='" + otherData + '\'' +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
