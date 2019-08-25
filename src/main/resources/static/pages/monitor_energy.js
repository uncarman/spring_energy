app.controller('monitor_energy',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    // 最后执行
    setTimeout(function(){
        // 初始化日期控件
        $($scope.datas.datePickerDom).datepicker({
            autoclose: true,
            todayHighlight: true,
            language: "zh-CN",
            format: "yyyy-mm-dd"
        });
        $scope.$apply(function () {
            $scope.datas.chartType = $scope.datas.chartTypes[1];
            $scope.datas.chartCompare = $scope.datas.chartCompares[0];
        });
        $scope.getDatas();
    }, 0);

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],

        type: $stateParams.type,  // 表类型
        typeName: settings.types[$stateParams.type],

        fmt: "YYYY-MM-DD",
        datePickerDom: ".datePicker",
        fromDate: moment().add(-15, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),

        chartTypes: settings.defaultDateTypes,
        chartCompares: [
//                        {
//                            val: 2018,
//                            name: "2018年同比数据"
//                        }
        ],
        chartType: null,  // 默认按天
        chartCompare: null,  // 默认上一年度

        result:{
            summaryDatas: {},
            chartDatas: {},
            tableData: {},
        },

        lineOpt: settings.defaultLineOpt,
    };

    // 生成对比年份
    for(var i = 1; i < 6; i++) {
        var year = moment().add(-i, 'year').format("YYYY");
        $scope.datas.chartCompares.push({
            val: year,
            name: year,
        })
    }

    // 获取汇总数据
    $scope.getBuildingSummaryTotalDataByType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingSummaryTotalDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                type: $scope.datas.type
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.summaryDatas = res.data;
            });
        });
    };

    // 获取图表数据
    $scope.getEnergyChartDataByType = function () {
        var to = $scope.datas.toDate
        if($scope.datas.chartType.val == "hour") {
            to = $scope.datas.toDate + " 24";
        } else {
            to = moment($scope.datas.toDate).format($scope.datas.chartType.paramFmt);
        }
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getEnergyChartDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: moment($scope.datas.fromDate).format($scope.datas.chartType.paramFmt), // $scope.datas.fromDate,
                to: to,   // $scope.datas.toDate,
                type: $scope.datas.chartType.val,
                energyType: $scope.datas.type,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDatas = res.data;
                summaryChartDraw($scope.datas);
            });
        });
    };

    // 获取table数据
    $scope.getEnergyTableDataByType = function () {
        var to = $scope.datas.toDate
        if($scope.datas.chartType.val == "hour") {
            to = $scope.datas.toDate + " 24";
        } else {
            to = moment($scope.datas.toDate).format($scope.datas.chartType.paramFmt);
        }
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getEnergyTableDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: moment($scope.datas.fromDate).format($scope.datas.chartType.paramFmt), // $scope.datas.fromDate,
                to: to,   // $scope.datas.toDate,
                type: $scope.datas.chartType.val,
                energyType: $scope.datas.type,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.tableData.title = res.data[0];
                $scope.datas.result.tableData.data = res.data.slice(1, res.data.length);
            });
        });
    };

    // 获取数据
    $scope.getDatas = function(){
        $scope.getBuildingSummaryTotalDataByType();
        $scope.getEnergyChartDataByType();
        $scope.getEnergyTableDataByType();
    };

    $scope.changeType = function (ind) {
        console.log(ind);
    };

    // 画图表
    $scope.summaryChart = echarts.init(document.getElementById("summaryChart"));

    function summaryChartDraw(data) {
        var opt = angular.copy($scope.datas.lineOpt);
        var curFmt = $scope.datas.chartType.fmt;

        var to = $scope.datas.toDate
        if($scope.datas.chartType.val == "hour") {
            to = $scope.datas.toDate + " 24";
        } else {
            to = moment($scope.datas.toDate).format($scope.datas.chartType.paramFmt);
        }

        // 生成x轴内容
        var xlen = Math.ceil(moment(moment(to).format($scope.datas.chartType.fmt)).diff(moment($scope.datas.fromDate).format($scope.datas.chartType.fmt), $scope.datas.chartType.val+'s', true));
        for(var i=0; i<=xlen; i++) {
            opt.xAxis[0].data.push(moment($scope.datas.fromDate).add($scope.datas.chartType.val+'s', i).format($scope.datas.chartType.fmt));
        }

        for(var o in data.result.chartDatas) {
            var sd = [];
            for(var i=0; i<=xlen; i++) {
                sd.push(0);
            }
            var d = data.result.chartDatas[o];
            opt.legend.data.push(d.name);
            if(d.datas) {
                d.datas.map(function (k) {
                    var ind = opt.xAxis[0].data.indexOf(moment(k[d.key]).format($scope.datas.chartType.fmt));
                    sd[ind] = parseFloat(k[d.val]).toFixed(4);
                });
            }

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

    // 点击按刷新页面
    $scope.refreshDatas = function () {
        $scope.getDatas();
    }
});