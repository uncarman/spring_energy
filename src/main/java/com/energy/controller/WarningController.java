package com.energy.controller;

import com.energy.service.BuildingService;
import com.energy.service.ItemWarningService;
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
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("api")
public class WarningController {
    @Resource
    private BuildingService buildingService = null;

    @Resource
    private ItemWarningService itemWarningService = null;

    // 建筑所有报警汇总
    @RequestMapping("/getBuildingItemWarningSummary")
    @ResponseBody
    public Object getBuildingItemWarningSummary(@RequestParam("buildingId") Integer buildingId,
                                          HttpServletRequest request) {
        Response res = new Response();
        try {
            // 默认按天汇总
            SimpleDateFormat formatter = DateUtil.typeToFormatter(Constant.BY_DAY);
            Calendar time = Calendar.getInstance();

            // 总量第一天和最后一天
            String dateStart = DateUtil.MIN_DATE;
            String dateEnd = DateUtil.MAX_DATE;
            // 拿到当月的第一天和最后一天
            String curMonthStart = formatter.format(DateUtil.monthFirstDay(time.getTime()));
            String curMonthEnd = formatter.format(DateUtil.monthLastDay(time.getTime()));
            // 拿到今年的第一天和最后一天
            String curYearStart = formatter.format(DateUtil.yearFirstDay(time.getTime()));
            String curYearEnd = formatter.format(DateUtil.yearLastDay(time.getTime()));
            // 拿到前一个月的第一天和最后一天
            String lastMonthStart = formatter.format(DateUtil.monthFirstDay(DateUtil.monthAdd(time.getTime(), -1)));
            String lastMonthEnd = formatter.format(DateUtil.monthLastDay(DateUtil.monthAdd(time.getTime(), -1)));
            // 拿到前一年的第一天和最后一天
            String lastYearStart = formatter.format(DateUtil.yearFirstDay(DateUtil.yearAdd(time.getTime(), -1)));
            String lastYearEnd = formatter.format(DateUtil.yearLastDay(DateUtil.yearAdd(time.getTime(), -1)));

            // 拿到各种类型基础数据
            Map<String, Map> baseMap = buildingService.getItemTypeBaseInfoToMap();

            // 默认四种类型： 电，水，燃气，蒸汽
            List<String> energyTypes = BaseUtil.energyTypes();
            List<Map> summaryDatas = new ArrayList<>();
            for(String curType : energyTypes) {
                String itemType = Integer.valueOf(curType).toString();
                Map baseInfo = baseMap.get(curType);
                Map typeMap = new HashMap();
                int unFixedTotal = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, "0", "0", null, null);
                int monthCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, null, curMonthStart, curMonthEnd);
                int yearCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, null, curYearStart, curYearEnd);
                int totalCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, null, dateStart, dateEnd);
                int monthDealCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, "3", curMonthStart, curMonthEnd);
                int yearDealCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, "3", curYearStart, curYearEnd);
                int totalDealCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, "3", dateStart, dateEnd);
                int monthIgnoreCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, "4", curMonthStart, curMonthEnd);
                int yearIgnoreCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, "4", curYearStart, curYearEnd);
                int totalIgnoreCount = itemWarningService.getBuildingItemWarningCount(buildingId, itemType, null, "4", dateStart, dateEnd);
                typeMap.put("name", baseInfo.get("name"));
                typeMap.put("unFixed", unFixedTotal);
                typeMap.put("monthTotal", monthCount);
                typeMap.put("yearTotal", yearCount);
                typeMap.put("total", totalCount);
                typeMap.put("monthDealTotal", monthDealCount);
                typeMap.put("yearDealTotal", yearDealCount);
                typeMap.put("dealTotal", totalDealCount);
                typeMap.put("monthIgnoreTotal", monthIgnoreCount);
                typeMap.put("yearIgnoreTotal", yearIgnoreCount);
                typeMap.put("ignoreTotal", totalIgnoreCount);
                summaryDatas.add(typeMap);
            }
            res.makeSuccess(summaryDatas);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 建筑所有报警列表
    @RequestMapping("/getBuildingItemWarningList")
    @ResponseBody
    public Object getBuildingItemWarningList(@RequestParam("buildingId") Integer buildingId,
                                             HttpServletRequest request) {
        Response res = new Response();
        try {
            String itemType = request.getParameter("itemType");
            String hasFixed = request.getParameter("hasFixed");
            String flowStatus = request.getParameter("flowStatus");
            String offset = request.getParameter("offset");
            String limit = request.getParameter("limit");
            List<Map> list = itemWarningService.getBuildingItemWarningList(buildingId, itemType, hasFixed, flowStatus, limit, offset);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 更新报警状态
    @RequestMapping("/updateItemWarning")
    @ResponseBody
    public Object updateItemWarning(@RequestParam("id") Integer id,
                                    @RequestParam("operator") String operator,
                                    @RequestParam("flowStatus") String flowStatus,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            String note = request.getParameter("note");
            itemWarningService.updateItemWarning(id, operator, flowStatus, note);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 删除报警状态
    @RequestMapping("/removeItemWarning")
    @ResponseBody
    public Object removeItemWarning(@RequestParam("id") Integer id,
                                    HttpServletRequest request) {
        Response res = new Response();
        try {
            itemWarningService.removeItemWarning(id);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
