package com.energy.entity;

import lombok.Data;

import java.util.Date;

@Data
public class HouseHold {

    private int id;
    private int buildingId;
    private String name;
    private String alias;
    private String notes;
    private String photo;
    private String itemIds;
    private Date createdAt;
    private Date updatedAt;

}
