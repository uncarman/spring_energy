var app = angular.module('app',['ui.router']);
app.controller('live',function ($scope) {

    // 检查是否登录
    global.check_logined();

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    // 最后执行
    setTimeout(function () {
        $scope.getDatas();
    }, 0);

    $scope.datas = {
        user: global.read_storage("session", "user"),
        curBuilding: global.read_storage("session", "building"),
        buildingList: global.read_storage("session", "buildingList"),
        result:{
            summaryDatas: [],
            chartDatas: {},
            chartSumData: {},

            chartDetailDatas: {},
        },

        internationalValues: {
            "01": 0.0015,
            "02": 0.0015,
            "03": 0.0015,
            "04": 0.0015,
            "05": 0.0015,
        },
        option: settings.defaultLineOpt,
        lineOpt: settings.defaultLineOpt,
        pieOpt: settings.defaultPieOpt,
    };
    // 画图表
    $scope.summaryChart = echarts.init(document.getElementById("summaryChart"), echart_dark_theme);  // 左侧小图
    $scope.dailyChart = echarts.init(document.getElementById("dailyChart"), echart_dark_theme);    // 中间饼图
    $scope.summaryPieChart = echarts.init(document.getElementById("summaryPieChart"), echart_dark_theme); // 中间线图

    $scope.changeBuilding = function(building) {
        $scope.datas.curBuilding = building;
        global.set_storage_key('session', [
            {
                key: 'building',
                val: building,
            }
        ]);
    };

    $scope.doLogout = function () {
        global.do_logout();
        window.location.href = "/login";
    };

    $scope.gotoHome = function () {
        window.location.href = "/";
    };

    $scope.gotoProfile = function () {
        window.location.href = "/#/profile";
    };

    $scope.gotoHelp = function () {
        window.location.href = "/#/help";
    };

    $scope.$on("updateBuildings", function(event, data) {
        $scope.$apply(function () {
            $scope.datas.buildingList = data;
            $scope.datas.curBuilding = data[0];
        });
    });

    // 天气接口
    $scope.getLocalWeather = function(){
        AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch();
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
            });
        });
    };

    // 实时用能 获取左侧图表数据
    $scope.getBuildingChartDataByType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingChartDataByType,
            _param: {
                buildingId: $scope.datas.curBuilding.id,
                from: moment().format("YYYY-MM-DD 00"),
                to: moment().format("YYYY-MM-DD HH"),
                type: "hour",
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDatas = res.data;
                summaryChartDraw($scope.datas, {
                    fromDate:moment().format("YYYY-MM-DD 00"),
                    toDate:moment().format("YYYY-MM-DD HH"),
                    fmt:"YYYY-MM-DD HH",
                    type: "hour"
                });
            });
        });
    };

    function summaryChartDraw(data, option) {
        var sumData = {};

        if(typeof option == "undefined") {
            option = $scope.datas;
        }
        var opt = angular.copy($scope.datas.option);
        opt.grid = {
            "top": 20,
            "left": 40,
            "right": 20,
            "bottom": 30
        };
        opt.yAxis.splitLine = opt.xAxis.splitLine = {
            show: false
        };
        opt.yAxis.axisLabel = opt.xAxis.axisLabel = false;
        opt.yAxis.axisLine = opt.xAxis.axisLine = {
            lineStyle: {
                color: "rgba(238,155,0,0.4)"
            }
        };
        opt.dataZoom = {
            type: 'inside'
        };

        // 生成x轴内容
        var xlen = Math.ceil(moment(moment(option.toDate).format(option.fmt)).diff(moment(option.fromDate).format(option.fmt), option.type+'s', true));
        for(var i=0; i<=xlen; i++) {
            opt.xAxis[0].data.push(moment(option.fromDate).add(option.type, i).format(option.fmt));
        }

        for(var o in data.result.chartDatas) {
            var sd = [];
            for(var i=0; i<=xlen; i++) {
                sd.push(0);
            }
            var d = data.result.chartDatas[o];
            sumData[d.name] = {
                name: d.name,
                subType: o,
                value: 0
            };

            d.datas.map(function (k) {
                var ind = opt.xAxis[0].data.indexOf(moment(k[d.key]).format(option.fmt));
                sd[ind] = parseFloat(k[d.val]).toFixed(0);
                sumData[d.name].value += k[d.val];
            });

            var tempSeries = {
                name: d.name,
                type: "bar",
                stack: "总量",
                data: sd,
                label : {
                    show: true, position: 'insideTop'
                }
            };
            opt.series.push(tempSeries);
            $scope.datas.result.chartSumData = sumData;
        }
        console.log(JSON.stringify(opt));
        $scope.summaryChart.setOption(opt, true);
        $scope.summaryChart.resize();

        var keys = Object.keys(sumData);
        var i = 0;
        $scope.displayDetail(sumData[Object.keys(sumData)[0]]);
        setInterval(function () {
            i = i+1 < keys.length ? i+1 : 0;
            $scope.displayDetail(sumData[keys[i]]);
        }, 15000);
    };

    $scope.displayDetail = function(energy) {
        $scope.datas.selectedEnergy = energy;
        console.log(energy);
        // 先获取一级组id
        $scope.getItemGroupByType({
            type: energy.subType,
            subType: "能耗分项",
        });
    };

    // 中间分项数据
    // 获取分类标题
    $scope.getItemGroupByType = function (opt) {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getItemGroupByType,
            _param: {
                buildingId: $scope.datas.curBuilding.id,
                type: opt.type,
                subType: opt.subType,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.itemGroups = {};
                // 先遍历出零级分组
                res.data.map(function (ig) {
                    if(!ig.parent) {
                        // 拿到一级id
                        $scope.getEnergyChartDataByType({
                            fromDate: moment().add(-7, 'day').format("YYYY-MM-DD"),
                            toDate: moment().format("YYYY-MM-DD"),
                            type: "day",
                            energyType: opt.type,
                            parent: ig.id,
                            fmt: "YYYY-MM-DD",
                        });
                    }
                });
            });
        });
    };
    $scope.getEnergyChartDataByType = function (opt) {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getEnergyChartDataByType,
            _param: {
                buildingId: $scope.datas.curBuilding.id,
                from: opt.fromDate,
                to: opt.toDate,
                type: opt.type,
                energyType: opt.energyType,
                parent: opt.parent,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDetailDatas = res.data;
                summaryPieDraw();
                dailyChartDraw(opt);
            });
        });
    };

    function summaryPieDraw() {
        var opt = angular.copy($scope.datas.pieOpt);
        var legend_data = [];

        for(i in $scope.datas.result.chartDetailDatas) {
            var d = $scope.datas.result.chartDetailDatas[i];
            var data = 0;
            for(var i=0; i< d.datas.length; i++) {
                data += parseFloat(d.datas[i][d.val]);
            }
            delete opt.series[0].roseType;
            opt.series[0].data.push({
                value: data.toFixed(2),
                name: d["name"]+" "+data.toFixed(0),
            });
            opt.legend.data.push(d["name"]);
        }
        console.log("summaryPieDraw", opt);
        console.log(JSON.stringify(opt));
        $scope.summaryPieChart.setOption(opt, true);
        $("#summaryPieChart").width("100%");
        $scope.summaryPieChart.resize();
        return data;
    };

    function dailyChartDraw (opts) {
        var opt = angular.copy($scope.datas.lineOpt);
        opt.grid = {
            top: 100,
            bottom: 50,
        };
        for(var i=0; i<=moment(opts.toDate).diff(moment(opts.fromDate), opts.type+"s"); i++) {
            opt.xAxis[0].data.push(moment(opts.fromDate).add(i, opts.type).format(opts.fmt));
        }
        var legend_data = [];
        var tmp_sub_data = {};
        // 生成处理函数
        var func = function(a) {
            return parseFloat(a).toFixed(0);
        };
        for(i in $scope.datas.result.chartDetailDatas) {
            var d = $scope.datas.result.chartDetailDatas[i];
            legend_data.push(d["name"]);
            var tmpSeries = {
                name: d["name"],
                type:'line',
                z: 3,
                label: {
                    normal: {
                        position: 'top',
                        show: true
                    }
                },
                //stack: '总量',
                //itemStyle: {normal: {lineStyle: {type: 'default'}}},
                data: fmtEChartData(opt.xAxis[0].data, d, func),
            };
            opt.series.push(tmpSeries);
            tmp_sub_data[d["gid"]] = d["name"];
        }


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
                    tmpSeriesData[i] = func(data.datas[j][data.val], data.area);
                    break;
                }
            }
        }
        return tmpSeriesData;
    }
    
    $scope.getDatas = function () {
        // 获取天气
        $scope.getLocalWeather();

        // 获取汇总数据
        $scope.getBuildingSummaryTotalData();

        // 左侧实时用能数据
        $scope.getBuildingChartDataByType();
    }

});