package com.energy.service;

import com.energy.entity.HouseHold;
import com.energy.mapper.HouseHoldMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service("HouseHoldService")
public class HouseHoldService {

    @Resource
    HouseHoldMapper houseHoldMapper;

    public List<Map> getHouseHoldList(String buildingId) {
        List<Map> list = houseHoldMapper.getHouseHoldList(buildingId);
        list.removeIf(Objects::isNull);
        return list;
    }

    public void saveHouseHold(HouseHold houseHold) {
        List<HouseHold> list = new ArrayList<HouseHold>();
        list.add(houseHold);
        houseHoldMapper.insertHouseHold(list);
    }

    public void updateHouseHold(HouseHold houseHold) {
        houseHoldMapper.updateHouseHold(houseHold);
    }

    public HouseHold getHouseHoldByItemId(String itemId) {
        return houseHoldMapper.getHouseHoldByItemId(itemId);
    }
}
