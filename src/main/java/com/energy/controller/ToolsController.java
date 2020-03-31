package com.energy.controller;

import com.energy.config.AppConfig;
import com.energy.entity.AmmeterData;
import com.energy.service.AmmeterDataService;
import com.energy.service.ItemDataService;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 工具类接口
 */

@Controller
@RequestMapping("api")
public class ToolsController {

    @Resource
    private ItemDataService itemDataService = null;

    @Resource
    private AmmeterDataService ammeterDataService = null;

    @RequestMapping("/itemDataUpdate")
    @ResponseBody
    public String itemDataUpdate() {
        itemDataService.updateItemDatas();
        return "success";
    }

    @RequestMapping("/ammeterDataRecord")
    @ResponseBody
    public String ammeterDataRecord() {
        ammeterDataService.recordAmmeterDatas();
        return "success";
    }

    @RequestMapping("/getAmmeterData")
    @ResponseBody
    public Object getAmmeterData() {
        Response res = new Response();
        try {
            List<AmmeterData> list = ammeterDataService.getAmmeterData();
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
