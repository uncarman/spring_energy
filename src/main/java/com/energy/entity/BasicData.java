package com.energy.entity;

/**
 * Created by Administrator on 2019/8/24.
 */
public class BasicData {

    private Integer id;
    private Integer type;
    private String name;
    private String basicCode;
    private String basicName;
    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBasicCode() {
        return basicCode;
    }

    public void setBasicCode(String basicCode) {
        this.basicCode = basicCode;
    }

    public String getBasicName() {
        return basicName;
    }

    public void setBasicName(String basicName) {
        this.basicName = basicName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "BasicData{" +
                "id=" + id +
                ", type=" + type +
                ", name='" + name + '\'' +
                ", basicCode='" + basicCode + '\'' +
                ", basicName='" + basicName + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
