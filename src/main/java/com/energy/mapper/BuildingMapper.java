package com.energy.mapper;

import com.energy.entity.Building;
import com.energy.entity.ItemGroup;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/17.
 */
public interface BuildingMapper {

    // 建筑信息
    public Building findById(Integer id);
    public List<Map> getBuildingsByUserId(Integer userId);
    public List<Map> getBuildingsByUserName(String userName);

    // 采集器和计量表
    public List<Map> getBuildingCollectors(Integer buildingId);

    // 统计相关
    public List<Map> getUserBuildingAmmeterSummary(Integer userId);
    public List<Map> getUserBuildingWatermeterSummary(Integer userId);
    public List<Map> getUserBuildingEnergymeterSummary(Integer userId);


    // settings
    public List<Map> getItemGroupByType(@Param("buildingId")Integer buildingId, @Param("type")String type);
    public ItemGroup getItemGroupById(Integer id);
    public List<Map> getItemGroupChildsById(Integer id);
    public Integer createItemGroup(ItemGroup itemGroup);
    public void updateItemGroup(ItemGroup itemGroup);
    public void deleteItemGroup(Integer itemGroup);


    public List<Map> getBuildingItemTypes(@Param("buildingId")Integer buildingId, @Param("type")String type);

    public List<Map> getItemDatasByHour(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByDay(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByMonth(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);
    public List<Map> getItemDatasByYear(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);


    public long getItemsSummaryVal(@Param("itemIds")List<String> itemIds, @Param("from")String from, @Param("to")String to);

    public List<Map> getItemTypeBaseInfo();

}


