define(function (require) {

    var app = require('../js/app');

    app.controller('plan_energy', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
        var settings = require('comm').settings;
        var global = require('comm').global;
        var feather = require('feather');
        var echarts = require('echarts');
        var moment = require('moment');

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);    // 显示页面内容
        });

        // 最后执行
        setTimeout(function () {
            // 初始化日期控件
            $($scope.datas.datePickerDom).datepicker({
                autoclose: true,
                todayHighlight: true,
                language: "zh-CN",
                format: "yyyy-mm-dd"
            });
            $scope.getDatas();
        }, 0);

        $scope.datas = {

            buildingId: global.read_storage("session", "building")["id"],
            building: global.read_storage("session", "building"),

            type: $stateParams.type,  // 表类型

            fmt: "YYYY-MM-DD",
            datePickerDom: ".datePicker",
            fromDate: moment().add(-15, 'day').format("YYYY-MM-DD"),
            toDate: moment().format("YYYY-MM-DD"),
            chartType: "day", // 默认图表按日呈现

            typeNames: settings.typeNames,

            internationalValues: {
                "01": 1.05,
                "02": 1.05,
                "03": 1.05,
                "04": 1.05,
                "05": 1.05,
            },

            tableData: {},  // 显示table的分类数据
            cacheData: {},  // 原始分类数据

            result: {
                summaryDatas: {},
                chartDatas: {},
            },

            lineOpt: settings.defaultLineOpt,
        };

        // 获取所有计划数据
        $scope.getPlanDatas = function() {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.getEnergyPlans,
                _param: {
                    buildingId: $scope.datas.buildingId,
                    type: $scope.datas.type,
                }
            };
            return global.return_promise($scope, param);
        };

        $scope.buildPlanDatasTable = function(res) {
            var tableData = {
                "title": ["id", "计划类型", "日期", "计划用量", "计划平均量", "计算方式", "备注"],
                "data": [],
            };
            var cacheData = {};
            res.data.map(function (cur) {
                tableData.data.push([cur.id, cur.planType, cur.planDate, cur.planVal, cur.planValAvg, cur.planMethod, cur.note]);
                cacheData[cur.id] = cur;
            });
            $scope.$apply(function () {
                $scope.datas.tableData = tableData;
                $scope.datas.cacheData = cacheData;
            });
        }

        // 获取最近15日对照图表数据
        $scope.getEnergyChartDataByType = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.getEnergyChartDataByType,
                _param: {
                    buildingId: $scope.datas.buildingId,
                    from: $scope.datas.fromDate,
                    to: $scope.datas.toDate,
                    type: $scope.datas.chartType,
                    energyType: $scope.datas.type,
                    viewType: "avg", // 能耗密度
                }
            };
            global.ajax_data($scope, param, function (res) {
                $scope.$apply(function(){
                    $scope.datas.result.chartDatas = res.data;
                    summaryChartDraw($scope.datas);
                });
            });
        };

        // 获取汇总数据
        $scope.getDatas = function () {
            // 获取所有计划数据
            $scope.getPlanDatas()
                .then($scope.buildPlanDatasTable)
                .catch($scope.ajaxCatch);

            // 获取最近15日对照图表数据
            $scope.getEnergyChartDataByType();
        };

        // 画图表
        $scope.summaryChart = echarts.init(document.getElementById("summaryChart"));
        function summaryChartDraw(data) {
            var opt = angular.copy($scope.datas.lineOpt);
            var curFmt = $scope.datas.fmt;
            var to = $scope.datas.toDate

            // 生成x轴内容
            var xlen = Math.ceil(moment(moment(to).format(curFmt)).diff(moment($scope.datas.fromDate).format(curFmt), $scope.datas.chartType+'s', true));
            for(var i=0; i<=xlen; i++) {
                opt.xAxis[0].data.push(moment($scope.datas.fromDate).add($scope.datas.chartType+'s', i).format(curFmt));
            }

            var legend_data = [];
            var tmp_sub_data = {};

            // 添加实际值
            for(var o in data.result.chartDatas) {
                var sd = [];
                for(var i=0; i<=xlen; i++) {
                    sd.push(0);
                }
                var d = data.result.chartDatas[o];
                opt.legend.data.push(d.name);
                if(d.datas) {
                    d.datas.map(function (k) {
                        var ind = opt.xAxis[0].data.indexOf(moment(k[d.key]).format(curFmt));
                        sd[ind] = parseFloat(k[d.val]).toFixed(4);
                    });
                }
                legend_data.push(d["name"]);
                var tempSeries = {
                    name: d.name,
                    type: "bar",
                    stack: "总量",
                    data: sd
                };
                opt.series.push(tempSeries);
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
            $scope.datas.subTypes = tmp_sub_data;

            // 添加计划值线
            legend_data.push("计划值");
            opt.series.push({
                name: "计划值",
                type: "line",
                symbol: 'none',
                //itemStyle: {normal: {lineStyle: {type: 'dotted'}}},
                data: fmtEChartPlanData(opt.xAxis[0].data, $scope.datas.tableData.data),
                z: 100,  // 显示在最顶层
            });

            opt.legend.data = legend_data;
            //$scope.datas.subTypes = tmp_sub_data;

            console.log(opt);
            $scope.summaryChart.setOption(opt, true);
            $scope.summaryChart.resize();
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

        function fmtEChartPlanData(categroys, data) {
            var tmpSeriesData = [];

            for (var i in categroys) {
                tmpSeriesData[i] = 0;
                for(j in data) {
                    var dt = data[j][1]; // 类型
                    var dd = data[j][2]; // 日期
                    var dv = data[j][4]; // 平均值

                    // 特殊节假日
                    if(dd) {
                        if(categroys[i] == dd) {
                            tmpSeriesData[i] = dv;
                        }
                    } else {
                        var wd = moment(categroys[i]).format("d");
                        if (dt == "工作日" && wd >= 1  && wd <= 5) {
                            tmpSeriesData[i] = dv;
                        } else if(dt == "周末" && (wd < 1  || wd > 5)) {
                            tmpSeriesData[i] = dv;
                        }
                    }
                }
            }
            return tmpSeriesData;
        }

        $scope.refreshDatas = function () {
            // 获取最近15日对照图表数据
            $scope.getEnergyChartDataByType();
        }

        $scope.viewItem = function (ig) {
            $scope.datas.curMethod = "view";
            $scope.datas.curMethodReadOnly = true;
            $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
            $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
            $(".itemEdit").modal("show");
        };

        $scope.editItem = function (ig) {
            $scope.datas.curMethod = "edit";
            $scope.datas.curMethodReadOnly = false;
            $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
            $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
            $(".itemEdit").modal("show");
        };

        $scope.createItem = function() {
            $scope.datas.curMethod = "create";
            $scope.datas.curMethodReadOnly = false;
            $scope.datas.curItem = {
                buildingId: $scope.datas.buildingId,
                type: $scope.datas.type,
            };
            $scope.datas.curItemCache = {};
            $(".itemEdit").modal("show");
        }

        // 自动更新平均值
        $scope.changeAvgVal = function () {
            $scope.datas.curItem.planValAvg = ($scope.datas.curItem.planVal/$scope.datas.building.area).toFixed(4);
        }

        $scope.removeItem = function (ig, ind) {
            if(confirm("确定删除?")) {
                var param = {
                    _method: 'post',
                    _url: settings.ajax_func.removeEnergyPlan,
                    _param: {
                        id: ig[0]
                    }
                };
                global.ajax_data($scope, param, function (res) {
                    $scope.getDatas();
                });
            };
        }

        $scope.updateItem = function () {
            var curItem = $scope.datas.curItem;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.updateEnergyPlan,
                _param: {
                    id: curItem.id,
                    buildingId: curItem.buildingId,
                    type: curItem.type,
                    planType: curItem.planType,
                    planDate: curItem.planDate,
                    planVal: curItem.planVal,
                    planValAvg: curItem.planValAvg,
                    planMethod: curItem.planMethod,
                    note: curItem.note,
                }
            };
            global.ajax_data($scope, param, function (res) {
                // 刷新页面
                $scope.getDatas();
                $(".itemEdit").modal("hide");
            });
        }

        $scope.saveItem = function() {
            var curItem = $scope.datas.curItem;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.createEnergyPlan,
                _param: {
                    buildingId: curItem.buildingId,
                    type: curItem.type,
                    planType: curItem.planType,
                    planDate: curItem.planDate,
                    planVal: curItem.planVal,
                    planValAvg: curItem.planValAvg,
                    planMethod: curItem.planMethod,
                    note: curItem.note,
                }
            };
            global.ajax_data($scope, param, function (res) {
                // 刷新页面
                $scope.getDatas();
                $(".itemEdit").modal("hide");
            });
        }
    }]);

});