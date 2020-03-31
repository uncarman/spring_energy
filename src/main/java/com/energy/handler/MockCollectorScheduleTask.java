package com.energy.handler;

import com.energy.service.ItemDataService;
import com.energy.utils.RuntimeEnv;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDateTime;

/**
 * 模拟采集器，定时采集数据，并更新到 item_data 表
 */
@Component
@Configuration
@EnableScheduling   // 1.开启定时任务
@EnableAsync        // 2.开启多线程
public class MockCollectorScheduleTask {

    @Resource
    private ItemDataService itemDataService = null;

    @Resource
    private RuntimeEnv env = null;

    // 10 分钟采集(更新)一次
    @Scheduled(cron = "1 0/10 * * * ?")
    private void syncItemRealTimeData() {
        System.err.println("syncItemRealTimeData: " + LocalDateTime.now());
        // TODO 更新 a_item_data 记录
        System.out.println("当前环境: " + env.getEnv().getProperty("spring.profiles.active"));
        if("prod".equals(env.getEnv().getProperty("spring.profiles.active"))) {
            itemDataService.updateItemDatas();
        }
    }
}
