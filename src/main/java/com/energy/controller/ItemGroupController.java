package com.energy.controller;

import com.energy.entity.ItemGroup;
import com.energy.service.BuildingService;
import com.energy.service.ItemService;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("api")
public class ItemGroupController {

    @Resource
    private BuildingService buildingService = null;
    @Resource
    private ItemService itemService = null;

    // 某建筑下的所有【设备分组】
    @RequestMapping("/getItemGroups")
    @ResponseBody
    public Object getItemGroups(@RequestParam("buildingId") Integer buildingId,
                                HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Map> list = itemService.getItemGroups(buildingId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 某建筑下条件筛选【设备分组】
    @RequestMapping("/getItemGroupByType")
    @ResponseBody
    public Object getItemGroupByType(@RequestParam("buildingId") Integer buildingId,
                                     @RequestParam("type") String type,
                                     @RequestParam("subType") String subType,
                                     HttpServletRequest request) {
        Response res = new Response();
        try {
            String parent = request.getParameter("parent");
            List<ItemGroup> list = itemService.getItemGroupByType(buildingId, type, subType, parent);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 设备分组的详细信息，包含子分组
    @RequestMapping("/getItemGroupById")
    @ResponseBody
    public Object getItemGroupByCode(@RequestParam("groupId") Integer groupId) {
        Response res = new Response();
        try {
            ItemGroup group = itemService.getItemGroupById(groupId);
            List<ItemGroup> list = itemService.getItemGroupChildsById(groupId);
            Map resMap = new HashMap();
            resMap.put("itemGroup", group);
            resMap.put("itemGroupChilds", list);
            res.makeSuccess(resMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 设备分组创建
    @RequestMapping("/createItemGroup")
    @ResponseBody
    public Object createItemGroup(@RequestParam("buildingId") Integer buildingId,
                                  HttpServletRequest request) {
        Response res = new Response();
        try {
            ItemGroup group = new ItemGroup();
            group.setBuildingId(buildingId);
            if(null != request.getParameter("code")) {
                group.setCode(request.getParameter("code").toString());
            }
            if(null != request.getParameter("name")) {
                group.setName(request.getParameter("name").toString());
            }
            if(null != request.getParameter("type")) {
                group.setType(request.getParameter("type").toString());
            }
            if(null != request.getParameter("parent") && !"".equals(request.getParameter("parent"))) {
                group.setParent(Integer.valueOf(request.getParameter("parent")));
            }
            if(null != request.getParameter("area") && !"".equals(request.getParameter("area"))) {
                group.setArea(Float.valueOf(request.getParameter("area")));
            }
            if(null != request.getParameter("note")) {
                group.setNote(request.getParameter("note").toString());
            }
            itemService.createItemGroup(group);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 设备分组更新
    @RequestMapping("/updateItemGroup")
    @ResponseBody
    public Object updateItemGroup(@RequestParam("id") Integer id,
                                  @RequestParam("buildingId") Integer buildingId,
                                  HttpServletRequest request) {
        Response res = new Response();
        try {
            ItemGroup group = itemService.getItemGroupById(id);
            if (null == group) {
                res.makeFailed("数据不存在");
            } else {
                group.setBuildingId(buildingId);
                if(null != request.getParameter("code")) {
                    group.setCode(request.getParameter("code").toString());
                }
                if(null != request.getParameter("name")) {
                    group.setName(request.getParameter("name").toString());
                }
                if(null != request.getParameter("type")) {
                    group.setType(request.getParameter("type"));
                }
                if(null != request.getParameter("parent") && !"".equals(request.getParameter("parent"))) {
                    group.setParent(Integer.valueOf(request.getParameter("parent")));
                }
                if(null != request.getParameter("area") && !"".equals(request.getParameter("area"))) {
                    group.setArea(Float.valueOf(request.getParameter("area")));
                }
                if(null != request.getParameter("note")) {
                    group.setNote(request.getParameter("note").toString());
                }
                itemService.updateItemGroup(group);
                res.makeSuccess("");
            }
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 设备分组删除
    @RequestMapping("/removeItemGroup")
    @ResponseBody
    public Object removeItemGroup(@RequestParam("id") Integer id) {
        Response res = new Response();
        try {
            ItemGroup group = itemService.getItemGroupById(id);
            itemService.deleteItemGroup(id);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 更新 [设备分组] 绑定的 [设备]
    @RequestMapping("/updateGroupItem")
    @ResponseBody
    public Object updateGroupItem(@RequestParam("groupId") Integer groupId,
                                  @RequestParam("itemIds") String itemIds) {
        Response res = new Response();
        try {
            ItemGroup group = itemService.getItemGroupById(groupId);
            if(null != group) {
                List<String> itemList = Arrays.asList(itemIds.split(","));
                itemService.updateItemsGroupItems(groupId, itemList);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
