package com.energy.controller;

import com.energy.entity.Building;
import com.energy.entity.ItemGroup;
import com.energy.mapper.MeterMapper;
import com.energy.service.BuildingService;
import com.energy.service.MeterService;
import com.energy.utils.Constant;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2019/8/17.
 */

@Controller
@RequestMapping("api")
public class BuildingController {

    @Resource
    private BuildingService buildingService = null;
    @Resource
    private MeterService meterService = null;

    //
    @RequestMapping("/building/{id}")
    @ResponseBody
    public Object findById(@PathVariable("id") Integer id) {
        Response res = new Response();
        try {
            Building building = buildingService.findById(id);
            res.makeSuccess(building);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 07.  用户下所有建筑列表
    @RequestMapping("/getBuildingsByUserId")
    @ResponseBody
    public Object getBuildingsByUserId(@RequestParam("userId") Integer userId) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getBuildingsByUserId(userId);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return res;
    }

    @RequestMapping("/getBuildingsByUserName")
    @ResponseBody
    public Object getBuildingsByUserName(@RequestParam("userName") String userName) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getBuildingsByUserName(userName);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return res;
    }

    // 06.  某建筑下 某个大分项（能耗分项）下的 所有【设备分组】
    @RequestMapping("/getItemGroupByType")
    @ResponseBody
    public Object getItemGroupByType(@RequestParam("buildingId") Integer buildingId,
                                     @RequestParam("type") String type) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getItemGroupByType(buildingId, type);
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

