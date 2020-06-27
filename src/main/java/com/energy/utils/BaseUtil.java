package com.energy.utils;


import java.util.Arrays;
import java.util.List;

public class BaseUtil {

    // 默认四种能源： 电，水，燃气，蒸汽
    private static String[] energyTypeStrs = {"01", "02", "03", "05"};

    public static List<String> energyTypes() {
        return Arrays.asList(energyTypeStrs);
    }

    public static List<String> itemTypes() {
        return Arrays.asList(energyTypeStrs);
    }
}
