package com.energy.controller;

import com.energy.config.AppConfig;
import com.energy.entity.AmmeterData;
import com.energy.service.AmmeterDataService;
import com.energy.service.BuildingService;
import com.energy.service.ItemDataService;
import com.energy.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.util.*;

import java.awt.*;

/**
 * Created by Administrator on 2019/8/17.
 */

@Controller
public class HomeController {

    @Resource
    private BuildingService buildingService = null;

    @Resource
    private ItemDataService itemDataService = null;

    @Resource
    private AppConfig appConfig = null;

    @Resource
    private AmmeterDataService ammeterDataService = null;

    private void setEnv(Map<String,Object> map) {
        map.put("appName", appConfig.getName());
        map.put("appVersion", appConfig.getVersion());
        map.put("appDescription", appConfig.getDescription());
    }

    @RequestMapping("/")
    public String home(Map<String,Object> map){
        setEnv(map);
        return "index";
    }

    @RequestMapping("/login")
    public String login(Map<String,Object> map){
        setEnv(map);
        return "login";
    }

    @RequestMapping("/live")
    public String live(Map<String,Object> map){
        setEnv(map);
        return "live";
    }

    @RequestMapping("/test")
    @ResponseBody
    public String error() {
        return appConfig.getName() + appConfig.getVersion();
    }

    @RequestMapping("/api/lo")
    @ResponseBody
    public Date now() {
        return new Date();
    }

    @RequestMapping("/testImg")
    @ResponseBody
    public void testImg(HttpServletRequest request, HttpServletResponse response) {
        BufferedImage image = new BufferedImage(400, 200, BufferedImage.TYPE_INT_BGR);
        Graphics g = image.getGraphics();// 产生Image对象的Graphics对象,改对象可以在图像上进行各种绘制操作
        g.fillRect(0, 10, 100, 100);//图片大小
        g.setFont(new Font("Times New Roman", Font.ROMAN_BASELINE, 18));//字体大小
        g.setColor(new Color(0, 0, 0));//字体颜色
        // 绘制随机字符
        String str = "aaa";
        g.drawString(str, 00, 00);
        g.dispose();
        try {
            // 将内存中的图片通过流动形式输出到客户端
            ImageIO.write(image, "JPEG", response.getOutputStream());
        } catch (Exception e) {
        }
    }
}
