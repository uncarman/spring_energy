package com.energy.utils;

import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class RuntimeEnv implements EnvironmentAware {

    private static Environment env = null;

    @Override
    public void setEnvironment(Environment environment) {
        env = environment;
    }

    public Environment getEnv() {
        return env;
    }
}
