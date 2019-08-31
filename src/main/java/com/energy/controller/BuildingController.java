package com.energy.controller;

import com.energy.entity.Building;
import com.energy.service.BuildingService;
import com.energy.utils.Constant;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2019/8/17.
 */

@Controller
@RequestMapping("api")
public class BuildingController {

    @Resource
    private BuildingService buildingService = null;

    // 建筑详情
    @RequestMapping("/building")
    @ResponseBody
    public Object findById(@RequestParam("id") Integer id) {
        Response res = new Response();
        try {
            Building building = buildingService.getBuildingById(id);
            res.makeSuccess(building);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 用户名下所有建筑列表
    @RequestMapping("/getBuildingsByUserId")
    @ResponseBody
    public Object getBuildingsByUserId(@RequestParam("userId") Integer userId) {
        Response res = new Response();
        try {
            List<Building> list = buildingService.getBuildingsByUserId(userId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return res;
    }

    // 能耗类型基础信息
    @RequestMapping("/getItemTypeBaseInfo")
    @ResponseBody
    public Object getItemTypeBaseInfo() {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getItemTypeBaseInfo();
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
