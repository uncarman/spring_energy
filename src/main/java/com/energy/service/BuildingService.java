package com.energy.service;

import com.energy.entity.*;
import com.energy.mapper.BuildingMapper;
import com.energy.mapper.ItemMapper;
import com.energy.utils.Constant;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2019/8/17.
 */

@Service("BuildingService")
public class BuildingService {

    @Resource
    private BuildingMapper buildingMapper = null;

    public Building getBuildingById(Integer id) {
        return buildingMapper.getBuildingById(id);
    }

    public List<Building> getBuildingsByUserId(Integer userId) {
        List<Building> list = buildingMapper.getBuildingsByUserId(userId);
        list.removeIf(Objects::isNull);
        return list;
    }

    // 拿到所有 能耗分项 对应的总表类型
    public Map<Integer, String> getBuildingItemTypes(Integer buildingId, String type) {
        List<Map> itemlist = buildingMapper.getBuildingItemTypes(buildingId, type);

        // 转换成 groupId => itemIds
        Map<Integer, String> groupMap = new HashMap<>();
        if( null != itemlist && !itemlist.isEmpty() ) {
            for(int i = 0; i < itemlist.size(); i++) {
                Map map = itemlist.get(i);
                Integer groupId = Integer.valueOf(map.get("groupId").toString());
                Number itemId = (Number) map.get("itemId"); // 可能有null
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
        return null;
    }

    public Map<String, Map> getItemTypeBaseInfoToMap() {
        List<Map> list = buildingMapper.getItemTypeBaseInfo();
        Map baseMap = new HashMap<>();
        for ( Map map : list) {
            baseMap.put(map.get("type_code").toString(), map);
        }
        return baseMap;
    }

    public List<Map> getItemTypeBaseInfo() {
        return buildingMapper.getItemTypeBaseInfo();
    }

}
