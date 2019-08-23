package com.energy.service;

import com.energy.entity.Building;
import com.energy.entity.ItemGroup;
import com.energy.mapper.BuildingMapper;
import com.energy.utils.Constant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
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
        return buildingMapper.getBuildingsByUserId(userId);
    }

    public List<Map> getBuildingsByUserName(String userName) {
        return buildingMapper.getBuildingsByUserName(userName);
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


    // 设备分组信息
    public List<Map> getItemGroupByType(Integer buildingId, String type, String subType, String parent) {
        return buildingMapper.getItemGroupByType(buildingId, type, subType, parent);
    }

    public ItemGroup getItemGroupById(Integer id) {
        return buildingMapper.getItemGroupById(id);
    }

    public List<Map> getItemGroupChildsById(Integer id) {
        return buildingMapper.getItemGroupChildsById(id);
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
        if(type.equals(Constant.BY_HOUR)) {
            return buildingMapper.getItemDatasByHour(itemIds, from, to);
        } else if(type.equals(Constant.BY_DAY)) {
            return buildingMapper.getItemDatasByDay(itemIds, from, to);
        } else if(type.equals(Constant.BY_MONTH)) {
            return buildingMapper.getItemDatasByMonth(itemIds, from, to);
        } else if(type.equals(Constant.BY_YEAR)) {
            return buildingMapper.getItemDatasByYear(itemIds, from, to);
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
        return buildingMapper.getItemsSummaryVal(itemIds, from, to);
    };

    // 某个分组下的所有设备
    public List<Map> getItemsByGroupId(Integer groupId) {
        return buildingMapper.getItemsByGroupId(groupId);
    }
}
