package com.energy.controller;

import com.energy.entity.Building;
import com.energy.entity.EnergyPlan;
import com.energy.service.BuildingService;
import com.energy.service.EnergyPlanService;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/29.
 */

@Controller
@RequestMapping("api")
public class EnergyPlanController {

    @Resource
    private EnergyPlanService energyPlanService = null;

    // 用能计划列表
    @RequestMapping("/getEnergyPlans")
    @ResponseBody
    public Object getEnergyPlans(@RequestParam("buildingId") Integer buildingId,
                                         @RequestParam("type") String type) {
        Response res = new Response();
        try {
            List<EnergyPlan> energyPlanList = energyPlanService.getEnergyPlans(buildingId, type);
            res.makeSuccess(energyPlanList);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 用能计划创建
    @RequestMapping("/createEnergyPlan")
    @ResponseBody
    public Object createItemGroup(@RequestParam("buildingId") Integer buildingId,
                                  @RequestParam("type") String type,
                                  @RequestParam("planType") String planType,
                                  @RequestParam("planDate") Date planDate,
                                  @RequestParam("planVal") float planVal,
                                  @RequestParam("planValAvg") float planValAvg,
                                  @RequestParam("planMethod") String planMethod,
                                  @RequestParam("note") String note) {
        Response res = new Response();
        try {
            EnergyPlan energyPlan = new EnergyPlan();
            energyPlan.setBuildingId(buildingId);
            energyPlan.setType(type);
            energyPlan.setPlanType(planType);
            energyPlan.setPlanDate(planDate);
            energyPlan.setPlanVal(planVal);
            energyPlan.setPlanValAvg(planValAvg);
            energyPlan.setPlanMethod(planMethod);
            energyPlan.setNote(note);
            energyPlanService.createEnergyPlan(energyPlan);

            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 用能计划更新
    @RequestMapping("/updateEnergyPlan")
    @ResponseBody
    public Object updateItemGroup(@RequestParam("id") Integer id,
                                  @RequestParam("buildingId") Integer buildingId,
                                  @RequestParam("type") String type,
                                  @RequestParam("planType") String planType,
                                  @RequestParam("planDate") Date planDate,
                                  @RequestParam("planVal") float planVal,
                                  @RequestParam("planValAvg") float planValAvg,
                                  @RequestParam("planMethod") String planMethod,
                                  @RequestParam("note") String note) {
        Response res = new Response();
        try {
            EnergyPlan energyPlan = energyPlanService.getEnergyPlanById(id);
            if (null == energyPlan) {
                res.makeFailed("数据不存在");
            } else {
                energyPlan.setBuildingId(buildingId);
                energyPlan.setType(type);
                energyPlan.setPlanType(planType);
                energyPlan.setPlanDate(planDate);
                energyPlan.setPlanVal(planVal);
                energyPlan.setPlanValAvg(planValAvg);
                energyPlan.setPlanMethod(planMethod);
                energyPlan.setNote(note);
                energyPlanService.updateEnergyPlan(energyPlan);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    // 用能计划删除
    @RequestMapping("/removeEnergyPlan")
    @ResponseBody
    public Object removeEnergyPlan(@RequestParam("id") Integer id,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            energyPlanService.deleteEnergyPlan(id);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
