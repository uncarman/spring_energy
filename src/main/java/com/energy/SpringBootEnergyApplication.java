package com.energy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

import java.util.Arrays;

/**
 * Created by Administrator on 2019/8/17.
 */


@SpringBootApplication
@MapperScan("com.energy.mapper")
@PropertySource("classpath:config.properties")
public class SpringBootEnergyApplication {

    public static void main (String[] args) {
        SpringApplication.run(SpringBootEnergyApplication.class);
    }
}
