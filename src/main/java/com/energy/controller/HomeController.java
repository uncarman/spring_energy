package com.energy.controller;

import com.energy.config.AppConfig;
import com.energy.entity.AmmeterData;
import com.energy.service.AmmeterDataService;
import com.energy.service.BuildingService;
import com.energy.service.ItemDataService;
import com.energy.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private ItemDataService itemDataService = null;

    @Resource
    private AppConfig appConfig = null;

    @Resource
    private AmmeterDataService ammeterDataService = null;

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

    @RequestMapping("/live")
    public String live(Map<String,Object> map){
        setEnv(map);
        return "live";
    }

    @RequestMapping("/test")
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
