package com.energy.controller;

import com.energy.entity.CashFlow;
import com.energy.service.CashFlowService;
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

@Controller
@RequestMapping("api")
public class CashFlowController {

    @Resource
    CashFlowService cashFlowService;

    @RequestMapping("/itemList")
    @ResponseBody
    public Object itemList(HttpServletRequest request) {
        Response res = new Response();
        try {
            String itemId = request.getParameter("itemId");
            String event = request.getParameter("event");
            String source = request.getParameter("source");
            String from = request.getParameter("from");
            String to = request.getParameter("to");
            List<CashFlow> list = cashFlowService.getCashFlowList(itemId, event, source, from, to);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/cashFlowList")
    @ResponseBody
    public Object cashFlowList(HttpServletRequest request) {
        Response res = new Response();
        try {
            String itemId = request.getParameter("itemId");
            String event = request.getParameter("event");
            String source = request.getParameter("source");
            String from = request.getParameter("from");
            String to = request.getParameter("to");
            List<CashFlow> list = cashFlowService.getCashFlowList(itemId, event, source, from, to);
            res.makeSuccess(list);
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping("/cashFlowAdd")
    @ResponseBody
    public Object orderAdd(CashFlow cashFlow) {
        Response res = new Response();
        try {
            cashFlowService.saveCashFlow(cashFlow);
            res.makeSuccess("");
        } catch (Exception ex) {
            res.makeFailed(ex);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 暂时不支持更新，如果创建错误了，再创建一笔相反的抵消
//    @RequestMapping("/cashFlowUpdate")
//    @ResponseBody
//    public Object orderUpdate(CashFlow cashFlow) {
//        Response res = new Response();
//        try {
//            cashFlowService.updateCashFlow(cashFlow);
//            res.makeSuccess("");
//        } catch (Exception ex) {
//            res.makeFailed(ex);
//        }
//        return new ResponseEntity<>(res, HttpStatus.OK);
//    }
}
