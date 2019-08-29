package com.energy.controller;

import com.energy.entity.User;
import com.energy.service.BuildingService;
import com.energy.service.UserService;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2019/8/21.
 */

@Controller
@RequestMapping("api")
public class UserController {

    @Resource
    private BuildingService buildingService = null;
    @Resource
    private UserService userService = null;

    @RequestMapping("/login")
    @ResponseBody
    public Object findById(@RequestParam("userName") String userName,
                           @RequestParam("password") String password) {
        Response res = new Response();
        try {
            User user = userService.findByUserNameAndPassword(userName, DigestUtils.md5DigestAsHex(password.getBytes("utf-8")));
            if(null != user) {
                // TODO 以后再考虑登录后问题
                // String tokenStr = user.getName()+user.getPassword()+(new Date()).toString();
                // String newToken = DigestUtils.md5DigestAsHex(tokenStr.getBytes());
                // userService.updateUserToken(user.getId(), newToken);
                res.makeSuccess(user);
            } else {
                res.makeFailed("用户名密码不正确");
            }
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}
