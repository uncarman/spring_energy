package com.energy.entity;

import lombok.Data;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/17.
 */

@Data
public class Building {

    private Integer id;
    private String code;                // 建筑编码
    private String name;
    private String type;                // 建筑类型
    private String province;
    private String city;
    private String address;             // 建筑地址
    private Date buildYear;           // 建筑年代
    private int floorNum;            // 建筑层数
    private float area;                 // 建筑面积
    private float refrigerationArea;    // 冷却面积
    private float heatingArea;          // 采暖面积
    private float heating_area;         // 采暖面积
    private String airConditioning;     // 空调系统形式
    private String heating;             // 采暖系统形式
    private String coefficient;         // 建筑体型系数
    private String ratio;               // 窗墙面积比
    private String structure;           // 建筑结构形式
    private String wallMaterial;        // 建筑外墙形式
    private String wallWarm;            // 建筑外墙保温形式
    private String window;              // 建筑外窗类型
    private String glass;               // 建筑玻璃类型
    private String windowFrame;         // 窗框材料类型
    private float latitude;             // 纬度
    private float longitude;            // 经度
    private String owner;               // 建筑业主
    private String intro;               // 建筑简介
    private String photoUrl;            // 建筑照片路径
    private Date insertDate;            // 接入日期
    private int monitoring;             // 建筑监测状态(0:监测中;1:未监测)

}
