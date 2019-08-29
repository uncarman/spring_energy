package com.energy.mapper;

import com.energy.entity.EnergyPlan;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface EnergyPlanMapper {

    public List<EnergyPlan> getEnergyPlans(@Param("buildingId")Integer buildingId, @Param("type")String type);
    public EnergyPlan getEnergyPlanById(@Param("id")Integer id);
    public void createEnergyPlan(EnergyPlan energyPlan);
    public void updateEnergyPlan(EnergyPlan energyPlan);
    public void deleteEnergyPlan(@Param("id")Integer id);

}
