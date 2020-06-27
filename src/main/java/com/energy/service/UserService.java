package com.energy.service;

import com.energy.entity.Building;
import com.energy.entity.User;
import com.energy.mapper.UsersMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2019/8/21.
 */

@Service("UserService")
public class UserService {

    @Resource
    private UsersMapper usersMapper = null;

    // buildings 相关
    public User findByUserNameAndPassword(String userName, String password) {
        return usersMapper.findByUserNameAndPassword(userName, password);
    }

}
