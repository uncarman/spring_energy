package com.energy.entity;

import lombok.Data;

import java.util.Date;


@Data
public class EnergyData {

    private Integer id;
    private Integer itemId;
    private float indication;
    private float diffIndication;
    private String otherData;
    private Date recordedAt;
    private Date createdAt;
    private Date updatedAt;

}
