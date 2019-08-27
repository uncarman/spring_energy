package com.energy.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateUtil {

    public static String MIN_DATE = "2000-01-01";
    public static String MAX_DATE = "5000-01-01";

    // 时间类型，返回对应格式化格式
    public static SimpleDateFormat typeToFormatter(String type) {
        SimpleDateFormat fmt = null;
        if(type.equals(Constant.BY_HOUR)) {
            fmt = new SimpleDateFormat("yyyy-MM-dd HH");
        } else if(type.equals(Constant.BY_MONTH)) {
            fmt = new SimpleDateFormat("yyyy-MM");
        } else if(type.equals(Constant.BY_YEAR)) {
            fmt = new SimpleDateFormat("yyyy");
        } else {
            fmt = new SimpleDateFormat("yyyy-MM-dd");
        }
        return fmt;
    }

    // 当前日期相加X天
    public static Date dayAdd(Date curDate, int num) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.add(Calendar.DATE, num);
        return time.getTime();
    }

    // 当月的第一天
    public static Date monthFirstDay(Date curDate) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.set(Calendar.DAY_OF_MONTH, 1);
        return time.getTime();
    }

    // 当月的最后一天
    public static Date monthLastDay(Date curDate) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.set(Calendar.DAY_OF_MONTH, time.getActualMaximum(Calendar.DAY_OF_MONTH));
        return time.getTime();
    }

    // 当前日期相加X月
    public static Date monthAdd(Date curDate, int num) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.add(Calendar.MONTH, num);
        return time.getTime();
    }

    // 当年第一天
    public static Date yearFirstDay(Date curDate) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.set(Calendar.DAY_OF_YEAR, 1);
        return time.getTime();
    }

    // 当年的最后一天
    public static Date yearLastDay(Date curDate) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.set(Calendar.DAY_OF_YEAR, time.getActualMaximum(Calendar.DAY_OF_YEAR));
        return time.getTime();
    }

    // 当前日期相加X年
    public static Date yearAdd(Date curDate, int num) {
        Calendar time = Calendar.getInstance();
        time.setTime(curDate);
        time.add(Calendar.YEAR, num);
        return time.getTime();
    }

    // 间隔时间段内的时间列表, 第一列是日期, tableData 用
    public static List dateList(Date fromDate, Date toDate, String type) {
        List<List> dataList = new ArrayList<>();
        // 先生成第一列时间数据
        SimpleDateFormat formatter = null;
        if(type.equals(Constant.BY_HOUR)) {
            formatter = new SimpleDateFormat("yyyy-MM-dd HH");
        } else if(type.equals(Constant.BY_MONTH)) {
            formatter = new SimpleDateFormat("yyyy-MM");
        } else if(type.equals(Constant.BY_YEAR)) {
            formatter = new SimpleDateFormat("yyyy");
        } else {
            formatter = new SimpleDateFormat("yyyy-MM-dd");
        }
        Calendar time = Calendar.getInstance();
        Calendar cf = Calendar.getInstance();
        Calendar ct = Calendar.getInstance();
        cf.setTime(fromDate);
        ct.setTime(toDate);

        int xlen = 0;
        if(type.equals(Constant.BY_HOUR)) {
            xlen = (int) ((ct.getTime().getTime() - cf.getTime().getTime()) / (1000*3600));
        } else if(type.equals(Constant.BY_MONTH)) {
            xlen = ct.get(Calendar.MONTH) - cf.get(Calendar.MONTH) + 12 * (ct.get(Calendar.YEAR) - cf.get(Calendar.YEAR));
        } else if(type.equals(Constant.BY_YEAR)) {
            xlen = ct.get(Calendar.YEAR) - cf.get(Calendar.YEAR);
        } else {
            xlen = (int) ((ct.getTime().getTime() - cf.getTime().getTime()) / (1000*3600*24));
        }

        for(int i=0; i<=xlen; i++) {
            time.setTime(fromDate);
            if(type.equals(Constant.BY_HOUR)) {
                time.add(Calendar.HOUR, i);
            } else if(type.equals(Constant.BY_MONTH)) {
                time.add(Calendar.MONTH, i);
            } else if(type.equals(Constant.BY_YEAR)) {
                time.add(Calendar.YEAR, i);
            } else {
                time.add(Calendar.DATE, i);
            }
            String date = formatter.format(time.getTime());
            List row = new ArrayList<>();
            row.add(date);
            dataList.add(row);
        }
        return dataList;
    }

}
