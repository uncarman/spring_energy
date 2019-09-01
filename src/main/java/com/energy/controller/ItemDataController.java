package com.energy.controller;

import com.energy.entity.BasicData;
import com.energy.entity.Building;
import com.energy.entity.Item;
import com.energy.entity.ItemGroup;
import com.energy.service.BuildingService;
import com.energy.service.ItemDataService;
import com.energy.service.ItemService;
import com.energy.utils.BaseUtil;
import com.energy.utils.Constant;
import com.energy.utils.DateUtil;
import com.energy.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("api")
public class ItemDataController {

    @Resource
    private BuildingService buildingService = null;
    @Resource
    private ItemService itemService = null;
    @Resource
    private ItemDataService itemDataService = null;

    // 【多个设备】按【时/日/月/年】汇总数据
    // type: 选填: 时/日/月/年
    // from/to 格式需要对应type
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
            List<Map> list = itemDataService.getItemDatasByDate(itemList, fromDate, toDate, type);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 某建筑汇总数据【四种表】
    @RequestMapping("/getBuildingSummaryTotalData")
    @ResponseBody
    public Object getBuildingSummaryTotalData(@RequestParam("buildingId") Integer buildingId) {
        Response res = new Response();
        try {
            // 默认按天汇总
            SimpleDateFormat formatter = DateUtil.typeToFormatter(Constant.BY_DAY);
            Calendar time = Calendar.getInstance();

            // 总量第一天和最后一天
            String dateStart = DateUtil.MIN_DATE;
            String dateEnd = DateUtil.MAX_DATE;
            // 拿到本月的第一天和最后一天
            String curMonthStart = formatter.format(DateUtil.monthFirstDay(time.getTime()));
            String curMonthEnd = formatter.format(DateUtil.monthLastDay(time.getTime()));
            // 拿到本年的第一天和最后一天
            String curYearStart = formatter.format(DateUtil.yearFirstDay(time.getTime()));
            String curYearEnd = formatter.format(DateUtil.yearLastDay(time.getTime()));
            // 拿到前一个月的第一天和最后一天
            String lastMonthStart = formatter.format(DateUtil.monthFirstDay(DateUtil.monthAdd(time.getTime(), -1)));
            String lastMonthEnd = formatter.format(DateUtil.monthLastDay(DateUtil.monthAdd(time.getTime(), -1)));
            // 拿到前一年的第一天和最后一天
            String lastYearStart = formatter.format(DateUtil.yearFirstDay(DateUtil.yearAdd(time.getTime(), -1)));
            String lastYearEnd = formatter.format(DateUtil.yearLastDay(DateUtil.yearAdd(time.getTime(), -1)));

            // 返回结果集
            Map<String, Object> dataMap;
            List<Map> summaryMap = new ArrayList<>();
            Map<String, Object> chartMap;

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // ------------- 汇总数据 ---------------//
            // 默认四种表： 电，水，燃气，蒸汽
            List<String> energyTypes = BaseUtil.energyTypes();
            for(String curType : energyTypes) {
                ItemGroup curTypeGroup = itemService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // [能耗分项]的总类
                Integer curGroupId = null != curTypeGroup ? curTypeGroup.getId() : -1;
                String curItemIds = groupItems.get(curGroupId)+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                float sumItemTotal = itemDataService.getItemsSummaryVal(curItemIdList, dateStart, dateEnd);
                float sumItemCurMonth = itemDataService.getItemsSummaryVal(curItemIdList, curMonthStart, curMonthEnd);
                float sumItemCurYear = itemDataService.getItemsSummaryVal(curItemIdList, curYearStart, curYearEnd);
                float sumItemLastMonth = itemDataService.getItemsSummaryVal(curItemIdList, lastMonthStart, lastMonthEnd);
                float sumItemLastYear = itemDataService.getItemsSummaryVal(curItemIdList, lastYearStart, lastYearEnd);
                ItemGroup group = itemService.getItemGroupById(curGroupId);
                Map baseInfo = baseMap.get(curType);

                Map itemMap = new HashMap();
                itemMap.put("type" , curType);
                itemMap.put("typeName" , (String)baseInfo.get("name"));
                itemMap.put("name" , "总"+(String)baseInfo.get("name"));
                itemMap.put("unit" , baseInfo.get("unit"));
                itemMap.put("rate" , baseInfo.get("rate"));
                itemMap.put("area", group.getArea());
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

    // 某建筑汇总数据【四种表】按【时/日/月/年】图表
    @RequestMapping("/getBuildingChartDataByType")
    @ResponseBody
    public Object getBuildingChartDataByType(@RequestParam("buildingId") Integer buildingId,
                                             @RequestParam("from") String from,
                                             @RequestParam("to") String to,
                                             @RequestParam("type") String type,
                                             HttpServletRequest request) {
        Response res = new Response();
        try {
            Map chartMap = new HashMap();

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map<Integer, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // 默认四种表： 电，水，燃气，蒸汽
            List<String> energyTypes = BaseUtil.energyTypes();
            for(String curType : energyTypes) {
                // 拿到当前能耗类型的零级分组
                ItemGroup curTypeGroup = itemService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroup ? curTypeGroup.getId() : Integer.valueOf(-1);
                // 拿到当前类型的设备Id
                String curItemIds = groupItems.get(curGroupId)+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                Map baseInfo = baseMap.get(curType);
                ItemGroup group = itemService.getItemGroupById(curGroupId);
                float rate = null != baseInfo.get("rate") ? Float.valueOf(baseInfo.get("rate").toString()) : 1;

                Map curMap = new HashMap();
                curMap.put("datas", curList);
                curMap.put("key", "recordedAt");
                curMap.put("val", "totalVal");
                curMap.put("name", baseInfo.get("name"));
                curMap.put("area", group.getArea());
                curMap.put("rate", rate);

                chartMap.put(curType, curMap);
            }

            res.makeSuccess(chartMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 某建筑汇总数据【四种表】按【时/日/月/年】表格
    @RequestMapping("/getBuildingTableDataByType")
    @ResponseBody
    public Object getBuildingTableDataByType(@RequestParam("buildingId") Integer buildingId,
                                             @RequestParam("from") String from,
                                             @RequestParam("to") String to,
                                             @RequestParam("type") String type,
                                             HttpServletRequest request) {
        Response res = new Response();
        try {

            Building building = buildingService.getBuildingById(buildingId);

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map<Integer, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // 默认四种类型： 电，水，燃气，蒸汽
            List<String> energyTypes = BaseUtil.energyTypes();

            // 表头
            List<String> titleList = new ArrayList<>();
            titleList.add("日期");
            // 先生成第一列时间数据
            SimpleDateFormat formatter = DateUtil.typeToFormatter(type);
            Date fromDate = formatter.parse(from);
            Date toDate = formatter.parse(to);
            List<List> dataList = DateUtil.dateList(fromDate, toDate, type);

            for(String curType : energyTypes) {
                ItemGroup curTypeGroup = itemService.getItemGroupIdByEnergyType(buildingId, curType, sumType);
                Integer curGroupId = null != curTypeGroup ? curTypeGroup.getId() : -1;
                String curItemIds = groupItems.get(curGroupId)+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = itemService.getItemGroupById(curGroupId);
                DecimalFormat df2 = new DecimalFormat("###.0000");

                titleList.add((String)curBaseMap.get("name"));
                titleList.add(curBaseMap.get("name")+"密度");
                titleList.add(curBaseMap.get("name")+"费用");
                float area = group.getArea() > 0 ? group.getArea() : building.getArea();
                String rate = null != curBaseMap.get("rate") ? curBaseMap.get("rate").toString() : "1" ;
                for(List line : dataList) {
                    Boolean hasInsert = false;
                    if(null != curList && !curList.isEmpty()) {
                        for (Map row : curList) {
                            if (line.get(0).toString().equals(row.get("recordedAt"))) {
                                line.add(row.get("totalVal"));
                                line.add(df2.format(Float.valueOf(row.get("totalVal").toString()) / area));
                                if (null != rate) {
                                    float fee = Float.valueOf(row.get("totalVal").toString()) * Float.valueOf(rate);
                                    line.add(fee);
                                } else {
                                    line.add(0);
                                }
                                hasInsert = true;
                                break;
                            }
                        }
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
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 某建筑【某种表】汇总数据
    // type = 表类型 eg: 01
    // TODO 优化
    @RequestMapping("/getEnergyTotalDataByType")
    @ResponseBody
    public Object getEnergyTotalDataByType(@RequestParam("buildingId") Integer buildingId,
                                           @RequestParam("type") String type,
                                           HttpServletRequest request) {
        Response res = new Response();
        try {
            // 默认按天汇总
            SimpleDateFormat formatter = DateUtil.typeToFormatter(Constant.BY_DAY);
            Calendar time = Calendar.getInstance();

            // 总量第一天和最后一天
            String dateStart = DateUtil.MIN_DATE;
            String dateEnd = DateUtil.MAX_DATE;
            // 拿到前一个月的第一天和最后一天
            String lastMonthStart = formatter.format(DateUtil.monthFirstDay(DateUtil.monthAdd(time.getTime(), -1)));
            String lastMonthEnd = formatter.format(DateUtil.monthLastDay(DateUtil.monthAdd(time.getTime(), -1)));
            // 拿到前一年的第一天和最后一天
            String lastYearStart = formatter.format(DateUtil.yearFirstDay(DateUtil.yearAdd(time.getTime(), -1)));
            String lastYearEnd = formatter.format(DateUtil.yearLastDay(DateUtil.yearAdd(time.getTime(), -1)));

            // 返回结果集
            List<Map> summaryMap = new ArrayList<>();

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // ------------- 汇总数据 ---------------//
            ItemGroup curTypeGroupParent = itemService.getItemGroupIdByEnergyType(buildingId, type, Constant.SUM_TYPE); // Integer.valueOf(curType).toString();
            Integer curGroupId = null != curTypeGroupParent ? curTypeGroupParent.getId() : -1;
            String curItemIds = groupItems.get(curGroupId)+"";
            List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
            float sumItemTotal = itemDataService.getItemsSummaryVal(curItemIdList, dateStart, dateEnd);
            float sumItemLastMonth = itemDataService.getItemsSummaryVal(curItemIdList, lastMonthStart, lastMonthEnd);
            float sumItemLastYear = itemDataService.getItemsSummaryVal(curItemIdList, lastYearStart, lastYearEnd);
            ItemGroup group = itemService.getItemGroupById(curGroupId);
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
            itemMap3.put("unit" , map.get("unit")+"/M2");
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

    // 【某种表】汇总数据按【时/日/月/年】图表
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
            Building building = buildingService.getBuildingById(buildingId);

            String parent = request.getParameter("parent");
            String viewType = request.getParameter("viewType");

            // 最终返回结果集
            Map chartMap = new HashMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            if(null == parent) {
                // 当前时间区间数据
                Map<Integer, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);
                String curType = energyType;
                ItemGroup curTypeGroupParent = itemService.getItemGroupIdByEnergyType(buildingId, energyType, Constant.SUM_TYPE); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroupParent ? curTypeGroupParent.getId() : -1;
                String curItemIds = groupItems.get(curGroupId)+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = itemService.getItemGroupById(curGroupId);

                if(null != curList && !curList.isEmpty()) {
                    for(Map item : curList) {
                        item.put("totalValAvg", Float.valueOf(item.get("totalVal").toString())/(float)group.getArea());
                    }
                }

                Map curMap = new HashMap();
                curMap.put("datas", curList);
                curMap.put("key", "recordedAt");
                if("avg".equals(viewType)) {
                    curMap.put("name", curBaseMap.get("name")+"密度");
                    curMap.put("val", "totalValAvg");
                } else {
                    curMap.put("name", curBaseMap.get("name"));
                    curMap.put("val", "totalVal");
                }
                curMap.put("area", group.getArea());

                chartMap.put(curType, curMap);

            } else {
                Integer parentId = Integer.valueOf(parent);
                ItemGroup group = itemService.getItemGroupById(parentId);
                // 子集类汇总
                List<ItemGroup> groupChilds = itemService.getItemGroupChildsById(parentId);

                // 是否包含子类
                if(null == groupChilds || groupChilds.isEmpty()) {
                    // 无子类, 拿到当前类的汇总数据
                    List<Item> items = itemService.getItemsByGroupId(group.getId());
                    List<String> curItemIdList = new ArrayList<>();
                    for(Item item : items) {
                        curItemIdList.add(item.getId().toString());
                    }

                    List<Map> curList = new ArrayList<>();
                    if(curItemIdList.size() > 0) {
                        curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                    }
                    float area = group.getArea() > 0 ? group.getArea() : building.getArea();

                    Map curMap = new HashMap();
                    curMap.put("datas", curList);
                    curMap.put("key", "recordedAt");
                    curMap.put("val", "totalVal");
                    curMap.put("name", group.getName());
                    curMap.put("area", area);

                    chartMap.put(group.getId(), curMap);

                } else {
                    // 有子类
                    for(ItemGroup curGroup : groupChilds) {
                        List<Item> items = itemService.getItemsByGroupId(curGroup.getId());
                        List<String> curItemIdList = new ArrayList<>();
                        if(null != items && !items.isEmpty()) {
                            for(Item item : items) {
                                curItemIdList.add(item.getId().toString());
                            }
                        }
                        List<Map> curList = new ArrayList<>();
                        if(curItemIdList.size() > 0) {
                            curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                        }

                        float area = curGroup.getArea() > 0 ? curGroup.getArea()
                                         : (group.getArea() > 0 ? group.getArea() : building.getArea()) ;

                        Map curMap = new HashMap();
                        curMap.put("datas", curList);
                        curMap.put("key", "recordedAt");
                        curMap.put("val", "totalVal");
                        curMap.put("name", curGroup.getName());
                        curMap.put("area", area);

                        chartMap.put(curGroup.getId(), curMap);
                    }
                }
            }

            res.makeSuccess(chartMap);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 【某种表】汇总数据按【时/日/月/年】表格
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
            Building building = buildingService.getBuildingById(buildingId);

            String parent = request.getParameter("parent");

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 输出结果
            List<List> dataList = null;

            if(null == parent) {
                // 当前时间区间数据
                Map<Integer, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);
                String curType = energyType;
                ItemGroup curTypeGroupParent = itemService.getItemGroupIdByEnergyType(buildingId, energyType, Constant.SUM_TYPE); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroupParent ? curTypeGroupParent.getId() : -1;
                String curItemIds = groupItems.get(curGroupId)+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                Map curBaseMap = baseMap.get(curType);
                ItemGroup group = itemService.getItemGroupById(curGroupId);

                // 表头
                List<String> titleList = new ArrayList<>();
                titleList.add("日期");

                // 先生成第一列时间数据
                SimpleDateFormat formatter = DateUtil.typeToFormatter(type);
                Date fromDate = formatter.parse(from);
                Date toDate = formatter.parse(to);
                dataList = DateUtil.dateList(fromDate, toDate, type);

                titleList.add(curBaseMap.get("name")+"");
                titleList.add(curBaseMap.get("name")+"密度");
                titleList.add(curBaseMap.get("name")+"费用");
                String rate = null != curBaseMap.get("rate") ? curBaseMap.get("rate").toString() : null ;

                for(int k = 0; k < dataList.size(); k++) {
                    List line = dataList.get(k);
                    Boolean hasInsert = false;
                    for(int j = 0; j < curList.size(); j++) {
                        Map row = curList.get(j);
                        if(line.get(0).toString().equals(row.get("recordedAt"))) {
                            line.add(row.get("totalVal"));
                            float totalValAvg = Float.valueOf(row.get("totalVal").toString()) / group.getArea();
                            line.add(totalValAvg);
                            if(null != rate) {
                                float fee = Float.valueOf(row.get("totalVal").toString()) * Float.valueOf(rate);
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
                ItemGroup group = itemService.getItemGroupById(parentId);
                // 子集类汇总
                List<ItemGroup> groupChilds = itemService.getItemGroupChildsById(parentId);
                Map curBaseMap = baseMap.get(energyType);

                // 是否包含子类
                if(null == groupChilds || groupChilds.isEmpty()) {
                    // 无子类, 拿到当前类的汇总数据
                    List<String> titleList = new ArrayList<>();
                    titleList.add("日期");

                    // 先生成第一列时间数据
                    SimpleDateFormat formatter = DateUtil.typeToFormatter(type);
                    Date fromDate = formatter.parse(from);
                    Date toDate = formatter.parse(to);
                    dataList = DateUtil.dateList(fromDate, toDate, type);

                    List<Item> items = itemService.getItemsByGroupId(group.getId());
                    List<String> curItemIdList = new ArrayList<>();
                    if(null != items && !items.isEmpty()) {
                        for(Item item : items) {
                            curItemIdList.add(item.getId().toString());
                        }
                    }

                    List<Map> curList = new ArrayList<>();
                    if(!curItemIdList.isEmpty()) {
                        curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                    }
                    float area = group.getArea() > 0 ? group.getArea() : building.getArea();

                    titleList.add(group.getName());
                    titleList.add(group.getName()+"密度");

                    for (int k = 0; k < dataList.size(); k++) {
                        List line = dataList.get(k);
                        Boolean hasInsert = false;
                        if(null != curList && !curList.isEmpty()) {
                            for (int j = 0; j < curList.size(); j++) {
                                Map row = curList.get(j);
                                if (line.get(0).toString().equals(row.get("recordedAt"))) {
                                    line.add(row.get("totalVal"));
                                    float totalValAvg = Float.valueOf(row.get("totalVal").toString()) / area;
                                    line.add(totalValAvg);
                                    hasInsert = true;
                                    break;
                                }
                            }
                        }
                        // 补充 0
                        if (!hasInsert) {
                            line.add(0);
                            line.add(0);
                        }
                    }
                    // 补充标题
                    dataList.add(0, titleList);
                } else {
                    // 有子类
                    // 表头
                    List<String> titleList = new ArrayList<>();
                    titleList.add("日期");

                    // 先生成第一列时间数据
                    SimpleDateFormat formatter = DateUtil.typeToFormatter(type);
                    Date fromDate = formatter.parse(from);
                    Date toDate = formatter.parse(to);
                    dataList = DateUtil.dateList(fromDate, toDate, type);

                    for (int i = 0; i < groupChilds.size(); i++) {
                        ItemGroup curGroup = groupChilds.get(i);
                        List<Item> items = itemService.getItemsByGroupId(curGroup.getId());
                        List<String> curItemIdList = new ArrayList<>();
                        if(null != items && !items.isEmpty()) {
                            for(Item item : items) {
                                curItemIdList.add(item.getId().toString());
                            }
                        }
                        List<Map> curList = new ArrayList<>();
                        if (curItemIdList.size() > 0) {
                            curList = itemDataService.getItemDatasByDate(curItemIdList, from, to, type);
                        }

                        float area = curGroup.getArea() > 0 ? curGroup.getArea()
                                : (group.getArea() > 0 ? group.getArea() : building.getArea()) ;

                        titleList.add((String) curGroup.getName());
                        titleList.add((String)curGroup.getName()+"密度");
                        String rate = null != curBaseMap.get("rate") ? curBaseMap.get("rate").toString() : null;

                        for (int k = 0; k < dataList.size(); k++) {
                            List line = dataList.get(k);
                            Boolean hasInsert = false;
                            if(null != curList && !curList.isEmpty()) {
                                for (int j = 0; j < curList.size(); j++) {
                                    Map row = curList.get(j);
                                    if (line.get(0).toString().equals(row.get("recordedAt"))) {
                                        line.add(row.get("totalVal"));
                                        float totalValAvg = Float.valueOf(row.get("totalVal").toString()) / area;
                                        line.add(totalValAvg);
                                        hasInsert = true;
                                        break;
                                    }
                                }
                            }
                            // 补充 0
                            if (!hasInsert) {
                                line.add("0");
                                line.add("0");
                            }
                        }
                    }
                    // 补充标题
                    dataList.add(0, titleList);
                }
            }

            res.makeSuccess(dataList);

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
