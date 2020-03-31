package com.energy.service;

import com.alibaba.fastjson.JSONObject;
import com.energy.entity.AmmeterData;
import com.energy.entity.Item;
import com.energy.entity.ItemData;
import com.energy.mapper.AmmeterDataMapper;
import com.energy.mapper.ItemDataMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AmmeterDataService {

    @Resource
    ItemDataMapper itemDataMapper;

    @Resource
    AmmeterDataMapper ammeterDataMapper;

    public List<AmmeterData> getAmmeterData() {
        List<AmmeterData> list = ammeterDataMapper.getAmmeterData();
        list.removeIf(Objects::isNull);
        return list;
    }

    // 生成电表报表数据
    public void recordAmmeterDatas() {
        // 电表 type == 1
        String ammeterType = "1";
        List<Map> itemDatas = itemDataMapper.getItemDataByItemType(ammeterType);
        List<AmmeterData> ammeterLastDatas = ammeterDataMapper.getAmmeterLastData();
        Map<Integer, AmmeterData> ammeterDataMap = ammeterLastDatas.stream().collect(Collectors.toMap(AmmeterData::getItemId, Function.identity()));

        List<AmmeterData> newAmmeterDataList = new ArrayList<>();

        if(null != itemDatas) {
            for (int i = 0; i < itemDatas.size(); i++) {
                Map itemData = itemDatas.get(i);
                AmmeterData lastAmmeterData = ammeterDataMap.get(itemData.get("itemId"));
                AmmeterData newAmmeterData = new AmmeterData();
                newAmmeterData.setItemId((int)itemData.get("itemId"));
                newAmmeterData.setRecordedAt(new Date());

                String otherDataStr = (String) itemData.get("otherData");
                JSONObject otherData = JSONObject.parseObject(otherDataStr);

                if(lastAmmeterData == null) {
                    newAmmeterData.setActiveEnergy(otherData.containsKey("pa") ? otherData.getFloat("pa") : 0);
                    newAmmeterData.setJianEnergy(otherData.containsKey("pj") ? otherData.getFloat("pj") : 0);
                    newAmmeterData.setFengEnergy(otherData.containsKey("pf") ? otherData.getFloat("pf") : 0);
                    newAmmeterData.setPingEnergy(otherData.containsKey("pp") ? otherData.getFloat("pp") : 0);
                    newAmmeterData.setGuEnergy(otherData.containsKey("pg") ? otherData.getFloat("pg") : 0);
                    newAmmeterData.setRemaindFee(otherData.containsKey("rm") ? otherData.getFloat("rm") : 0);
                    newAmmeterData.setActiveFee(0);
                    newAmmeterData.setJianFee(0);
                    newAmmeterData.setFengFee(0);
                    newAmmeterData.setPingFee(0);
                    newAmmeterData.setGuFee(0);
                    newAmmeterData.setDiffActiveEnergy(0);
                    newAmmeterData.setDiffJianEnergy(0);
                    newAmmeterData.setDiffFengEnergy(0);
                    newAmmeterData.setDiffPingEnergy(0);
                    newAmmeterData.setDiffGuEnergy(0);
                } else {
                    String chargeTypeStr = itemData.get("chargeType").toString();
                    String rateStr = itemData.get("rate").toString();
                    String rateFloatingStr = itemData.get("rateFloating").toString();

                    // 固定费率
                    float rate = null != rateStr ? Float.valueOf(rateStr) : 1;

                    newAmmeterData.setActiveEnergy(otherData.containsKey("pa") ? otherData.getFloat("pa") : 0);
                    newAmmeterData.setJianEnergy(otherData.containsKey("pj") ? otherData.getFloat("pj") : 0);
                    newAmmeterData.setFengEnergy(otherData.containsKey("pf") ? otherData.getFloat("pf") : 0);
                    newAmmeterData.setPingEnergy(otherData.containsKey("pp") ? otherData.getFloat("pp") : 0);
                    newAmmeterData.setGuEnergy(otherData.containsKey("pg") ? otherData.getFloat("pg") : 0);
                    newAmmeterData.setRemaindFee(otherData.containsKey("rm") ? otherData.getFloat("rm") : 0);

                    float dpa = otherData.containsKey("pa") ? Float.valueOf(otherData.getFloat("pa")) - lastAmmeterData.getActiveEnergy() : 0;
                    float dpj = otherData.containsKey("pj") ? Float.valueOf(otherData.getFloat("pj")) - lastAmmeterData.getJianEnergy() : 0;
                    float dpf = otherData.containsKey("pf") ? Float.valueOf(otherData.getFloat("pf")) - lastAmmeterData.getFengEnergy() : 0;
                    float dpp = otherData.containsKey("pp") ? Float.valueOf(otherData.getFloat("pp")) - lastAmmeterData.getPingEnergy() : 0;
                    float dpg = otherData.containsKey("pg") ? Float.valueOf(otherData.getFloat("pg")) - lastAmmeterData.getGuEnergy() : 0;

                    newAmmeterData.setDiffActiveEnergy(dpa);
                    newAmmeterData.setDiffJianEnergy(dpj);
                    newAmmeterData.setDiffFengEnergy(dpf);
                    newAmmeterData.setDiffPingEnergy(dpp);
                    newAmmeterData.setDiffGuEnergy(dpg);

                    if(chargeTypeStr.equals("0")) {
                        // 0 = 固定费率
                        newAmmeterData.setActiveFee(dpa*rate);
                        newAmmeterData.setJianFee(dpj*rate);
                        newAmmeterData.setFengFee(dpf*rate);
                        newAmmeterData.setPingFee(dpp*rate);
                        newAmmeterData.setGuFee(dpg*rate);
                    } else {
                        // 0 = 浮动费率
                        JSONObject rateObject = JSONObject.parseObject(rateFloatingStr);
                        float rpa = rateObject.containsKey("pa") ? rateObject.getFloat("pa") : rate;
                        float rpj = rateObject.containsKey("pj") ? rateObject.getFloat("pj") : rate;
                        float rpf = rateObject.containsKey("pf") ? rateObject.getFloat("pf") : rate;
                        float rpp = rateObject.containsKey("pp") ? rateObject.getFloat("pp") : rate;
                        float rpg = rateObject.containsKey("pg") ? rateObject.getFloat("pg") : rate;
                        newAmmeterData.setActiveFee(dpa*rpa);
                        newAmmeterData.setJianFee(dpj*rpj);
                        newAmmeterData.setFengFee(dpf*rpf);
                        newAmmeterData.setPingFee(dpp*rpp);
                        newAmmeterData.setGuFee(dpg*rpg);
                    }
                }
                newAmmeterDataList.add(newAmmeterData);
            }
        }

        ammeterDataMapper.saveAmmeterDatas(newAmmeterDataList);
    }

}
