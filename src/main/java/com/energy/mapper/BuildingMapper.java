package com.energy.mapper;

import com.energy.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/17.
 */
public interface BuildingMapper {

    // 建筑信息
    public Building getBuildingById(Integer id);
    public List<Building> getBuildingsByUserId(Integer userId);
    public List<Building> getBuildingsByUserName(String userName);

    // 采集器和计量表
    public List<Map> getBuildingCollectors(Integer buildingId);

    // 统计相关
    public List<Map> getUserBuildingAmmeterSummary(Integer userId);
    public List<Map> getUserBuildingWatermeterSummary(Integer userId);
    public List<Map> getUserBuildingEnergymeterSummary(Integer userId);


    // settings
    public List<Map> getBuildingItems(@Param("buildingId")Integer buildingId);
    public List<Map> getItemGroups(@Param("buildingId")Integer buildingId);
    public List<Map> getItemGroupByType(@Param("buildingId")Integer buildingId, @Param("type")String type,
                                        @Param("subType")String subType, @Param("parent")String parent);
    public ItemGroup getItemGroupById(Integer id);
    public List<Map> getItemGroupChildsById(Integer id);
    public Integer createItemGroup(ItemGroup itemGroup);
    public void updateItemGroup(ItemGroup itemGroup);
    public void deleteItemGroup(Integer itemGroup);

    public void deleteItemGroupMapper(@Param("groupId")Integer groupId);
    public void insertItemGroupMapper(@Param("groupId")Integer groupId, @Param("itemIds")List<String> itemIds);

    public Item getItemById(@Param("id")Integer id);
    public void createItem(Item item);
    public void updateItem(Item item);
    public void deleteItem(@Param("id")Integer id);

    public List<Map> getBasicDatas();
    public BasicData getBasicDataById(@Param("id")Integer id);
    public void createBasicData(BasicData basicData);
    public void updateBasicData(BasicData basicData);
    public void deleteBasicData(@Param("id")Integer id);

    public List<Map> getBuildingItemTypes(@Param("buildingId")Integer buildingId, @Param("type")String type);

    public List<Map> getItemDatasByHour(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByDay(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByMonth(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByYear(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);


    public float getItemsSummaryVal(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemsByGroupId(@Param("groupId")Integer groupId);

    public List<Map> getItemTypeBaseInfo();


    public List<ItemData> getItemData();
    public void updateItemDatas(); // 模拟随机增加所有数据

    public void recordEnergyDatas(@Param("energyDataList")List<EnergyData> energyDataList);

    public List<EnergyData> getEnergyDataLatest();

    public List<EnergyPlan> getEnergyPlans(@Param("buildingId")Integer buildingId, @Param("type")String type);
    public void createEnergyPlan(EnergyPlan energyPlan);
    public void updateEnergyPlan(EnergyPlan energyPlan);
    public void deleteEnergyPlan(@Param("id")Integer id);
}


