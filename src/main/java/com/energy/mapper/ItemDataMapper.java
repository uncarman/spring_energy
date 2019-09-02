package com.energy.mapper;

import com.energy.entity.EnergyData;
import com.energy.entity.ItemData;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ItemDataMapper {


    public List<Map> getItemDatasByHour(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByDay(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByMonth(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByYear(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<EnergyData> getEnergyDataLatest();

    public float getItemsSummaryVal(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);

    public List<ItemData> getItemData();
    public void updateItemDatas(); // 模拟随机增加所有数据

    public void recordEnergyDatas(@Param("energyDataList")List<EnergyData> energyDataList);



}