app.controller('dashboard',function ($scope) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
        //$("#bimFrame").css("height", $(".right_col").height() + 30);
        $(".live").css("height", $("#leftBlock").height() - 18);
    });

    // 最后执行
    setTimeout(function(){
        $scope.getDatas();
    }, 0);

    moment.locale("zh-CN");

    $scope.datas = {
        // 空气质量
        "cityId": "1194",  // 台州市
        "AppCode": "1b676b19152f4f41b16a961742c49ac0",  // aliyun墨迹

        user: global.read_storage("session", "user"),
        curBuilding: global.read_storage("session", "building"),
        buildingList: global.read_storage("session", "buildingList"),

        todayStr: moment().format("YYYY年MM月DD日 dddd"),
        time: moment().format("HH:mm:ss"),

        result:{
            summaryDatas: [],
            chartDatas0: {},
            chartSumData: {},

            chartDetailDatas: {},

            chartDatas1: {},
            tableData: {},
        },

        internationalValues: {
            "01": 0.0015,
            "02": 0.0015,
            "03": 0.0015,
            "04": 0.0015,
            "05": 0.0015,
        },

        // 1 行图表
        fmt: "YYYY-MM-DD",
        fromDate: moment().add(-15, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        type: "day", // 默认按天显示

        option: settings.defaultLineOpt,
        option2: {
            color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[],
                y: "10px",
            },
            grid: {
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                // {
                //   name:'用电量',
                //   type:'bar',
                //   data:[]
                // }
            ]
        },

        // 2行图表
        lineOpt: settings.defaultLineOpt,
        pieOpt: settings.defaultPieOpt,
        typeNames: settings.typeNames,
        chartTypes: settings.defaultDateTypes,
        chartType: settings.defaultDateTypes[1],
        type: "01",
        subType: "建筑区域",
        typeName: settings.types["01"],
        subTypeName: settings.subTypes["建筑区域"],
    }

    setInterval(function () {
        $scope.$apply(function () {
            $scope.time = moment().format("HH:mm:ss");
        });
    });

    $scope.goto = global.goto;

    $scope.getDatas = function () {
        $scope.ajaxBuildingList()
            .then($scope.buildBuildingsTable)
            .then(function () {
                // 获取汇总数据
                $scope.getBuildingSummaryTotalData();

                // 图表数据
                $scope.getBuildingChartDataByType();
                // 获取分类标题
                $scope.getItemGroupByType(function () {
                    $scope.getEnergyChartDataByType();
                });

                // 管网安全
                $scope.getPipSecurity();
            })
            .catch($scope.ajaxCatch);

        // 获取天气
        $scope.getLocalWeather();
        $scope.getLocalAirPm();
    };

    // 根据浏览器定位当前位置, 并输出天气情况
    $scope.getLocalWeather = function(){
        var key = "alicityweather_forecast24hours_"+$scope.datas.cityId;
        var casheValue = global.getLocalObject(key);
        if(!_getWeather(casheValue)) {
            jQuery.ajax({
                url: "http://aliv18.data.moji.com/whapi/json/alicityweather/forecast24hours",
                method: "post",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "APPCODE "+$scope.datas.AppCode);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                },
                data: {
                    cityId: $scope.datas.cityId,
                },
                success: function(data) {
                    try {
                        data = JSON.parse(data);
                    } catch(e) {
                        // pass
                    }
                    global.setLocalObject(key, data, 12*60*60*1000);
                    $scope.$apply(function() {
                        _getWeather(data);
                    });
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    };

    function _getWeather(data) {
        if(!data) {
            return data;
        };
        var curData = null;
        var now = moment().format("YYYY-MM-DD H");
        data.data.hourly.map(d => {
                if(now == d.date+" "+d.hour) {
                curData = d;
            }
        });

        if(curData) {
            for(let o in settings.WEATHER) {
                if(settings.WEATHER[o].text == curData.condition) {
                    $scope.realtimeWeather = settings.WEATHER[o];
                }
            }
            $scope.realtimeWeather_weather = curData.condition;
            $scope.realtimeWeather_city = data.data.city.name;
            $scope.realtimeWeather_tp = curData.temp;
            $scope.datas.realtimeWeather_pressure = curData.pressure;
            $scope.datas.realtimeWeather_humidity = curData.humidity;
            $scope.datas.realtimeWeather_windlevel = curData.windlevel;
            return true;
        }
        return false;
    }

    $scope.getLocalAirPm = function(){
        var key = "alicityweather_aqi_"+$scope.datas.cityId;
        var casheValue = global.getLocalObject(key);
        if(!casheValue) {
            jQuery.ajax({
                url: "http://aliv18.data.moji.com/whapi/json/alicityweather/aqi",
                method: "post",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "APPCODE "+$scope.datas.AppCode);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                },
                data: {
                    cityId: $scope.datas.cityId,
                },
                success: function(data) {
                    try {
                        data = JSON.parse(data);
                    } catch(e) {
                        // pass
                    }
                    global.setLocalObject(key, data, 12*60*60*1000);
                    $scope.$apply(function(){
                        $scope.datas.realtimeWeather_airPm = data.data.aqi.pm25;
                    });
                },
                error: function(data) {
                    console.log(data);
                }
            });
        } else {
            $scope.datas.realtimeWeather_airPm = casheValue.data.aqi.pm25;
        }
    };

    $scope.ajaxBuildingList = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetUserBuildings,
            _param: {
                userId: $scope.datas.user.id
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.buildBuildingsTable = function (res) {
        var tableData = {
            "title": ["id", "图片", "建筑名称", "地址", "建筑面积", "建设年代"],
            "data": [],
        };
        var cacheData = {};
        res.data.map(function (cur) {
            cur.photo_url = cur.photo_url ? cur.photo_url : settings.default_photo;
            tableData.data.push([cur.id, cur.photo_url, cur.name, cur.address, cur.area, cur.build_year]);
            cacheData[cur.id] = cur;
        });
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
            $scope.datas.cacheData = cacheData;
        });

        // 缓存用户建筑列表
        global.set_storage_key('session', [
            {
                key: 'buildingList',
                val: $scope.datas.cacheData,
            }
        ]);
        // 如果有建筑列表, 默认第一个选中
        if(res.data.length > 0) {
            global.set_storage_key('session', [
                {
                    key: 'building',
                    val: res.data[0],
                }
            ]);
            $scope.datas.curBuilding = res.data[0];
            $scope.datas.buildingId = global.read_storage("session", "building")["id"];
            $scope.$emit('updateBuildings', res.data);
        }
    };

    // 天气接口
    $scope.getLocalWeather2 = function(){
        AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch("嘉兴");
            citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    //加载天气查询插件
                    AMap.plugin('AMap.Weather', function() {
                        //创建天气查询实例
                        var weather = new AMap.Weather();
                        //执行实时天气信息查询
                        weather.getLive(result.city, function(err, data) {
                            console.log(data);
                            if(!err && data['info'] == "OK" ) {
                                $scope.$apply(function () {
                                    $scope.datas.curCityWeather = data;
                                    $scope.datas.curCityWeather.class = $scope.settings.weathers[data.weather];
                                });
                            }
                        });
                    });
                }
            });
        });
    };

    // 获取汇总数据
    $scope.getBuildingSummaryTotalData = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingSummaryTotalData,
            _param: {
                buildingId: $scope.datas.curBuilding.id
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function () {
                $scope.datas.result.summaryDatas = res.data;
                var totalFee = {
                    total: 0,
                    lastMonth: 0,
                    lastYear: 0,
                    curMonth: 0,
                    curYear: 0,
                };
                for(o in $scope.datas.result.summaryDatas) {
                    var d = $scope.datas.result.summaryDatas[o];
                    if(d) {
                        totalFee.total += d.rate * d.total;
                        totalFee.lastMonth += d.rate * d.lastMonth;
                        totalFee.lastYear += d.rate * d.lastYear;
                        totalFee.curMonth += d.rate * d.curMonth;
                        totalFee.curYear += d.rate * d.curYear;
                    }
                }
                $scope.datas.result.summaryTotalData = totalFee;
                $scope.datas.result.summaryTotalData.avgFee = totalFee.total/$scope.datas.curBuilding.area;
                $scope.datas.result.summaryTotalData.compMonth = totalFee.lastMonth == 0 ? 'N/A' : (totalFee.curMonth-totalFee.lastMonth>=0?'+':'-')+(100*(totalFee.curMonth-totalFee.lastMonth)/totalFee.lastMonth).toFixed(2)+"%";
                $scope.datas.result.summaryTotalData.compYear = totalFee.lastYear == 0 ? 'N/A' : (totalFee.curYear-totalFee.lastYear>=0?'+':'-')+(100*(totalFee.curYear-totalFee.lastYear)/totalFee.lastYear).toFixed(2)+"%";
            });
        });
    };


    // 获取图表数据// 画图表
    $scope.summaryChart = echarts.init(document.getElementById("summaryChart"));
    $scope.getBuildingChartDataByType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingChartDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: $scope.datas.fromDate,
                to: $scope.datas.toDate,
                type: $scope.datas.chartType.val,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDatas0 = res.data;
                summaryChartDraw($scope.datas);
            });
        });
    };
    function summaryChartDraw(data) {
        var opt = angular.copy($scope.datas.option);

        // 生成x轴内容
        var xlen = Math.ceil(moment(moment($scope.datas.toDate).format($scope.datas.fmt)).diff(moment($scope.datas.fromDate).format($scope.datas.fmt), 'days', true));
        for(var i=0; i<=xlen; i++) {
            opt.xAxis[0].data.push(moment($scope.datas.fromDate).add('days', i).format($scope.datas.fmt));
        }

        for(var o in data.result.chartDatas0) {
            var sd = [];
            for(var i=0; i<=xlen; i++) {
                sd.push(0);
            }
            var d = data.result.chartDatas0[o];
            opt.legend.data.push(d.name);

            d.datas.map(function (k) {
                var ind = opt.xAxis[0].data.indexOf(moment(k[d.key]).format($scope.datas.fmt));
                sd[ind] = parseFloat(k[d.val]).toFixed(4);
            });

            var tempSeries = {
                name: d.name,
                type: "bar",
                stack: "总量",
                data: sd
            };
            opt.series.push(tempSeries);
        }
        console.log(opt);
        $scope.summaryChart.setOption(opt, true);
        $scope.summaryChart.resize();
    };


    // 获取分类标题
    $scope.dailyChart = echarts.init(document.getElementById("dailyChart"));
    $scope.summaryPieChart = echarts.init(document.getElementById("summaryPieChart"));
    // 获取分类标题
    $scope.getItemGroupByType = function (callback) {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getItemGroupByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                type: $scope.datas.type,
                subType: $scope.datas.subType,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.itemGroups = {};
                // 先遍历出零级分组
                res.data.map(function (ig) {
                    if(!ig.parent) {
                        $scope.datas.result.itemGroups = ig;
                        $scope.datas.result.itemGroups.childs = [];
                    }
                });
                // 再遍历出一级分组
                res.data.map(function (ig) {
                    if(ig.parent == $scope.datas.result.itemGroups.id) {
                        $scope.datas.result.itemGroups.childs.push(ig);
                    }
                });

                if(typeof callback == "function") {
                    callback();
                }
            });
        });
    };
    $scope.getEnergyChartDataByType = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getEnergyChartDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: $scope.datas.fromDate,
                to: $scope.datas.toDate,
                type: $scope.datas.chartType.val,
                energyType: $scope.datas.type,
                parent: $scope.datas.parent ? $scope.datas.parent : $scope.datas.result.itemGroups.id,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDatas1 = res.data;
                if(Object.keys(res.data).length > 1) {
                    $scope.datas.hasChilds = true;
                } else {
                    $scope.datas.hasChilds = false;
                }
                summaryPieDraw();
                dailyChartDraw();
            });
        });
    }
    function summaryPieDraw() {
        var opt = angular.copy($scope.datas.pieOpt);
        var legend_data = [];

        for(i in $scope.datas.result.chartDatas1) {
            var d = $scope.datas.result.chartDatas1[i];
            opt.legend.data.push(d["name"]);
            var data = 0;
            for(var i=0; i< d.datas.length; i++) {
                data += parseFloat(d.datas[i][d.val]);
            }
            opt.series[0].data.push({
                value: data.toFixed(2),
                name: d["name"]
            });
        }
        console.log("summaryPieDraw", opt);
        $scope.summaryPieChart.setOption(opt, true);
        $("#summaryPieChart").width("100%");
        $scope.summaryPieChart.resize();
        return data;
    };
    function dailyChartDraw () {
        var opt = angular.copy($scope.datas.lineOpt);
        for(var i=0; i<=moment($scope.datas.toDate).diff(moment($scope.datas.fromDate), "days"); i++) {
            opt.xAxis[0].data.push(moment($scope.datas.fromDate).add(i, "day").format("YYYY-MM-DD"));
        }
        var legend_data = [];
        var tmp_sub_data = {};
        // 生成处理函数
        var func = null;
        if($scope.datas.selectSummaryChartType == 1) {
            func = function(a) {
                return parseFloat(a).toFixed(4);
            }
        } else {
            func = function(a, b) {
                try {
                    return (a / b).toFixed(4);
                } catch (e) {
                    return a;
                }
            }
        }

        for(i in $scope.datas.result.chartDatas1) {
            var d = $scope.datas.result.chartDatas1[i];
            legend_data.push(d["name"]);
            var tmpSeries = {
                name: d["name"],
                type:'line',
                //stack: '总量',
                //itemStyle: {normal: {lineStyle: {type: 'default'}}},
                data: fmtEChartData(opt.xAxis[0].data, d, func),
            };
            opt.series.push(tmpSeries);
            tmp_sub_data[d["gid"]] = d["name"];
        }

        // 添加国际值线
        legend_data.push("国际值");
        opt.series.push({
            name: "国际值",
            type: "line",
            symbol: 'none',
            itemStyle: {normal: {lineStyle: {type: 'dotted'}}},
            data: fmtEChartData(opt.xAxis[0].data, {datas: []}, undefined, $scope.datas.internationalValues[$scope.datas.type]),
            z: 100,  // 显示在最顶层
        });
        opt.legend.data = legend_data;
        $scope.datas.subTypes = tmp_sub_data;
        console.log("dailyChartDraw", opt);
        global.drawEChart($scope.dailyChart, opt);
        setTimeout(function(){
            $("#dailyChart").width("100%");
            $scope.dailyChart.resize();
        }, 0);
    };
    function fmtEChartData (categroys, data, func, defaultVal) {
        if(typeof defaultVal == "undefined") { defaultVal = 0; }
        if(typeof func == "undefined") { func = function(a){ return a.val; } };
        var tmpSeriesData = [];
        for (var i in categroys) {
            tmpSeriesData[i] = defaultVal;
            for (var j in data.datas) {
                if (data.datas[j][data.key] == categroys[i]) {
                    tmpSeriesData[i] = func(data.datas[j][data.val], 1);
                    break;
                }
            }
        }
        return tmpSeriesData;
    }



    // 管网安全
    $scope.getPipSecurity = function () {
        $scope.datas.result.tableData = {
            "title": {
                "id":"序号",
                "baseType": "基础类型",
                "type": "报警类型",
                "recordedAt": "报警时间",
                "itemName": "设备名称",
                "planVal": "计划数据",
                "realVal": "实际数据",
                "unit": "单位",
                "note": "备注",
                "status": "是否处理",
            },
            "data": [
                {
                    "id":"1",
                    "baseType": "安全用电",
                    "type": "电流超标",
                    "recordedAt": "05-01 14:20",
                    "itemName": "2F 烹饪区",
                    "planVal": "15",
                    "realVal": "17.36",
                    "unit": "A",
                    "note": "因为暂时打开大功率设备,已处理",
                    "status": "是",
                },
                {
                    "id":"2",
                    "baseType": "安全用电",
                    "type": "温度超标",
                    "recordedAt": "06-12 10:30",
                    "itemName": "-1F 指挥中心",
                    "planVal": "50",
                    "realVal": "65",
                    "unit": "摄氏度",
                    "note": "因为设备老化,已更换",
                    "status": "是",
                },
                {
                    "id":"3",
                    "baseType": "安全用电",
                    "type": "电压超标",
                    "recordedAt": "06-12 11:50",
                    "itemName": "1#进线",
                    "planVal": "380",
                    "realVal": "550",
                    "unit": "V",
                    "note": "因为设备故障,已处理",
                    "status": "是",
                },
                {
                    "id":"4",
                    "baseType": "安全用电",
                    "type": "功率超标",
                    "recordedAt": "05-01 14:20",
                    "itemName": "1#进线",
                    "planVal": "457",
                    "realVal": "487",
                    "unit": "kw",
                    "note": "因为全部设备都打开,已处理",
                    "status": "是",
                },
                {
                    "id":"5",
                    "baseType": "水流平衡",
                    "type": "流量偏低",
                    "recordedAt": "05-01 14:20",
                    "itemName": "6下",
                    "planVal": "1.25",
                    "realVal": "0.78",
                    "unit": "m3/s",
                    "note": "因为管道堵塞,已处理",
                    "status": "是",
                },
            ],
        };
        $scope.datas.result.tableData.data = [];
    }

});