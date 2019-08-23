package com.energy.utils;

/**
 * Created by Administrator on 2019/8/17.
 */
public class Constant {

    public static Integer RES_SUCCESS_CODE = 200;
    public static String RES_SUCCESS_MESSAGE = "SUCCESS";

    public static Integer RES_FAIL_CODE = 500;
    public static String RES_FAIL_MESSAGE = "FAIL";

    public static float COAL_ELECTRICITY = 0.4040f;
    public static float COAL_WATER= 0.2429f;
    public static float COAL_GAS= 0.2429f;
    public static float COAL_STEAM= 0.2429f;

    public static String TYPE_AMMETER = "ammeter";
    public static String TYPE_WATERMETER = "watermeter";
    public static String TYPE_ENERGYMETER = "energymeter";

    public static String SUM_TYPE = "能耗分项";  // 可以计算总量的分组类型

    public static String BASE_TYPE_CATE = "15";  // 基础数据：能耗类型

    public static String ITEM_TYPE_ELE = "01"; // 电表
    public static String ITEM_TYPE_WATER = "02"; // 水表
    public static String ITEM_TYPE_GAS = "03"; // 燃气表
    public static String ITEM_TYPE_CAH = "04"; // 冷热表
    public static String ITEM_TYPE_STEAM = "05"; // 蒸汽表 steam

    public static String BY_HOUR = "hour";
    public static String BY_DAY = "day";
    public static String BY_MONTH = "month";
    public static String BY_YEAR = "year";


}
