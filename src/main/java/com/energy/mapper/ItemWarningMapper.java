package com.energy.mapper;

import com.energy.entity.Item;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WarningMapper {
    public List<Item> getWarnings(@Param("buildingId")Integer buildingId);
}
