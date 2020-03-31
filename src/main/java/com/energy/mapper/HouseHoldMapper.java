package com.energy.mapper;

import com.energy.entity.AmmeterData;
import com.energy.entity.HouseHold;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface HouseHoldMapper {

    public List<Map> getHouseHoldList(@Param("buildingId") String buildingId);
    public void insertHouseHold(@Param("itemList") List<HouseHold> householdList);
    public void updateHouseHold(@Param("item") HouseHold household);
    public HouseHold getHouseHoldByItemId(@Param("itemId") String itemId);

}
