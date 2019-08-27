package com.energy.controller;

import com.energy.entity.ItemGroup;
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
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("api")
public class ItemGroupController {

    @Resource
    private BuildingService buildingService = null;

    // 05.1.  某建筑下的 所有【设备分组】
    @RequestMapping("/getItemGroups")
    @ResponseBody
    public Object getItemGroups(@RequestParam("buildingId") Integer buildingId,
                                HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getItemGroups(buildingId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 06.  某建筑下的 所有【设备分组】 eg：能耗分项
    @RequestMapping("/getItemGroupByType")
    @ResponseBody
    public Object getItemGroupByType(@RequestParam("buildingId") Integer buildingId,
                                     @RequestParam("type") String type,
                                     @RequestParam("subType") String subType,
                                     HttpServletRequest request) {
        Response res = new Response();
        try {
            String parent = request.getParameter("parent");
            List<Map> list = buildingService.getItemGroupByType(buildingId, type, subType, parent);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 05. 某个设备分组的详细信息，包含第一级子信息
    @RequestMapping("/getItemGroupById")
    @ResponseBody
    public Object getItemGroupByCode(@RequestParam("groupId") Integer groupId) {
        Response res = new Response();
        try {
            ItemGroup group = buildingService.getItemGroupById(groupId);
            List<Map> list = buildingService.getItemGroupChildsById(groupId);
            Map resMap = new HashMap();
            resMap.put("itemGroup", group);
            resMap.put("itemGroupChilds", list);
            res.makeSuccess(resMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/updateItemGroup")
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
            ItemGroup group = buildingService.getItemGroupById(id);
            if (null == group) {
                res.makeFailed("数据不存在");
            } else {
                group.setCode(code);
                group.setName(name);
                group.setType(type);
                group.setBuilding_id(buildingId);
                group.setParent(parent);
                group.setArea(area);
                group.setNote(note);
                buildingService.updateItemGroup(group);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/createItemGroup")
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
            ItemGroup group = new ItemGroup();
            group.setCode(code);
            group.setName(name);
            group.setType(type);
            group.setBuilding_id(buildingId);
            group.setParent(parent);
            group.setArea(area);
            group.setNote(note);
            buildingService.createItemGroup(group);

            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/removeItemGroup")
    @ResponseBody
    public Object removeItemGroup(@RequestParam("id") Integer id) {
        Response res = new Response();
        try {
            ItemGroup group = buildingService.getItemGroupById(id);
            buildingService.deleteItemGroup(id);
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
            ItemGroup group = buildingService.getItemGroupById(groupId);
            if(null != group) {
                List<String> itemList = Arrays.asList(itemIds.split(","));
                buildingService.updateItemsGroupItems(groupId, itemList);
            }
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
