package com.energy.service;

import com.energy.entity.*;
import com.energy.mapper.BuildingMapper;
import com.energy.utils.Constant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/17.
 */

@Service
public class BuildingService {

    @Resource
    private BuildingMapper buildingMapper = null;

    // buildings 相关
    public Building findById(Integer id) {
        return buildingMapper.findById(id);
    }

    public List<Map> getBuildingsByUserId(Integer userId) {
        List<Map> list = buildingMapper.getBuildingsByUserId(userId);
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }

    public List<Map> getBuildingsByUserName(String userName) {
        List<Map> list = buildingMapper.getBuildingsByUserName(userName);
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }

    // collector 相关
    public List<Map> getBuildingCollectors(Integer buildingId) {
        return buildingMapper.getBuildingCollectors(buildingId);
    }

    // 综合数据
    public List<Map> getUserBuildingSummary(Integer userId, String type) {
        if(type == Constant.TYPE_AMMETER) {
            return buildingMapper.getUserBuildingAmmeterSummary(userId);
        } else if( type == Constant.TYPE_WATERMETER) {
            return buildingMapper.getUserBuildingWatermeterSummary(userId);
        } else if( type == Constant.TYPE_ENERGYMETER) {
            return buildingMapper.getUserBuildingEnergymeterSummary(userId);
        }
        return null;
    }

    // 某建筑下所有[设备]
    public List<Map> getBuildingItems(Integer buildingId) {
        List<Map> list = buildingMapper.getBuildingItems(buildingId);
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }
    // 某建筑下所有[设备分组]
    public List<Map> getItemGroups(Integer buildingId) {
        List<Map> list = buildingMapper.getItemGroups(buildingId);
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }

    // [设备分组]信息
    public List<Map> getItemGroupByType(Integer buildingId, String type, String subType, String parent) {
        List<Map> list = buildingMapper.getItemGroupByType(buildingId, type, subType, parent);
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }

    // 根据类型分类, 拿到一级itemGroup
    public Map getItemGroupIdByEnergyType(Integer buildingId, String type, String subType) {
        List<Map> list = buildingMapper.getItemGroupByType(buildingId, type, subType, null);
        if( null != list && list.size() > 0) {
            return list.get(0);
        }
        return null;
    }


    // 更新设备分组和设备绑定关系
    @Transactional(rollbackFor = Exception.class)
    public void updateItemsGroupItems(Integer groupId, List<String>ItemIds) {
        buildingMapper.deleteItemGroupMapper(groupId);
        buildingMapper.insertItemGroupMapper(groupId, ItemIds);
    }

    public ItemGroup getItemGroupById(Integer id) {
        return buildingMapper.getItemGroupById(id);
    }

    public List<Map> getItemGroupChildsById(Integer id) {
        List<Map> list = buildingMapper.getItemGroupChildsById(id);
        if (null != list && list.size() > 0) {
            return list;
        } else {
            return null;
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public Integer createItemGroup(ItemGroup itemGroup) {
        return buildingMapper.createItemGroup(itemGroup);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateItemGroup(ItemGroup itemGroup) {
        buildingMapper.updateItemGroup(itemGroup);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteItemGroup(Integer id) {
        buildingMapper.deleteItemGroup(id);
    }


    public Item getItemById(Integer id) {
        return buildingMapper.getItemById(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createItem(Item item) {
        buildingMapper.createItem(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateItem(Item item) {
        buildingMapper.updateItem(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removeItem(Integer id) {
        buildingMapper.deleteItem(id);
    }



    public List<Map> getBasicDatas() {
        List<Map> list = buildingMapper.getBasicDatas();
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }

    public BasicData getBasicDataById(Integer id) {
        return buildingMapper.getBasicDataById(id);
    }
    @Transactional(rollbackFor = Exception.class)
    public void createBasicData(BasicData basicData) {
        buildingMapper.createBasicData(basicData);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateBasicData(BasicData basicData) {
        buildingMapper.updateBasicData(basicData);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removeBasicData(Integer id) {
        buildingMapper.deleteBasicData(id);
    }


    // 拿到所有 能耗分项 对应的总表类型
    public Map<String, String> getBuildingItemTypes(Integer buildingId, String type) {
        List<Map> itemlist = buildingMapper.getBuildingItemTypes(buildingId, type);

        // 转换成 groupId => itemIds
        Map<String, String> groupMap = new HashMap<>();
        for(int i = 0; i < itemlist.size(); i++) {
            Map map = itemlist.get(i);
            String groupId = map.get("group_id").toString();
            Number itemId = (Number) map.get("item_id"); // 可能有null
            if(itemId != null && itemId.intValue() > 0 ) {
                if(groupMap.containsKey(groupId)) {
                    groupMap.put(groupId, groupMap.get(groupId)+","+itemId);
                } else {
                    groupMap.put(groupId, itemId.toString());
                }
            }
        }
        return groupMap;
    }

    public List<Map> getItemDatasByDate(List<String> itemIds, String from, String to, String type) {
        if(null != itemIds && null != itemIds.get(0)) {
            if (type.equals(Constant.BY_HOUR)) {
                return buildingMapper.getItemDatasByHour(itemIds, from, to);
            } else if (type.equals(Constant.BY_DAY)) {
                return buildingMapper.getItemDatasByDay(itemIds, from, to);
            } else if (type.equals(Constant.BY_MONTH)) {
                return buildingMapper.getItemDatasByMonth(itemIds, from, to);
            } else if (type.equals(Constant.BY_YEAR)) {
                return buildingMapper.getItemDatasByYear(itemIds, from, to);
            }
        }
        return null;
    };



    public List<Map> getItemTypeBaseInfo() {
        return buildingMapper.getItemTypeBaseInfo();
    }

    public Map<String, Map> getItemTypeBaseInfoToMap() {
        List<Map> list = buildingMapper.getItemTypeBaseInfo();
        Map<String, Map> baseMap = new HashMap<>();
        for(int i = 0; i < list.size(); i++) {
            Map map = list.get(i);
            baseMap.put(map.get("type_code").toString(), map);
        }
        return baseMap;
    }

    // 某个时间段中，设备的总值
    public float getItemsSummaryVal(List<String> itemIds, String from, String to) {
        if(null != itemIds && null != itemIds.get(0)) {
            return buildingMapper.getItemsSummaryVal(itemIds, from, to);
        } else {
            return 0;
        }
    };

    // 某个分组下的所有设备
    public List<Map> getItemsByGroupId(Integer groupId) {
        List<Map> list = buildingMapper.getItemsByGroupId(groupId);
        if (null != list && null != list.get(0)) {
            return list;
        } else {
            return null;
        }
    }



    public List<ItemData> getItemData() {
        return buildingMapper.getItemData();
    }

    // 模拟随机增加数据
    @Transactional(rollbackFor = Exception.class)
    public void updateItemDatas() {
        buildingMapper.updateItemDatas();
    }

    // 记录实时数据到能耗表
    @Transactional(rollbackFor = Exception.class)
    public void recordEnergyDatas(List<EnergyData> energyDataList) {
        buildingMapper.recordEnergyDatas(energyDataList);
    }

    public List<EnergyData> getEnergyDataLatest() {
        return buildingMapper.getEnergyDataLatest();
    };


    // 实时同步
    @Transactional(rollbackFor = Exception.class)
    public void recordEnergyDatas() {
        List<ItemData> itemDataCurList = getItemData();
        List<EnergyData> EnergyDataLatest = getEnergyDataLatest();
        Map<Integer, Float> EnergyDataMap = new HashMap<>();
        if(null != EnergyDataLatest && EnergyDataLatest.size() > 0) {
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
