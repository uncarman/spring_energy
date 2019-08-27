package com.energy.controller;

import com.energy.entity.BasicData;
import com.energy.entity.Building;
import com.energy.entity.Item;
import com.energy.entity.ItemGroup;
import com.energy.mapper.MeterMapper;
import com.energy.service.BuildingService;
import com.energy.service.MeterService;
import com.energy.utils.Constant;
import com.energy.utils.Response;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.DecimalMax;
import java.lang.reflect.Array;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2019/8/17.
 */

@Controller
@RequestMapping("api")
public class BuildingController {

    @Resource
    private BuildingService buildingService = null;

    //
    @RequestMapping("/building/{id}")
    @ResponseBody
    public Object findById(@PathVariable("id") Integer id) {
        Response res = new Response();
        try {
            Building building = buildingService.findById(id);
            res.makeSuccess(building);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 07.  用户下所有建筑列表
    @RequestMapping("/getBuildingsByUserId")
    @ResponseBody
    public Object getBuildingsByUserId(@RequestParam("userId") Integer userId) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getBuildingsByUserId(userId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return res;
    }

    @RequestMapping("/getBuildingsByUserName")
    @ResponseBody
    public Object getBuildingsByUserName(@RequestParam("userName") String userName) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getBuildingsByUserName(userName);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return res;
    }












    @RequestMapping("/recordEnergyDatas")
    @ResponseBody
    public Object getEnergyTableDataByType(){
        Response res = new Response();
        try {
            buildingService.recordEnergyDatas();
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
