package com.energy.mapper;

import com.energy.entity.User;
import org.apache.ibatis.annotations.Param;

/**
 * Created by Administrator on 2019/8/21.
 */


public interface UsersMapper {

    public User findByUserNameAndPassword(@Param("userName")String userName, @Param("password")String password);
    //public void updateUserToken(Integer userId, String newToken);

}
