package com.energy.utils;

/**
 * Created by Administrator on 2019/8/17.
 */
public class Constant {

    public static final Integer RES_SUCCESS_CODE = 200;
    public static final String RES_SUCCESS_MESSAGE = "SUCCESS";

    public static final Integer RES_FAIL_CODE = 500;
    public static final String RES_FAIL_MESSAGE = "FAIL";

    // 当量标煤
    public static final float COAL_ELECTRICITY = 0.4040f;
    public static final float COAL_WATER= 0.2429f;
    public static final float COAL_GAS= 0.2429f;
    public static final float COAL_STEAM= 0.2429f;

    // 当量炭排放
    public static final float C_ELECTRICITY = 0.5f;
    public static final float C_WATER = 0.5f;
    public static final float C_GAS = 0.5f;
    public static final float C_STEAM = 0.5f;

    public static final String SUM_TYPE = "能耗分项";  // 可以计算总量的分组类型

    public static final String BASE_TYPE_CATE = "15";  // 基础数据：能耗类型

    public static final String ITEM_TYPE_ELE = "01"; // 电表
    public static final String ITEM_TYPE_WATER = "02"; // 水表
    public static final String ITEM_TYPE_GAS = "03"; // 燃气表
    public static final String ITEM_TYPE_CAH = "04"; // 冷热表
    public static final String ITEM_TYPE_STEAM = "05"; // 蒸汽表 steam

    public static final String BY_HOUR = "hour";
    public static final String BY_DAY = "day";
    public static final String BY_MONTH = "month";
    public static final String BY_YEAR = "year";


}
