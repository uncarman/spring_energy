package com.energy.entity;

import lombok.Data;


@Data
public class ItemGroup {

    private Integer id;
    private String code;
    private String type;
    private String name;
    private Integer parent;
    private String note;
    private float area;
    private Integer building_id;

}
