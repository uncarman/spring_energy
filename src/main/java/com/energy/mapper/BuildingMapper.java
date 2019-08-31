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


    public List<Map> getBuildingItemTypes(@Param("buildingId")Integer buildingId, @Param("type")String type);

    public List<Map> getItemTypeBaseInfo();

}


