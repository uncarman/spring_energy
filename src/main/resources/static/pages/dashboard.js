app.controller('dashboard',function ($scope) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
        $("#bimFrame").css("height", $(".right_col").height() - 130);
    });

    // 最后执行
    setTimeout(function(){
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

            tableData: {},
        },

        internationalValues: {
            "01": 0.0015,
            "02": 0.0015,
            "03": 0.0015,
            "04": 0.0015,
            "05": 0.0015,
        },

    }

    $scope.goto = global.goto;

    $scope.getDatas = function () {
        // 获取天气
        $scope.getLocalWeather();

        // 获取汇总数据
        $scope.getBuildingSummaryTotalData();

        // 管网安全
        $scope.getPipSecurity();
    };

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
                $scope.datas.result.summaryTotalData.compMonth = totalFee.lastMonth == 0 ? 'N/A' : (totalFee.curMonth-totalFee.lastMonth>=0?'+':'-')+(100*(totalFee.curMonth-totalFee.lastMonth)/totalFee.lastMonth).toFixed(2)+"%";
                $scope.datas.result.summaryTotalData.compYear = totalFee.lastYear == 0 ? 'N/A' : (totalFee.curYear-totalFee.lastYear>=0?'+':'-')+(100*(totalFee.curYear-totalFee.lastYear)/totalFee.lastYear).toFixed(2)+"%";
            });
        });
    };

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
                    "recordedAt": "2019-05-01 14:20",
                    "itemName": "2F 烹饪区、面点间、切配区",
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
                    "recordedAt": "2019-06-12 10:30",
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
                    "recordedAt": "2019-06-12 11:50",
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
                    "recordedAt": "2019-05-01 14:20",
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
                    "recordedAt": "2019-05-01 14:20",
                    "itemName": "6下",
                    "planVal": "1.25",
                    "realVal": "0.78",
                    "unit": "m3/s",
                    "note": "因为管道堵塞,已处理",
                    "status": "是",
                },
            ],
        };
    }

});