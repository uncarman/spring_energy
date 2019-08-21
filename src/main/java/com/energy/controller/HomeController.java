package com.energy.controller;

import com.energy.entity.Building;
import com.energy.service.BuildingService;
import com.energy.utils.Response;
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
@RequestMapping("api")
public class HomeController {

    @Resource
    private BuildingService buildingService = null;

    @RequestMapping("/")
    public String home(){
        return "index";
    }

    @RequestMapping("/now")
    @ResponseBody
    public Date now() {
        return new Date();
    }

    @RequestMapping("/getBuildingsByUserName/{userName}")
    @ResponseBody
    public List<Map> getBuildingsByUserName(@PathVariable("userName") String userName) {
        List<Map> list = buildingService.getBuildingsByUserName(userName);
        return list;
    }

}
