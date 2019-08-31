package com.energy.service;

import com.energy.entity.BasicData;
import com.energy.mapper.BasicDataMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/31.
 */

@Service
public class BasicDataService {

    @Resource
    private BasicDataMapper basicDataMapper = null;

    public List<BasicData> getBasicDatas() {
        List<BasicData> list = basicDataMapper.getBasicDatas();
        if (null != list && !list.isEmpty()) {
            return list;
        } else {
            return null;
        }
    }

    public BasicData getBasicDataById(Integer id) {
        return basicDataMapper.getBasicDataById(id);
    }
    @Transactional(rollbackFor = Exception.class)
    public void createBasicData(BasicData basicData) {
        basicDataMapper.createBasicData(basicData);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateBasicData(BasicData basicData) {
        basicDataMapper.updateBasicData(basicData);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removeBasicData(Integer id) {
        basicDataMapper.deleteBasicData(id);
    }

}
