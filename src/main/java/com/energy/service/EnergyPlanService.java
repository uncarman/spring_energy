package com.energy.service;

import com.energy.entity.EnergyPlan;
import com.energy.mapper.EnergyPlanMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@Service("EnergyPlanService")
public class EnergyPlanService {

    @Resource
    private EnergyPlanMapper energyPlanMapper = null;

    public List<EnergyPlan> getEnergyPlans(@Param("buildingId")Integer buildingId, @Param("type")String type) {
        List<EnergyPlan> list = energyPlanMapper.getEnergyPlans(buildingId, type);
        list.removeIf(Objects::isNull);
        return list;
    }
    public EnergyPlan getEnergyPlanById(@Param("id")Integer id) {
        return energyPlanMapper.getEnergyPlanById(id);
    }
    @Transactional(rollbackFor = Exception.class)
    public void createEnergyPlan(EnergyPlan energyPlan) {
        energyPlanMapper.createEnergyPlan(energyPlan);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateEnergyPlan(EnergyPlan energyPlan) {
        energyPlanMapper.updateEnergyPlan(energyPlan);
    }
    @Transactional(rollbackFor = Exception.class)
    public void deleteEnergyPlan(@Param("id")Integer id) {
        energyPlanMapper.deleteEnergyPlan(id);
    }

}
