package com.energy.controller;

import com.energy.config.AppConfig;
import com.energy.service.BuildingService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2019/8/17.
 */

@Controller
public class HomeController {

    @Resource
    private BuildingService buildingService = null;

    @Resource
    private AppConfig appConfig = null;

    private void setEnv(Map<String,Object> map) {
        map.put("appName", appConfig.getName());
        map.put("appVersion", appConfig.getVersion());
        map.put("appDescription", appConfig.getDescription());
    }

    @RequestMapping("/")
    public String home(Map<String,Object> map){
        setEnv(map);
        return "index";
    }

    @RequestMapping("/login")
    public String login(Map<String,Object> map){
        setEnv(map);
        return "login";
    }


    @RequestMapping("/err")
    @ResponseBody
    public String error() {
        return appConfig.getName() + appConfig.getVersion();
    }

    @RequestMapping("/api/lo")
    @ResponseBody
    public Date now() {
        return new Date();
    }

}
