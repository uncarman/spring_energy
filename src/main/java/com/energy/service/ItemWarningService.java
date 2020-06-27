package com.energy.service;

import com.energy.entity.Item;
import com.energy.mapper.ItemWarningMapper;
import io.swagger.models.auth.In;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service("ItemWarningService")
public class ItemWarningService {

    @Resource
    private ItemWarningMapper itemWarningMapper = null;

    // 某建筑下所有[设备报警]
    public List<Map> getBuildingItemWarningList(Integer buildingId, String itemType,
                                             String hasFixed, String flowStatus,
                                             String limit, String offset) {
        List<Map> list = itemWarningMapper.getWarningList(buildingId, itemType, hasFixed, flowStatus, limit, offset);
        list.removeIf(Objects::isNull);
        return list;
    }

    // 某建筑下所有[设备报警]个数
    public int getBuildingItemWarningCount(Integer buildingId, String itemType,
                                               String hasFixed, String flowStatus,
                                               String from, String to) {
        int count = itemWarningMapper.getWarningCount(buildingId, itemType, hasFixed, flowStatus, from, to);
        return count;
    }
    // 更新单个[设备报警]
    public void updateItemWarning(Integer id, String operator, String flowStatus, String note) {
        itemWarningMapper.updateItemWarning(id, operator, flowStatus, note);
    }

    // 删除单个[设备报警]
    public void removeItemWarning(Integer id) {
        itemWarningMapper.deleteItemWarning(id);
    }
}
