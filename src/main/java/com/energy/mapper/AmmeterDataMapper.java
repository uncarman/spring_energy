package com.energy.mapper;

import com.energy.entity.AmmeterData;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AmmeterDataMapper {

    public List<AmmeterData> getAmmeterData();

    public List<AmmeterData> getAmmeterLastData();

    public void saveAmmeterDatas(@Param("ammeterDataList") List<AmmeterData> ammeterDataList);

}
