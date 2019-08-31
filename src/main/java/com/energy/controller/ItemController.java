package com.energy.controller;

import com.energy.entity.Item;
import com.energy.service.BuildingService;
import com.energy.service.ItemService;
import com.energy.utils.Constant;
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
public class ItemController {

    @Resource
    private BuildingService buildingService = null;
    @Resource
    private ItemService itemService = null;

    // 05.2.  某建筑下的 所有【设备】
    @RequestMapping("/getBuildingItems")
    @ResponseBody
    public Object getBuildingItems(@RequestParam("buildingId") Integer buildingId,
                                   HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Item> list = buildingService.getBuildingItems(buildingId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 05.3.  某 [设备分组] 下的 所有【设备】
    @RequestMapping("/getItemsByGroupId")
    @ResponseBody
    public Object getItemsByGroupId(@RequestParam("groupId") Integer groupId,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Map> list = itemService.getItemsByGroupId(groupId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/createItem")
    @ResponseBody
    public Object createItem(HttpServletRequest request) {
        Response res = new Response();
        try {
            Item item = new Item();
            if(null != request.getParameter("collectorId")) {
                item.setCollectorId(Integer.valueOf(request.getParameter("collectorId").toString()));
            }
            if(null != request.getParameter("itemType")) {
                item.setItemType(Integer.valueOf(request.getParameter("itemType").toString()));
            }
            if(null != request.getParameter("code")) {
                item.setCode(request.getParameter("code"));
            }
            if(null != request.getParameter("name")) {
                item.setName(request.getParameter("name"));
            }
            if(null != request.getParameter("description")) {
                item.setDescription(request.getParameter("description"));
            }
            if(null != request.getParameter("dataType")) {
                item.setDataType(Integer.valueOf(request.getParameter("dataType").toString()));
            }
            if(null != request.getParameter("dataUnit")) {
                item.setDataUnit(request.getParameter("dataUnit"));
            }
            if(null != request.getParameter("coefficient")) {
                item.setCoefficient(Double.valueOf(request.getParameter("coefficient").toString()));
            }
            if(null != request.getParameter("maxValue")) {
                item.setMaxValue(Integer.valueOf(request.getParameter("maxValue").toString()));
            }
            itemService.createItem(item);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/updateItem")
    @ResponseBody
    public Object updateItem(@RequestParam("id") Integer id,
                             HttpServletRequest request) {
        Response res = new Response();
        try {
            Item item = itemService.getItemById(id);
            if(null != item) {
                if(null != request.getParameter("collectorId")) {
                    item.setCollectorId(Integer.valueOf(request.getParameter("collectorId").toString()));
                }
                if(null != request.getParameter("itemType")) {
                    item.setItemType(Integer.valueOf(request.getParameter("itemType").toString()));
                }
                if(null != request.getParameter("code")) {
                    item.setCode(request.getParameter("code"));
                }
                if(null != request.getParameter("name")) {
                    item.setName(request.getParameter("name"));
                }
                if(null != request.getParameter("description")) {
                    item.setDescription(request.getParameter("description"));
                }
                if(null != request.getParameter("dataType")) {
                    item.setDataType(Integer.valueOf(request.getParameter("dataType").toString()));
                }
                if(null != request.getParameter("dataUnit")) {
                    item.setDataUnit(request.getParameter("dataUnit"));
                }
                if(null != request.getParameter("coefficient")) {
                    item.setCoefficient(Double.valueOf(request.getParameter("coefficient").toString()));
                }
                if(null != request.getParameter("maxValue")) {
                    item.setMaxValue(Integer.valueOf(request.getParameter("maxValue").toString()));
                }
                itemService.updateItem(item);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/removeItem")
    @ResponseBody
    public Object removeItem(@RequestParam("id") Integer id,
                             HttpServletRequest request) {
        Response res = new Response();
        try {
            itemService.removeItem(id);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
