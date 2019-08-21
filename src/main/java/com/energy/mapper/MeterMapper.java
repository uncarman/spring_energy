package com.energy.mapper;

import com.energy.entity.AmmeterData;
import com.energy.entity.EnergymeterData;
import com.energy.entity.WatermeterData;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/17.
 */
public interface MeterMapper {

    // 获取某建筑下所有计量表
    public List<Map> getBuildingMeters(Integer buildingId);

    // 电表
    public List<Map> getAmmeterBySn(String meterSn, String collectorSn);
    public void createAmmeterData(AmmeterData ammeterData);

    // 水表
    public List<Map> getWatermeterBySn(String meterSn, String collectorSn);
    public void createWatermeterData(WatermeterData watermeterData);

    // 冷热表
    public List<Map> getEnergymeterBySn(String meterSn, String collectorSn);
    public void createEnergymeterData(EnergymeterData energymeterData);


}
