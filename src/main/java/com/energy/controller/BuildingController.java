package com.energy.controller;

import com.energy.entity.BasicData;
import com.energy.entity.Building;
import com.energy.entity.Item;
import com.energy.entity.ItemGroup;
import com.energy.mapper.MeterMapper;
import com.energy.service.BuildingService;
import com.energy.service.MeterService;
import com.energy.utils.Constant;
import com.energy.utils.Response;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.DecimalMax;
import java.lang.reflect.Array;
import java.text.DecimalFormat;
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

    // 05.2.  某建筑下的 所有【设备】
    @RequestMapping("/getBuildingItems")
    @ResponseBody
    public Object getBuildingItems(@RequestParam("buildingId") Integer buildingId,
                                     HttpServletRequest request) {
        Response res = new Response();
        try {
            List<Map> list = buildingService.getBuildingItems(buildingId);
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
            List<Map> list = buildingService.getItemsByGroupId(groupId);
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
            buildingService.createItem(item);
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
            Item item = buildingService.getItemById(id);
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
                buildingService.updateItem(item);
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
            buildingService.removeItem(id);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


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



    // 04. 所有【能耗分项】已安装的 零级分类对应的设备ids
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

    // 02. 某建筑 总汇总数据（首页4块）
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

            // 拿到本月的第一天和最后一天
            time.set(Calendar.DAY_OF_MONTH, 1);
            String curMonthStart = formatter.format(time.getTime());
            time.set(Calendar.DAY_OF_MONTH, time.getActualMaximum(Calendar.DAY_OF_MONTH));
            String curMonthEnd = formatter.format(time.getTime());

            // 拿到本年的第一天和最后一天
            time.set(Calendar.DAY_OF_YEAR, 1);
            String curYearStart = formatter.format(time.getTime());
            time.set(Calendar.DAY_OF_YEAR, time.getActualMaximum(Calendar.DAY_OF_YEAR));
            String curYearEnd = formatter.format(time.getTime());

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
            List<Map> summaryMap = new ArrayList<>();
            Map<String, Object> chartMap = new HashMap<>();

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // ------------- 汇总数据 ---------------//
            // 四种表： 电，水，燃气，蒸汽
            String[] typeStrs = {"01", "02", "03", "05"};
            List<String> energyTypes = Arrays.asList(typeStrs);
            for(int i = 0; i < energyTypes.size(); i++) {
                String curType = energyTypes.get(i);
                Map curTypeGroup = buildingService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroup ? Integer.valueOf(curTypeGroup.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                float sumItemTotal = buildingService.getItemsSummaryVal(curItemIdList, dateStart, dateEnd);
                float sumItemCurMonth = buildingService.getItemsSummaryVal(curItemIdList, curMonthStart, curMonthEnd);
                float sumItemCurYear = buildingService.getItemsSummaryVal(curItemIdList, curYearStart, curYearEnd);
                float sumItemLastMonth = buildingService.getItemsSummaryVal(curItemIdList, lastMonthStart, lastMonthEnd);
                float sumItemLastYear = buildingService.getItemsSummaryVal(curItemIdList, lastYearStart, lastYearEnd);
                Map map = baseMap.get(curType);

                Map itemMap = new HashMap();
                itemMap.put("type" , curType);
                itemMap.put("name" , "总"+(String)map.get("name"));
                itemMap.put("unit" , map.get("unit"));
                itemMap.put("rate" , map.get("rate"));
                itemMap.put("total", sumItemTotal);
                itemMap.put("curMonth" , sumItemCurMonth);
                itemMap.put("curYear" , sumItemCurYear);
                itemMap.put("lastMonth" , sumItemLastMonth);
                itemMap.put("lastYear" , sumItemLastYear);

                summaryMap.add(itemMap);
            }

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
                Map curTypeGroup = buildingService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroup ? Integer.valueOf(curTypeGroup.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = buildingService.getItemGroupById(curGroupId);

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

    // 03.1. 某建筑【四种表】按【时/日/月/年】汇总数据
    @RequestMapping("/getBuildingTableDataByType")
    @ResponseBody
    public Object getBuildingTableDataByType(@RequestParam("buildingId") Integer buildingId,
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

            // 表头
            List<String> titleList = new ArrayList<>();
            titleList.add("日期");
            List<List<String>> dataList = new ArrayList<>();

            // 先生成第一列时间数据
            SimpleDateFormat formatter = null;
            if(type.equals(Constant.BY_HOUR)) {
                formatter = new SimpleDateFormat("yyyy-MM-dd HH");
            } else if(type.equals(Constant.BY_MONTH)) {
                formatter = new SimpleDateFormat("yyyy-MM");
            } else if(type.equals(Constant.BY_YEAR)) {
                formatter = new SimpleDateFormat("yyyy");
            } else {
                formatter = new SimpleDateFormat("yyyy-MM-dd");
            }
            Calendar time = Calendar.getInstance();
            Date fromDate = formatter.parse(from);
            Date toDate = formatter.parse(to);

            Calendar cf = Calendar.getInstance();
            Calendar ct = Calendar.getInstance();
            cf.setTime(fromDate);
            ct.setTime(toDate);

            int xlen = 0;

            if(type.equals(Constant.BY_HOUR)) {
                xlen = (int) ((ct.getTime().getTime() - cf.getTime().getTime()) / (1000*3600));
            } else if(type.equals(Constant.BY_MONTH)) {
                xlen = ct.get(Calendar.MONTH) - cf.get(Calendar.MONTH) + 12 * (ct.get(Calendar.YEAR) - cf.get(Calendar.YEAR));
            } else if(type.equals(Constant.BY_YEAR)) {
                xlen = ct.get(Calendar.YEAR) - cf.get(Calendar.YEAR);
            } else {
                xlen = (int) ((ct.getTime().getTime() - cf.getTime().getTime()) / (1000*3600*24));
            }

            for(int i=0; i<=xlen; i++) {
                time.setTime(fromDate);
                if(type.equals(Constant.BY_HOUR)) {
                    time.add(Calendar.HOUR, i);
                } else if(type.equals(Constant.BY_MONTH)) {
                    time.add(Calendar.MONTH, i);
                } else if(type.equals(Constant.BY_YEAR)) {
                    time.add(Calendar.YEAR, i);
                } else {
                    time.add(Calendar.DATE, i);
                }
                String date = formatter.format(time.getTime());
                List<String> row = new ArrayList<String>();;
                row.add(date);
                dataList.add(row);
            }

            for(int i = 0; i < energyTypes.size(); i++) {
                String curType = energyTypes.get(i);
                Map curTypeGroup = buildingService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroup ? Integer.valueOf(curTypeGroup.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = buildingService.getItemGroupById(curGroupId);
                DecimalFormat df2 = new DecimalFormat("###.0000");

                titleList.add((String)curBaseMap.get("name"));
                titleList.add((String)curBaseMap.get("name")+"密度");
                titleList.add((String)curBaseMap.get("name")+"费用");
                String rate = null != curBaseMap.get("rate") ? curBaseMap.get("rate").toString() : null ;
                for(int k = 0; k < dataList.size(); k++) {
                    List line = dataList.get(k);
                    Boolean hasInsert = false;
                    for(int j = 0; j < curList.size(); j++) {
                        Map row = curList.get(j);
                        if(line.get(0).toString().equals(row.get("recorded_at"))) {
                            line.add(row.get("total_val"));
                            String totalValAvg = ""+df2.format(Float.valueOf(row.get("total_val").toString()) / Float.valueOf(group.getArea()));
                            line.add(totalValAvg);
                            if(null != rate) {
                                float fee = Float.valueOf(row.get("total_val").toString()) * Float.valueOf(rate);
                                line.add(fee);
                            } else {
                                line.add(0);
                            }
                            hasInsert = true;
                            break;
                        };
                    }
                    if(!hasInsert) {
                        line.add("0");
                        line.add("0");
                        line.add("0");
                    }
                }
            }

            dataList.add(0, titleList);
            res.makeSuccess(dataList);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 09. 某建筑【某种表】按【时/日/月/年】汇总数据
    @RequestMapping("/getBuildingSummaryTotalDataByType")
    @ResponseBody
    public Object getBuildingSummaryTotalData(@RequestParam("buildingId") Integer buildingId,
                                              @RequestParam("type") String type,
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
            List<Map> summaryMap = new ArrayList<>();
            Map<String, Object> chartMap = new HashMap<>();

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // ------------- 汇总数据 ---------------//
            Map curTypeGroupParent = buildingService.getItemGroupIdByEnergyType(buildingId, type, Constant.SUM_TYPE); // Integer.valueOf(curType).toString();
            Integer curGroupId = null != curTypeGroupParent ? Integer.valueOf(curTypeGroupParent.get("id").toString()) : -1;
            String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
            List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
            float sumItemTotal = buildingService.getItemsSummaryVal(curItemIdList, dateStart, dateEnd);
            float sumItemLastMonth = buildingService.getItemsSummaryVal(curItemIdList, lastMonthStart, lastMonthEnd);
            float sumItemLastYear = buildingService.getItemsSummaryVal(curItemIdList, lastYearStart, lastYearEnd);
            ItemGroup group = buildingService.getItemGroupById(Integer.valueOf(curGroupId));
            Map map = baseMap.get(type);
            String rate = map.get("rate").toString();

            Map itemMap = new HashMap();
            Map itemMap2 = new HashMap();
            Map itemMap3 = new HashMap();
            Map itemMap4 = new HashMap();

            itemMap.put("name" , "总"+(String)map.get("name"));
            itemMap.put("unit" , map.get("unit"));
            itemMap.put("rate" , map.get("rate"));
            itemMap.put("total", sumItemTotal);
            itemMap.put("lastMonth", sumItemLastMonth);
            itemMap.put("lastYear", sumItemLastYear);

            // 根据传入类型显示对应内容
            if(type.equals(Constant.ITEM_TYPE_ELE)) {
                itemMap2.put("name" , "当量标煤");
                itemMap2.put("unit" , "吨");
                itemMap2.put("rate" , Constant.COAL_ELECTRICITY);
                itemMap2.put("total", sumItemTotal*Constant.COAL_ELECTRICITY);
                itemMap2.put("lastMonth", sumItemLastMonth*Constant.COAL_ELECTRICITY);
                itemMap2.put("lastYear", sumItemLastYear*Constant.COAL_ELECTRICITY);
            } else if (type.equals(Constant.ITEM_TYPE_WATER)) {
                itemMap2.put("name" , "当量标煤");
                itemMap2.put("unit" , "Kg");
                itemMap2.put("rate" , Constant.COAL_WATER);
                itemMap2.put("total", sumItemTotal*Constant.COAL_WATER);
                itemMap2.put("lastMonth", sumItemLastMonth*Constant.COAL_WATER);
                itemMap2.put("lastYear", sumItemLastYear*Constant.COAL_WATER);
            } else if (type.equals(Constant.ITEM_TYPE_GAS)) {
                itemMap2.put("name" , "当量标煤");
                itemMap2.put("unit" , "Kg");
                itemMap2.put("rate" , Constant.COAL_GAS);
                itemMap2.put("total", sumItemTotal*Constant.COAL_GAS);
                itemMap2.put("lastMonth", sumItemLastMonth*Constant.COAL_GAS);
                itemMap2.put("lastYear", sumItemLastYear*Constant.COAL_GAS);
            } else if (type.equals(Constant.ITEM_TYPE_STEAM)) {
                itemMap2.put("name" , "当量标煤");
                itemMap2.put("unit" , "Kg");
                itemMap2.put("rate" , Constant.COAL_STEAM);
                itemMap2.put("total", sumItemTotal*Constant.COAL_STEAM);
                itemMap2.put("lastMonth", sumItemLastMonth*Constant.COAL_STEAM);
                itemMap2.put("lastYear", sumItemLastYear*Constant.COAL_STEAM);
            }

            itemMap3.put("name" , "能耗密度");
            itemMap3.put("unit" , "KWH/M2");
            itemMap3.put("rate" , map.get("rate"));
            itemMap3.put("total", sumItemTotal/group.getArea());
            itemMap3.put("lastMonth", sumItemLastMonth/group.getArea());
            itemMap3.put("lastYear", sumItemLastYear/group.getArea());

            itemMap4.put("name" , "费用");
            itemMap4.put("unit" , "元");
            itemMap4.put("rate" , map.get("rate"));
            itemMap4.put("total", sumItemTotal*Float.valueOf(rate));
            itemMap4.put("lastMonth", sumItemLastMonth*Float.valueOf(rate));
            itemMap4.put("lastYear", sumItemLastYear*Float.valueOf(rate));

            summaryMap.add(itemMap);
            summaryMap.add(itemMap2);
            summaryMap.add(itemMap3);
            summaryMap.add(itemMap4);

            res.makeSuccess(summaryMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    // 10. 某建筑【某种表】子集 按【时/日/月/年】数据
    // 无 parent  -> 对应能耗分项汇总数据 -> 可根据传入的时间拿到同比数据
    // 有 parent  -> 对应能耗分项中某个分项的子项
    @RequestMapping("/getEnergyChartDataByType")
    @ResponseBody
    public Object getEnergyChartDataByType(@RequestParam("buildingId") Integer buildingId,
                                           @RequestParam("from") String from,
                                           @RequestParam("to") String to,
                                           @RequestParam("type") String type,
                                           @RequestParam("energyType") String energyType,
                                           HttpServletRequest request) {
        Response res = new Response();
        try {
            String parent = request.getParameter("parent");

            // 最终返回结果集
            Map chartMap = new HashMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            if(null == parent) {
                // 当前时间区间数据
                Map<String, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);
                String curType = energyType;
                Map curTypeGroupParent = buildingService.getItemGroupIdByEnergyType(buildingId, energyType, Constant.SUM_TYPE); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroupParent ? Integer.valueOf(curTypeGroupParent.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = buildingService.getItemGroupById(Integer.valueOf(curGroupId));

                Map curMap = new HashMap();
                curMap.put("datas", curList);
                curMap.put("key", "recorded_at");
                curMap.put("val", "total_val");
                curMap.put("name", curBaseMap.get("name"));
                curMap.put("prop_area", group.getArea());
                curMap.put("area", group.getArea());
                curMap.put("fee_policy", curBaseMap.get("rate"));

                chartMap.put(curType, curMap);

            } else {
                Map curBaseMap = baseMap.get(energyType);
                Integer parentId = Integer.valueOf(parent);
                ItemGroup group = buildingService.getItemGroupById(parentId);
                // 子集类汇总
                List<Map> groupChilds = buildingService.getItemGroupChildsById(parentId);

                // 是否包含子类
                if(null == groupChilds || groupChilds.size() <= 0) {
                    // 无子类, 拿到当前类的汇总数据
                    List<Map> items = buildingService.getItemsByGroupId(group.getId());
                    List<String> curItemIdList = new ArrayList<>();
                    for(int j=0; j<items.size(); j++) {
                        Map curItem = items.get(j);
                        if(null != curItem) {
                            curItemIdList.add(curItem.get("id").toString());
                        }
                    }

                    List<Map> curList = new ArrayList<>();
                    if(curItemIdList.size() > 0) {
                        curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                    }
                    Integer area = !"".equals(group.getArea()) ? group.getArea() : group.getArea();

                    Map curMap = new HashMap();
                    curMap.put("datas", curList);
                    curMap.put("key", "recorded_at");
                    curMap.put("val", "total_val");
                    curMap.put("name", group.getName());
                    curMap.put("prop_area", area);
                    curMap.put("area", area);
                    curMap.put("fee_policy", curBaseMap.get("rate"));

                    chartMap.put(group.getId(), curMap);

                } else {
                    // 有子类
                    for(int i=0; i<groupChilds.size(); i++) {
                        Map curGroup = groupChilds.get(i);
                        List<Map> items = buildingService.getItemsByGroupId(Integer.valueOf(curGroup.get("id").toString()));
                        List<String> curItemIdList = new ArrayList<>();
                        if(null != items) {
                            for(int j=0; j<items.size(); j++) {
                                Map curItem = items.get(j);
                                if(null != curItem) {
                                    curItemIdList.add(curItem.get("id").toString());
                                }
                            }
                        }
                        List<Map> curList = new ArrayList<>();
                        if(curItemIdList.size() > 0) {
                            curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                        }

                        Integer area = !"".equals(curGroup.get("area")) ? Integer.valueOf(curGroup.get("area").toString()) : group.getArea();

                        Map curMap = new HashMap();
                        curMap.put("datas", curList);
                        curMap.put("key", "recorded_at");
                        curMap.put("val", "total_val");
                        curMap.put("name", curGroup.get("name"));
                        curMap.put("prop_area", area);
                        curMap.put("area", area);
                        curMap.put("fee_policy", curBaseMap.get("rate"));

                        chartMap.put(curGroup.get("id"), curMap);
                    }
                }
            }

            res.makeSuccess(chartMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 10.1 某建筑【某种表】子集 按【时/日/月/年】数据 -> 表格
    // 无 parent  -> 对应能耗分项汇总数据 -> 可根据传入的时间拿到同比数据
    // 有 parent  -> 对应能耗分项中某个分项的子项
    @RequestMapping("/getEnergyTableDataByType")
    @ResponseBody
    public Object getEnergyTableDataByType(@RequestParam("buildingId") Integer buildingId,
                                           @RequestParam("from") String from,
                                           @RequestParam("to") String to,
                                           @RequestParam("type") String type,
                                           @RequestParam("energyType") String energyType,
                                           HttpServletRequest request) {
        Response res = new Response();
        try {
            String parent = request.getParameter("parent");

            // 最终返回结果集
            Map chartMap = new HashMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 输出结果
            List<List<String>> dataList = new ArrayList<>();

            if(null == parent) {
                // 当前时间区间数据
                Map<String, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);
                String curType = energyType;
                Map curTypeGroupParent = buildingService.getItemGroupIdByEnergyType(buildingId, energyType, Constant.SUM_TYPE); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroupParent ? Integer.valueOf(curTypeGroupParent.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = buildingService.getItemGroupById(Integer.valueOf(curGroupId));

                // 表头
                List<String> titleList = new ArrayList<>();
                titleList.add("日期");

                // 先生成第一列时间数据
                SimpleDateFormat formatter = null;
                if(type.equals(Constant.BY_HOUR)) {
                    formatter = new SimpleDateFormat("yyyy-MM-dd HH");
                } else if(type.equals(Constant.BY_MONTH)) {
                    formatter = new SimpleDateFormat("yyyy-MM");
                } else if(type.equals(Constant.BY_YEAR)) {
                    formatter = new SimpleDateFormat("yyyy");
                } else {
                    formatter = new SimpleDateFormat("yyyy-MM-dd");
                }
                Calendar time = Calendar.getInstance();
                Date fromDate = formatter.parse(from);
                Date toDate = formatter.parse(to);

                Calendar cf = Calendar.getInstance();
                Calendar ct = Calendar.getInstance();
                cf.setTime(fromDate);
                ct.setTime(toDate);

                int xlen = 0;

                if(type.equals(Constant.BY_HOUR)) {
                    xlen = (int) ((ct.getTime().getTime() - cf.getTime().getTime()) / (1000*3600));
                } else if(type.equals(Constant.BY_MONTH)) {
                    xlen = ct.get(Calendar.MONTH) - cf.get(Calendar.MONTH) + 12 * (ct.get(Calendar.YEAR) - cf.get(Calendar.YEAR));
                } else if(type.equals(Constant.BY_YEAR)) {
                    xlen = ct.get(Calendar.YEAR) - cf.get(Calendar.YEAR);
                } else {
                    xlen = (int) ((ct.getTime().getTime() - cf.getTime().getTime()) / (1000*3600*24));
                }

                for(int i=0; i<=xlen; i++) {
                    time.setTime(fromDate);
                    if(type.equals(Constant.BY_HOUR)) {
                        time.add(Calendar.HOUR, i);
                    } else if(type.equals(Constant.BY_MONTH)) {
                        time.add(Calendar.MONTH, i);
                    } else if(type.equals(Constant.BY_YEAR)) {
                        time.add(Calendar.YEAR, i);
                    } else {
                        time.add(Calendar.DATE, i);
                    }
                    String date = formatter.format(time.getTime());
                    List<String> row = new ArrayList<String>();;
                    row.add(date);
                    dataList.add(row);
                }

                DecimalFormat df2 = new DecimalFormat("###.0000");
                titleList.add((String)curBaseMap.get("name"));
                titleList.add((String)curBaseMap.get("name")+"密度");
                titleList.add((String)curBaseMap.get("name")+"费用");
                String rate = null != curBaseMap.get("rate") ? curBaseMap.get("rate").toString() : null ;

                for(int k = 0; k < dataList.size(); k++) {
                    List line = dataList.get(k);
                    Boolean hasInsert = false;
                    for(int j = 0; j < curList.size(); j++) {
                        Map row = curList.get(j);
                        if(line.get(0).toString().equals(row.get("recorded_at"))) {
                            line.add(row.get("total_val"));
                            float totalValAvg = Float.valueOf(row.get("total_val").toString()) / Float.valueOf(group.getArea());
                            line.add(totalValAvg);
                            if(null != rate) {
                                float fee = Float.valueOf(row.get("total_val").toString()) * Float.valueOf(rate);
                                line.add(fee);
                            } else {
                                line.add(0);
                            }
                            hasInsert = true;
                            break;
                        };
                    }
                    if(!hasInsert) {
                        line.add("0");
                        line.add("0");
                        line.add("0");
                    }
                }

                dataList.add(0, titleList);

            } else {
                Integer parentId = Integer.valueOf(parent);
                ItemGroup group = buildingService.getItemGroupById(parentId);
                // 子集类汇总
                List<Map> groupChilds = buildingService.getItemGroupChildsById(parentId);
                Map curBaseMap = baseMap.get(energyType);


                // 是否包含子类
                if(null == groupChilds || groupChilds.size() <= 0) {
                    // 无子类, 拿到当前类的汇总数据
                    List<String> titleList = new ArrayList<>();
                    titleList.add("日期");

                    // 先生成第一列时间数据
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    Calendar time = Calendar.getInstance();
                    Date fromDate = formatter.parse(from);
                    Date toDate = formatter.parse(to);
                    int days = (int) ((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24));

                    for (int j = 0; j <= days; j++) {
                        time.setTime(fromDate);
                        time.add(Calendar.DATE, j);
                        String date = formatter.format(time.getTime());
                        List<String> row = new ArrayList<String>();
                        ;
                        row.add(date);
                        dataList.add(row);
                    }

                    DecimalFormat df2 = new DecimalFormat("###.0000");

                    List<Map> items = buildingService.getItemsByGroupId(group.getId());
                    List<String> curItemIdList = new ArrayList<>();
                    for(int j=0; j<items.size(); j++) {
                        Map curItem = items.get(j);
                        if(null != curItem) {
                            curItemIdList.add(curItem.get("id").toString());
                        }
                    }

                    List<Map> curList = new ArrayList<>();
                    if(curItemIdList.size() > 0) {
                        curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                    }
                    Integer area = !"".equals(group.getArea()) ? group.getArea() : group.getArea();
                    titleList.add((String) group.getName());
                    titleList.add((String) group.getName()+"密度");

                    for (int k = 0; k < dataList.size(); k++) {
                        List line = dataList.get(k);
                        Boolean hasInsert = false;
                        for (int j = 0; j < curList.size(); j++) {
                            Map row = curList.get(j);
                            if (line.get(0).toString().equals(row.get("recorded_at"))) {
                                line.add(row.get("total_val"));
                                float totalValAvg = Float.valueOf(row.get("total_val").toString()) / Float.valueOf(group.getArea());
                                line.add(totalValAvg);
//                                if(null != rate) {
//                                    float fee = Float.valueOf(row.get("total_val").toString()) * Float.valueOf(rate);
//                                    line.add(fee);
//                                } else {
//                                    line.add(0);
//                                }
                                hasInsert = true;
                                break;
                            }
                        }
                        if (!hasInsert) {
                            line.add("0");
                            line.add("0");
//                                line.add("0");
                        }
                    }
                    dataList.add(0, titleList);

                } else {
                    // 有子类
                    // 表头
                    List<String> titleList = new ArrayList<>();
                    titleList.add("日期");

                    // 先生成第一列时间数据
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    Calendar time = Calendar.getInstance();
                    Date fromDate = formatter.parse(from);
                    Date toDate = formatter.parse(to);
                    int days = (int) ((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24));

                    for (int j = 0; j <= days; j++) {
                        time.setTime(fromDate);
                        time.add(Calendar.DATE, j);
                        String date = formatter.format(time.getTime());
                        List<String> row = new ArrayList<String>();
                        ;
                        row.add(date);
                        dataList.add(row);
                    }

                    DecimalFormat df2 = new DecimalFormat("###.0000");

                    for (int i = 0; i < groupChilds.size(); i++) {
                        Map curGroup = groupChilds.get(i);
                        List<Map> items = buildingService.getItemsByGroupId(Integer.valueOf(curGroup.get("id").toString()));
                        List<String> curItemIdList = new ArrayList<>();
                        for (int j = 0; j < items.size(); j++) {
                            Map curItem = items.get(j);
                            if (null != curItem) {
                                curItemIdList.add(curItem.get("id").toString());
                            }
                        }
                        List<Map> curList = new ArrayList<>();
                        if (curItemIdList.size() > 0) {
                            curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                        }

                        Integer area = !"".equals(curGroup.get("area")) ? Integer.valueOf(curGroup.get("area").toString()) : group.getArea();

                        titleList.add((String) curGroup.get("name"));
                        titleList.add((String)curGroup.get("name")+"密度");
//                        titleList.add((String)curGroup.get("name")+"费用");
                        String rate = null != curBaseMap.get("rate") ? curBaseMap.get("rate").toString() : null;

                        for (int k = 0; k < dataList.size(); k++) {
                            List line = dataList.get(k);
                            Boolean hasInsert = false;
                            for (int j = 0; j < curList.size(); j++) {
                                Map row = curList.get(j);
                                if (line.get(0).toString().equals(row.get("recorded_at"))) {
                                    line.add(row.get("total_val"));
                                    float totalValAvg = Float.valueOf(row.get("total_val").toString()) / Float.valueOf(group.getArea());
                                    line.add(totalValAvg);
//                                    if(null != rate) {
//                                        float fee = Float.valueOf(row.get("total_val").toString()) * Float.valueOf(rate);
//                                        line.add(fee);
//                                    } else {
//                                        line.add(0);
//                                    }
                                    hasInsert = true;
                                    break;
                                }
                                ;
                            }
                            if (!hasInsert) {
                                line.add("0");
                                line.add("0");
//                                line.add("0");
                            }
                        }
                    }

                    dataList.add(0, titleList);
                }
            }

            res.makeSuccess(dataList);

        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @RequestMapping("/recordEnergyDatas")
    @ResponseBody
    public Object getEnergyTableDataByType(){
        Response res = new Response();
        try {
            buildingService.recordEnergyDatas();
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
