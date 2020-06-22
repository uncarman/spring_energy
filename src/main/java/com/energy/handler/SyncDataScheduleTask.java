package com.energy.handler;


import com.energy.service.AmmeterDataService;
import com.energy.service.ItemDataService;
import com.energy.utils.RuntimeEnv;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDateTime;

/**
 * 定时获取最新数据，生成报表，
 * a_ammeter_data -- 电表数据
 * a_energy_data -- 旧能耗数据
 */
@Component
@Configuration
@EnableScheduling   // 1.开启定时任务
@EnableAsync        // 2.开启多线程
public class SyncDataScheduleTask {

    @Resource
    private AmmeterDataService ammeterDataService = null;

    @Resource
    private ItemDataService itemDataService = null;

    @Resource
    private RuntimeEnv env = null;

    // 同步电表数据到记录(通过尖峰平谷计算费用) a_ammeter_data
    @Scheduled(cron = "1 1/30 * * * ?")
    private void recordAmmeterDatas() {
        System.err.println("recordAmmeterDatas: " + LocalDateTime.now());
        System.out.println("当前环境: " + env.getEnv().getProperty("MockCollectorScheduleTask"));
        if("true".equals(env.getEnv().getProperty("MockCollectorScheduleTask"))) {
            ammeterDataService.recordAmmeterDatas();
        }
    }


    // 同步设备实时数据到记录 a_energy_data
    @Scheduled(cron = "1 0/30 * * * ?")
    //@Scheduled(fixedDelay = 30*60*1000)
    private void recordEnergyDatas() {
        System.err.println("recordEnergyDatas: " + LocalDateTime.now());
        // 同步 a_energy_data 记录
        System.out.println("当前环境: " + env.getEnv().getProperty("MockCollectorScheduleTask"));
        if("true".equals(env.getEnv().getProperty("MockCollectorScheduleTask"))) {
            itemDataService.recordEnergyDatas();
        }
    }
}
