package com.energy.controller;

import com.energy.entity.Building;
import com.energy.entity.EnergyPlan;
import com.energy.service.BuildingService;
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
    private BuildingService buildingService = null;



    //
    @RequestMapping("/getEnergyPlans")
    @ResponseBody
    public Object getEnergyPlans(@RequestParam("buildingId") Integer buildingId,
                                         @RequestParam("type") String type) {
        Response res = new Response();
        try {
            List<EnergyPlan> energyPlanList = buildingService.getEnergyPlans(buildingId, type);
            res.makeSuccess(energyPlanList);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
