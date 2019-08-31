package com.energy.service;

import com.energy.entity.EnergyData;
import com.energy.entity.ItemData;
import com.energy.mapper.ItemDataMapper;
import com.energy.utils.Constant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2019/8/31.
 */

@Service
public class ItemDataService {

    @Resource
    ItemDataMapper itemDataMapper;

    public List<Map> getItemDatasByDate(List<String> itemIds, String from, String to, String type) {
        List<Map> list = new ArrayList<>();
        if(null != itemIds && !itemIds.isEmpty()) {
            if (type.equals(Constant.BY_HOUR)) {
                list = itemDataMapper.getItemDatasByHour(itemIds, from, to);
            } else if (type.equals(Constant.BY_DAY)) {
                list = itemDataMapper.getItemDatasByDay(itemIds, from, to);
            } else if (type.equals(Constant.BY_MONTH)) {
                list = itemDataMapper.getItemDatasByMonth(itemIds, from, to);
            } else if (type.equals(Constant.BY_YEAR)) {
                list = itemDataMapper.getItemDatasByYear(itemIds, from, to);
            }
            list.removeIf(Objects::isNull);
        }
        return list;
    };


    // 某个时间段中，设备的总值
    public float getItemsSummaryVal(List<String> itemIds, String from, String to) {
        if(null != itemIds && !itemIds.isEmpty()) {
            return itemDataMapper.getItemsSummaryVal(itemIds, from, to);
        } else {
            return 0;
        }
    };


    public List<ItemData> getItemData() {
        List<ItemData> list = itemDataMapper.getItemData();
        list.removeIf(Objects::isNull);
        return list;
    }

    // 模拟随机增加数据
    @Transactional(rollbackFor = Exception.class)
    public void updateItemDatas() {
        itemDataMapper.updateItemDatas();
    }

    // 记录实时数据到能耗表
    @Transactional(rollbackFor = Exception.class)
    public void recordEnergyDatas(List<EnergyData> energyDataList) {
        itemDataMapper.recordEnergyDatas(energyDataList);
    }

    public List<EnergyData> getEnergyDataLatest() {
        List<EnergyData> list = itemDataMapper.getEnergyDataLatest();
        list.removeIf(Objects::isNull);
        return list;
    };

    // 实时同步
    @Transactional(rollbackFor = Exception.class)
    public void recordEnergyDatas() {
        List<ItemData> itemDataCurList = getItemData();
        List<EnergyData> EnergyDataLatest = getEnergyDataLatest();
        Map<Integer, Float> EnergyDataMap = new HashMap<>();
        if(null != EnergyDataLatest && !EnergyDataLatest.isEmpty()) {
            for(int i = 0; i < EnergyDataLatest.size(); i++) {
                EnergyData e = EnergyDataLatest.get(i);
                if(null != e) {
                    EnergyDataMap.put(e.getItemId(), e.getIndication());
                }
            }
        }

        List<EnergyData> energyDataList = new ArrayList<>();
        for(int i = 0; i < itemDataCurList.size(); i++) {
            ItemData it = itemDataCurList.get(i);
            if(null != it) {
                float diff = 0;
                if(null != EnergyDataMap.get(it.getItemId())) {
                    diff = it.getIndication() - EnergyDataMap.get(it.getItemId());
                }

                EnergyData energyData = new EnergyData();
                energyData.setItemId(it.getItemId());
                energyData.setIndication(it.getIndication());
                energyData.setDiffIndication(diff);
                energyData.setOtherData(it.getOtherData());
                energyData.setRecordedAt(it.getUpdatedAt());

                energyDataList.add(energyData);
            }
        }

        if(energyDataList.size() > 0) {
            recordEnergyDatas(energyDataList);
        }
    }
}
