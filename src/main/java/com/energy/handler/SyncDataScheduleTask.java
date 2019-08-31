package com.energy.handler;

import com.energy.entity.EnergyData;
import com.energy.entity.ItemData;
import com.energy.service.BuildingService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.awt.geom.Line2D;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/25.
 */

@Component
@Configuration
@EnableScheduling   // 1.开启定时任务
@EnableAsync        // 2.开启多线程
public class SyncDataScheduleTask {

    @Resource
    private BuildingService buildingService = null;

    //1. 同步采集器设备数据到实时表
    @Scheduled(cron = "0 0/10 * * * ?")
    private void syncItemRealTimeData() {
        System.err.println("syncItemRealTimeData: " + LocalDateTime.now());
        // TODO 更新 a_item_data 记录
//        buildingService.updateItemDatas();
    }

    //2. 同步设备实时数据到记录
    @Scheduled(cron = "0 0/30 * * * ?")
    //@Scheduled(fixedDelay = 30*60*1000)
    private void recordEnergyDatas() {
        System.err.println("recordEnergyDatas: " + LocalDateTime.now());

        // 同步 a_energy_data 记录
//        buildingService.recordEnergyDatas();
    }

}
