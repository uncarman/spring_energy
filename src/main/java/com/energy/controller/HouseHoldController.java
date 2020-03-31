package com.energy.controller;

import com.energy.entity.HouseHold;
import com.energy.service.HouseHoldService;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 商户管理相关接口
 */

@Controller
@RequestMapping("api")
public class HouseHoldController {

    @Resource
    private HouseHoldService houseHoldService = null;

    @RequestMapping("/householdList")
    @ResponseBody
    public Object householdList(HttpServletRequest request) {
        Response res = new Response();
        try {
            String buildingId = request.getParameter("buildingId");
            List<Map> list = houseHoldService.getHouseHoldList(buildingId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/householdAdd")
    @ResponseBody
    public Object householdAdd(HouseHold houseHold) {
        Response res = new Response();
        try {
            houseHoldService.saveHouseHold(houseHold);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/householdUpdate")
    @ResponseBody
    public Object householdUpdate(HouseHold houseHold) {
        Response res = new Response();
        try {
            houseHoldService.updateHouseHold(houseHold);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/householdByItemId")
    @ResponseBody
    public Object householdByItemId(@RequestParam("itemId") String itemId,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            HouseHold houseHold = houseHoldService.getHouseHoldByItemId(itemId);
            res.makeSuccess(houseHold);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    // 现在不开放
//    @RequestMapping("/householdRemove")
//    @ResponseBody
//    public Object householdRemove(@RequestParam("id") Integer id,
//                                  HttpServletRequest request) {
//        Response res = new Response();
//        try {
//            houseHoldService.removeBasicData(id);
//            res.makeSuccess("");
//        } catch (Exception ex) {
//            res.makeFailed(ex);
//        }
//        return new ResponseEntity<>(res, HttpStatus.OK);
//    }

}
