package com.energy.controller;

import com.energy.entity.BasicData;
import com.energy.service.BuildingService;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("api")
public class BasicDataController {

    @Resource
    private BuildingService buildingService = null;

    @RequestMapping("/getBasicDatas")
    @ResponseBody
    public Object getBasicDatas(HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getBasicDatas();
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/createBasicData")
    @ResponseBody
    public Object createBasicData(HttpServletRequest request) {
        Response res = new Response();
        try {
            BasicData basicData = new BasicData();
            if(null != request.getParameter("type")) {
                basicData.setType(Integer.valueOf(request.getParameter("type").toString()));
            }
            if(null != request.getParameter("name")) {
                basicData.setName(request.getParameter("name"));
            }
            if(null != request.getParameter("basicCode")) {
                basicData.setBasicCode(request.getParameter("basicCode"));
            }
            if(null != request.getParameter("basicName")) {
                basicData.setBasicName(request.getParameter("basicName"));
            }
            if(null != request.getParameter("note")) {
                basicData.setNote(request.getParameter("note"));
            }
            buildingService.createBasicData(basicData);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/updateBasicData")
    @ResponseBody
    public Object updateBasicData(@RequestParam("id") Integer id,
                                  HttpServletRequest request) {
        Response res = new Response();
        try {
            BasicData basicData = buildingService.getBasicDataById(id);
            if(null != basicData) {
                if(null != request.getParameter("type")) {
                    basicData.setType(Integer.valueOf(request.getParameter("type").toString()));
                }
                if(null != request.getParameter("name")) {
                    basicData.setName(request.getParameter("name"));
                }
                if(null != request.getParameter("basicCode")) {
                    basicData.setBasicCode(request.getParameter("basicCode"));
                }
                if(null != request.getParameter("basicName")) {
                    basicData.setBasicName(request.getParameter("basicName"));
                }
                if(null != request.getParameter("note")) {
                    basicData.setNote(request.getParameter("note"));
                }
                buildingService.updateBasicData(basicData);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/removeBasicData")
    @ResponseBody
    public Object removeBasicData(@RequestParam("id") Integer id,
                                  HttpServletRequest request) {
        Response res = new Response();
        try {
            buildingService.removeBasicData(id);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}
