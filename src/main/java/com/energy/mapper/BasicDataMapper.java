package com.energy.mapper;

import com.energy.entity.BasicData;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/31.
 */

public interface BasicDataMapper {

    public List<BasicData> getBasicDatas();
    public BasicData getBasicDataById(@Param("id")Integer id);
    public void createBasicData(BasicData basicData);
    public void updateBasicData(BasicData basicData);
    public void deleteBasicData(@Param("id")Integer id);

}
