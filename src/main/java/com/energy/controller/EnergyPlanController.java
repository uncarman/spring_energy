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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    @RequestMapping("/updateEnergyPlan")
    @ResponseBody
    public Object updateItemGroup(@RequestParam("id") Integer id,
                                  @RequestParam("code") String code,
                                  @RequestParam("name") String name,
                                  @RequestParam("type") String type,
                                  @RequestParam("buildingId") Integer buildingId,
                                  @RequestParam("parent") Integer parent,
                                  @RequestParam("area") Integer area,
                                  @RequestParam("note") String note) {
        Response res = new Response();
        try {
            EnergyPlan energyPlan = energyPlanService.getEnergyPlanById(id);
            if (null == energyPlan) {
                res.makeFailed("数据不存在");
            } else {
//                energyPlan.setType(type);
//                energyPlan.setName(name);
//                energyPlan.setType(type);
//                energyPlan.setBuilding_id(buildingId);
//                energyPlan.setParent(parent);
//                energyPlan.setArea(area);
//                energyPlan.setNote(note);
                energyPlanService.updateEnergyPlan(energyPlan);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/createEnergyPlan")
    @ResponseBody
    public Object createItemGroup(@RequestParam("code") String code,
                                  @RequestParam("name") String name,
                                  @RequestParam("type") String type,
                                  @RequestParam("buildingId") Integer buildingId,
                                  @RequestParam("parent") Integer parent,
                                  @RequestParam("area") Integer area,
                                  @RequestParam("note") String note) {
        Response res = new Response();
        try {
            EnergyPlan energyPlan = new EnergyPlan();
//            group.setCode(code);
//            group.setName(name);
//            group.setType(type);
//            group.setBuilding_id(buildingId);
//            group.setParent(parent);
//            group.setArea(area);
//            group.setNote(note);

            energyPlanService.createEnergyPlan(energyPlan);

            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
