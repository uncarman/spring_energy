package com.energy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Administrator on 2019/8/17.
 */


@SpringBootApplication
@MapperScan("com.energy.mapper")
public class SpringBootEnergyApplication {

    public static void main (String[] args) {
        SpringApplication.run(SpringBootEnergyApplication.class);
    }
}
