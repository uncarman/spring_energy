package com.energy.mapper;

import com.energy.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface BuildingMapper {

    // 建筑信息
    public Building getBuildingById(Integer id);
    public List<Building> getBuildingsByUserId(Integer userId);

    // 采集器和计量表
    public List<Map> getBuildingCollectors(Integer buildingId);

    public List<Item> getBuildingItems(@Param("buildingId")Integer buildingId);

    // settings

    public List<Map> getBuildingItemTypes(@Param("buildingId")Integer buildingId, @Param("type")String type);

    public List<Map> getItemDatasByHour(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByDay(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByMonth(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByYear(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);


    public float getItemsSummaryVal(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);

    public List<Map> getItemTypeBaseInfo();


    public List<ItemData> getItemData();
    public void updateItemDatas(); // 模拟随机增加所有数据

    public void recordEnergyDatas(@Param("energyDataList")List<EnergyData> energyDataList);

    public List<EnergyData> getEnergyDataLatest();

}


