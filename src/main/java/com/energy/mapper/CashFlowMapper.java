package com.energy.mapper;

import com.energy.entity.CashFlow;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CashFlowMapper {
    public List<CashFlow> getCashFlowList(@Param("itemId")String itemId, @Param("event")String event,
                                       @Param("source")String source, @Param("from")String from,
                                       @Param("to")String to);
    public void insertCashFlow(@Param("itemList") List<CashFlow> cashFlowList);
    public void updateCashFlow(@Param("item") CashFlow cashFlow);

}
