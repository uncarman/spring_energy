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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("api")
public class ItemController {

    @Resource
    private BuildingService buildingService = null;
    @Resource
    private ItemService itemService = null;

    // 建筑下已安装的【能耗分项】【零级分类】对应的设备ids
    @RequestMapping("/getBuildingItemTypes")
    @ResponseBody
    public Object getBuildingItemTypes(@RequestParam("buildingId") Integer buildingId) {
        Response res = new Response();
        try {
            String type = Constant.SUM_TYPE;
            Map<Integer, String> groupItems = buildingService.getBuildingItemTypes(buildingId, type);
            res.makeSuccess(groupItems);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 某建筑下所有设备列表
    @RequestMapping("/getBuildingItems")
    @ResponseBody
    public Object getBuildingItems(@RequestParam("buildingId") Integer buildingId,
                                   HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Item> list = itemService.getBuildingItems(buildingId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 某【设备分组】下的所有【设备】
    @RequestMapping("/getItemsByGroupId")
    @ResponseBody
    public Object getItemsByGroupId(@RequestParam("groupId") Integer groupId,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Item> list = itemService.getItemsByGroupId(groupId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 【设备分组】下的所有【设备】
    @RequestMapping("/getItemsByGroupIds")
    @ResponseBody
    public Object getItemsByGroupId(@RequestParam("groupIds") String groupIds,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            List<String> groupIdList = Arrays.asList(groupIds.split(","));
            if(null != groupIdList && !groupIdList.isEmpty()) {
                List<Item> list = itemService.getItemsByGroupIds(groupIdList);
                res.makeSuccess(list);
            } else {
                // 如果输入为空, 直接返回空
                List list= new ArrayList();
                res.makeSuccess(list);
            }
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 设备创建
    @RequestMapping("/createItem")
    @ResponseBody
    public Object createItem(@RequestParam("collectorId") Integer collectorId,
                             HttpServletRequest request) {
        Response res = new Response();
        try {
            Item item = new Item();
            item.setCollectorId(collectorId);
            if(null != request.getParameter("itemType") && !"".equals(request.getParameter("itemType"))) {
                item.setItemType(Integer.valueOf(request.getParameter("itemType")));
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
            if(null != request.getParameter("dataType") && !"".equals(request.getParameter("dataType"))) {
                item.setDataType(Integer.valueOf(request.getParameter("dataType")));
            }
            if(null != request.getParameter("dataUnit")) {
                item.setDataUnit(request.getParameter("dataUnit"));
            }
            if(null != request.getParameter("coefficient") && !"".equals(request.getParameter("coefficient"))) {
                item.setCoefficient(Double.valueOf(request.getParameter("coefficient")));
            }
            if(null != request.getParameter("maxValue") && !"".equals(request.getParameter("maxValue"))) {
                item.setMaxValue(Double.valueOf(request.getParameter("maxValue")));
            }
            if(null != request.getParameter("state") && !"".equals(request.getParameter("state"))) {
                item.setState(Integer.valueOf(request.getParameter("state")));
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
                             @RequestParam("collectorId") Integer collectorId,
                             HttpServletRequest request) {
        Response res = new Response();
        try {
            Item item = itemService.getItemById(id);
            if(null != item) {
                item.setCollectorId(collectorId);
                if(null != request.getParameter("itemType") && !"".equals(request.getParameter("itemType"))) {
                    item.setItemType(Integer.valueOf(request.getParameter("itemType")));
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
                if(null != request.getParameter("dataType") && !"".equals(request.getParameter("dataType"))) {
                    item.setDataType(Integer.valueOf(request.getParameter("dataType")));
                }
                if(null != request.getParameter("dataUnit")) {
                    item.setDataUnit(request.getParameter("dataUnit"));
                }
                if(null != request.getParameter("coefficient") && !"".equals(request.getParameter("coefficient"))) {
                    item.setCoefficient(Double.valueOf(request.getParameter("coefficient")));
                }
                if(null != request.getParameter("maxValue") && !"".equals(request.getParameter("maxValue"))) {
                    item.setMaxValue(Double.valueOf(request.getParameter("maxValue")));
                }
                if(null != request.getParameter("state") && !"".equals(request.getParameter("state"))) {
                    item.setState(Integer.valueOf(request.getParameter("state")));
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

    @RequestMapping("/getItem")
    @ResponseBody
    public Object getItem(@RequestParam("id") Integer id,
                             HttpServletRequest request) {
        Response res = new Response();
        try {
            Item it = itemService.getItemById(id);
            res.makeSuccess(it);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
