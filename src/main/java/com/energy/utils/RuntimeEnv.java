package com.energy.utils;

import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class RuntimeEnv implements EnvironmentAware {

    private Environment env = null;

    @Override
    public void setEnvironment(Environment environment) {
        System.out.println("启动 env: " + environment.getProperty("spring.profiles.active") + " port: "+environment.getProperty("server.port"));
        env = environment;
    }

    public Environment getEnv() {
        return env;
    }
}
