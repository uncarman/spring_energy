package com.energy.controller;

import com.energy.entity.BasicData;
import com.energy.entity.ItemGroup;
import com.energy.service.BuildingService;
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
            Map<String, Object> dataMap = new HashMap<>();
            List<Map> summaryMap = new ArrayList<>();
            Map<String, Object> chartMap = new HashMap<>();

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

            // ------------- 汇总数据 ---------------//
            // 默认四种表： 电，水，燃气，蒸汽
            List<String> energyTypes = BaseUtil.energyTypes();
            for(String curType : energyTypes) {
                Map curTypeGroup = buildingService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // [能耗分项]的总类
                Integer curGroupId = null != curTypeGroup ? Integer.valueOf(curTypeGroup.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                float sumItemTotal = buildingService.getItemsSummaryVal(curItemIdList, dateStart, dateEnd);
                float sumItemCurMonth = buildingService.getItemsSummaryVal(curItemIdList, curMonthStart, curMonthEnd);
                float sumItemCurYear = buildingService.getItemsSummaryVal(curItemIdList, curYearStart, curYearEnd);
                float sumItemLastMonth = buildingService.getItemsSummaryVal(curItemIdList, lastMonthStart, lastMonthEnd);
                float sumItemLastYear = buildingService.getItemsSummaryVal(curItemIdList, lastYearStart, lastYearEnd);
                ItemGroup group = buildingService.getItemGroupById(curGroupId);
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

            // 默认四种表： 电，水，燃气，蒸汽
            List<String> energyTypes = BaseUtil.energyTypes();
            for(String curType : energyTypes) {
                Map curTypeGroup = buildingService.getItemGroupIdByEnergyType(buildingId, curType, sumType); // Integer.valueOf(curType).toString();
                Integer curGroupId = null != curTypeGroup ? Integer.valueOf(curTypeGroup.get("id").toString()) : -1;
                String curItemIds = groupItems.get(String.valueOf(curGroupId))+"";
                List<String> curItemIdList = Arrays.asList(curItemIds.split(","));
                List<Map> curList = buildingService.getItemDatasByDate(curItemIdList, from, to, type);
                Map baseInfo = baseMap.get(curType);
                ItemGroup group = buildingService.getItemGroupById(curGroupId);

                Map curMap = new HashMap();
                curMap.put("datas", curList);
                curMap.put("key", "recorded_at");
                curMap.put("val", "total_val");
                curMap.put("name", baseInfo.get("name"));
                curMap.put("area", group.getArea());
                curMap.put("fee_policy", baseInfo.get("rate"));

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

            // 可以计算总量的分组类型
            String sumType = Constant.SUM_TYPE;
            Map<String, String> groupItems = buildingService.getBuildingItemTypes(buildingId, sumType);

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

            for(int i = 0; i < energyTypes.size(); i++) {
                String curType = energyTypes.get(i);
                Map curTypeGroup = buildingService.getItemGroupIdByEnergyType(buildingId, curType, sumType);
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
            String lastMonthStart = formatter.format(DateUtil.monthFirstDay(DateUtil.monthAdd(time.getTime(), -1)));
            String lastMonthEnd = formatter.format(DateUtil.monthLastDay(DateUtil.monthAdd(time.getTime(), -1)));
            // 拿到前一年的第一天和最后一天
            String lastYearStart = formatter.format(DateUtil.yearFirstDay(DateUtil.yearAdd(time.getTime(), -1)));
            String lastYearEnd = formatter.format(DateUtil.yearLastDay(DateUtil.yearAdd(time.getTime(), -1)));

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
}
