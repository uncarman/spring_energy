package com.energy.entity;

import java.util.Date;

/**
 * Created by Administrator on 2019/8/19.
 */
public class ItemGroup {

    private Integer id;
    private String code;
    private String type;
    private String name;
    private Integer parent;
    private String note;
    private float area;
    private Integer building_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParent() {
        return parent;
    }

    public void setParent(Integer parent) {
        this.parent = parent;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public float getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public Integer getBuilding_id() {
        return building_id;
    }

    public void setBuilding_id(Integer building_id) {
        this.building_id = building_id;
    }

    @Override
    public String toString() {
        return "ItemGroup{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", parent=" + parent +
                ", note='" + note + '\'' +
                ", area=" + area +
                ", building_id=" + building_id +
                '}';
    }
}
