var app = angular.module('app',['ui.router']);
app.controller('live', function ($scope) {

    // 检查是否登录
    //global.check_logined();

    // 最后执行
    setTimeout(function(){
        $scope.getDatas();
    }, 0);

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {
        mapId: "map",
        curCity: null,
        curCityWeather: null,

        user: global.read_storage("session", "user"),
        curBuilding: global.read_storage("session", "building"),
        buildingId: global.read_storage("session", "building")["id"],
        buildingList: global.read_storage("session", "buildingList"),
    };

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
                buildingId: $scope.datas.buildingId
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function () {
                $scope.datas.result.summaryDatas = res.data;
                for(o in $scope.datas.result.summaryDatas) {
                    var total = {

                    };

                    var d = $scope.datas.result.summaryDatas[o];
                    if(d) {
                        d.name = d.name.replace("量", "费");
                        d.unit = "元";
                        d.total = d.rate * d.total;
                        d.lastMonth = d.rate * d.lastMonth;
                        d.lastYear = d.rate * d.lastYear;
                        d.curMonth = d.rate * d.curMonth;
                        d.curYear = d.rate * d.curYear;
                    }
                }
            });
        });
    };

    // 实时用能
    // 获取图表数据
    $scope.getBuildingChartDataByType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingChartDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: moment().format("YYYY-MM-DD 00"),
                to: moment().format("YYYY-MM-DD HH"),
                type: "hour",
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDatas = res.data;
                summaryChartDraw($scope.datas);
            });
        });
    };

    // 画图表
    $scope.summaryChart = echarts.init(document.getElementById("summaryChart"));
    function summaryChartDraw(data) {
        var opt = angular.copy($scope.datas.option);

        // 生成x轴内容
        var xlen = Math.ceil(moment(moment($scope.datas.toDate).format($scope.datas.fmt)).diff(moment($scope.datas.fromDate).format($scope.datas.fmt), 'days', true));
        for(var i=0; i<=xlen; i++) {
            opt.xAxis[0].data.push(moment($scope.datas.fromDate).add('days', i).format($scope.datas.fmt));
        }

        for(var o in data.result.chartDatas) {
            var sd = [];
            for(var i=0; i<=xlen; i++) {
                sd.push(0);
            }
            var d = data.result.chartDatas[o];
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

    $scope.getDatas = function () {
        // 获取天气
        $scope.getLocalWeather();

        // 获取汇总数据
        $scope.getBuildingSummaryTotalData();

        // 左侧实时用能数据
        $scope.getBuildingChartDataByType();

    }

});