    @RequestMapping("/deleteItemGroup")
    @ResponseBody
    public Object deleteItemGroup(@RequestParam("id") Integer id) {
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

    // 04. 所有【能耗分项】已安装的 一级分类对应的设备ids
    @RequestMapping("/getBuildingItemTypes")
    @ResponseBody
    public Object getBuildingItemTypes(@RequestParam("buildingId") Integer buildingId) {
        Response res = new Response();
        try {
            String type = Constant.SUM_TYPE;
            Map<String, String> groupItems = buildingService.getBuildingItemTypes(buildingId, type);
            res.makeSuccess(groupItems);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 01. 【多个设备】按【时/日/月/年】汇总数据
    @RequestMapping("/getItemDatasByDate")
    @ResponseBody
    public Object getItemDatasByDate(@RequestParam("itemIds") String itemIds,
                                       @RequestParam("from") String fromDate,
                                       @RequestParam("to") String toDate,
                                     HttpServletRequest request) {
        Response res = new Response();
        try {
            String type = null == request.getParameter("type") ? Constant.BY_DAY : request.getParameter("type");
            List<String> itemList = Arrays.asList(itemIds.split(","));
            List<Map> list = buildingService.getItemDatasByDate(itemList, fromDate, toDate, type);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 测试用： 获取能耗类型基础数据
    @RequestMapping("/getItemTypeBaseInfo")
    @ResponseBody
    public Object getItemTypeBaseInfo() {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getItemTypeBaseInfo();
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 总集合数据
    @RequestMapping("/getBuildingSummaryTotalData")
    @ResponseBody
    public Object getBuildingSummaryTotalData(@RequestParam("buildingId") Integer buildingId,
                                     HttpServletRequest request) {
        Response res = new Response();
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Calendar time = Calendar.getInstance();

            // 总量第一天和最后一天
            String dateStart = "2000-01-01";
            String dateEnd = "3000-01-01";

            // 拿到前一个月的第一天和最后一天
            time.add(Calendar.MONTH, -1);
            time.set(Calendar.DAY_OF_MONTH, 1);
            String lastMonthStart = formatter.format(time.getTime());
            time.set(Calendar.DAY_OF_MONTH, time.getActualMaximum(Calendar.DAY_OF_MONTH));
            String lastMonthEnd = formatter.format(time.getTime());
            // 拿到前一年的第一天和最后一天
            time.add(Calendar.MONTH, 1);
            time.add(Calendar.YEAR, -1);
            time.set(Calendar.DAY_OF_YEAR, 1);
            String lastYearStart = formatter.format(time.getTime());
            time.set(Calendar.DAY_OF_YEAR, time.getActualMaximum(Calendar.DAY_OF_YEAR));
            String lastYearEnd = formatter.format(time.getTime());

            // 返回结果集
            Map<String, Object> dataMap = new HashMap<>();
            Map<String, String> summaryMap = new HashMap<>();
            Map<String, Object> chartMap = new HashMap<>();

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // ------------- 汇总数据 ---------------//
            // 拿到电表数据
            String elecType = Constant.ITEM_TYPE_ELE;
            String elecTypeShort = Integer.valueOf(elecType).toString();
            String eleItemIds = groupItems.get(elecTypeShort)+"";
            List<String> eleItemIdList = Arrays.asList(eleItemIds.split(","));
            long sumItemTotal = buildingService.getItemsSummaryVal(eleItemIdList, dateStart, dateEnd);
            long sumItemLastMonth = buildingService.getItemsSummaryVal(eleItemIdList, lastMonthStart, lastMonthEnd);
            long sumItemLastYear = buildingService.getItemsSummaryVal(eleItemIdList, lastYearStart, lastYearEnd);
            Map map = baseMap.get(elecType);
            summaryMap.put("totalName1" , "总"+map.get("name").toString());
            summaryMap.put("totalUnit1" , map.get("unit").toString());
            summaryMap.put("totalRate1" , map.get("rate").toString());
            summaryMap.put("total1", String.valueOf(sumItemTotal));
            summaryMap.put("totalCompareMonth1" , String.valueOf(sumItemLastMonth));
            summaryMap.put("totalCompareYear1" , String.valueOf(sumItemLastYear));

            // 拿到水表数据
            String waterType = Constant.ITEM_TYPE_WATER;
            String waterTypeShort = Integer.valueOf(waterType).toString();
            String waterItemIds = groupItems.get(waterTypeShort)+"";
            List<String> waterItemIdList = Arrays.asList(waterItemIds.split(","));
            long sumItemTotal2 = buildingService.getItemsSummaryVal(waterItemIdList, dateStart, dateEnd);
            long sumItemLastMonth2 = buildingService.getItemsSummaryVal(waterItemIdList, lastMonthStart, lastMonthEnd);
            long sumItemLastYear2 = buildingService.getItemsSummaryVal(waterItemIdList, lastYearStart, lastYearEnd);
            Map map2 = baseMap.get(waterType);
            summaryMap.put("totalName2" , "总"+map2.get("name").toString());
            summaryMap.put("totalUnit2" , map2.get("unit").toString());
            summaryMap.put("totalRate2" , map2.get("rate").toString());
            summaryMap.put("total2" , String.valueOf(sumItemTotal2));
            summaryMap.put("totalCompareMonth2" , String.valueOf(sumItemLastMonth2));
            summaryMap.put("totalCompare1Year2" , String.valueOf(sumItemLastYear2));

            // 拿到燃气表数据
            String gasType = Constant.ITEM_TYPE_GAS;
            String gasTypeShort = Integer.valueOf(gasType).toString();
            String gasItemIds = groupItems.get(gasTypeShort)+"";
            List<String> gasItemIdList = Arrays.asList(gasItemIds.split(","));
            long sumItemTotal3 = buildingService.getItemsSummaryVal(gasItemIdList, dateStart, dateEnd);
            long sumItemLastMonth3 = buildingService.getItemsSummaryVal(gasItemIdList, lastMonthStart, lastMonthEnd);
            long sumItemLastYear3 = buildingService.getItemsSummaryVal(gasItemIdList, lastYearStart, lastYearEnd);
            Map map3 = baseMap.get(gasType);
            summaryMap.put("totalName3" , "总"+map3.get("name").toString());
            summaryMap.put("totalUnit3" , map3.get("unit").toString());
            summaryMap.put("totalRate3" , (String)map3.get("rate"));
            summaryMap.put("total3" , String.valueOf(sumItemTotal3));
            summaryMap.put("totalCompareMonth3" , String.valueOf(sumItemLastMonth3));
            summaryMap.put("totalCompare1Year3" , String.valueOf(sumItemLastYear3));

            // 拿到蒸汽表数据
            String steamType = Constant.ITEM_TYPE_GAS;
            String steamTypeShort = Integer.valueOf(steamType).toString();
            String steamItemIds = groupItems.get(steamTypeShort)+"";
            List<String> steamItemIdList = Arrays.asList(steamItemIds.split(","));
            long sumItemTotal4 = buildingService.getItemsSummaryVal(steamItemIdList, dateStart, dateEnd);
            long sumItemLastMonth4 = buildingService.getItemsSummaryVal(steamItemIdList, lastMonthStart, lastMonthEnd);
            long sumItemLastYear4 = buildingService.getItemsSummaryVal(steamItemIdList, lastYearStart, lastYearEnd);
            Map map4 = baseMap.get(steamType);
            summaryMap.put("totalName4" , "总"+map4.get("name").toString());
            summaryMap.put("totalUnit4" , map4.get("unit").toString());
            summaryMap.put("totalRate4" , (String)map4.get("rate"));
            summaryMap.put("total4" , String.valueOf(sumItemTotal4));
            summaryMap.put("totalCompareMonth4" , String.valueOf(sumItemLastMonth4));
            summaryMap.put("totalCompare1Year4" , String.valueOf(sumItemLastYear4));

            res.makeSuccess(summaryMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    // 03. 某建筑【四种表】按【时/日/月/年】汇总数据
    @RequestMapping("/getBuildingChartDataByType")
    @ResponseBody
    public Object getBuildingChartDataByType(@RequestParam("buildingId") Integer buildingId,
                                              @RequestParam("from") String from,
                                              @RequestParam("to") String to,
                                              @RequestParam("type") String type,
                                              HttpServletRequest request) {
        Response res = new Response();
        try {
            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            Map chartMap = new HashMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map<String, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // 四种表： 电，水，燃气，蒸汽
            String[] typeStrs = {"01", "02", "03", "05"};
            List<String> energyTypes = Arrays.asList(typeStrs);
            for(int i = 0; i < energyTypes.size(); i++) {
                String curType = energyTypes.get(i);
                String curTypeShort = Integer.valueOf(curType).toString();
                String curItemIds = groupItems.get(curTypeShort)+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = buildingService.getItemGroupById(Integer.valueOf(curTypeShort));

                Map curMap = new HashMap();
                curMap.put("datas", curList);
                curMap.put("key", "recorded_at");
                curMap.put("val", "total_val");
                curMap.put("name", curBaseMap.get("name"));
                curMap.put("prop_area", group.getArea());
                curMap.put("area", group.getArea());
                curMap.put("fee_policy", curBaseMap.get("rate"));

                chartMap.put(curType, curMap);
            }

            res.makeSuccess(chartMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
