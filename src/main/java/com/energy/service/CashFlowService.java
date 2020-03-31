package com.energy.service;

import com.energy.entity.CashFlow;
import com.energy.mapper.CashFlowMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CashFlowService {

    @Resource
    CashFlowMapper cashFlowMapper;

    public List<CashFlow> getCashFlowList(String itemId, String event, String source, String from, String to) {
        List<CashFlow> list = cashFlowMapper.getCashFlowList(itemId, event, source, from, to);
        list.removeIf(Objects::isNull);
        return list;
    }

    public void saveCashFlow(CashFlow cashFlow) {
        List<CashFlow> list = new ArrayList<CashFlow>();
        list.add(cashFlow);
        cashFlowMapper.insertCashFlow(list);
    }

    public void updateCashFlow(CashFlow cashFlow) {
        cashFlowMapper.updateCashFlow(cashFlow);
    }
}
