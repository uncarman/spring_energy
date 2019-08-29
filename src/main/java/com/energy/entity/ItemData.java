package com.energy.entity;

import lombok.Data;

import java.util.Date;

@Data
public class ItemData {

    private Integer id;
    private Integer itemId;
    private float indication;
    private String otherData;
    private Date updatedAt;

}
