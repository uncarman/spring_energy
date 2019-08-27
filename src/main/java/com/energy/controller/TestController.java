package com.energy.controller;

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
public class TestController {

    @Resource
    private BuildingService buildingService = null;

    @RequestMapping("/test")
    @ResponseBody
    public Object test(@RequestParam("groupId") Integer groupId,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getItemsByGroupId(groupId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
