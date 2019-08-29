package com.energy.entity;

import lombok.Data;


@Data
public class Item {

    private Integer id;
    private Integer collectorId;
    private Integer itemType;
    private String code;
    private String name;
    private String description;
    private Integer dataType;
    private String dataUnit;
    private Double coefficient;
    private Integer maxValue;
    private Integer state;

}
