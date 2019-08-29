package com.energy.entity;

import lombok.Data;

import java.util.Date;

@Data
public class User {

    private Integer id;
    private String name;
    private String email;
    private String password;
    private String photoUrl;
    private String rememberToken;
    private Date createdAt;
    private Date updatedAt;

}
