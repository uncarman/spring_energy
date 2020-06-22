app.controller('statistics',function ($scope) {

    $scope.$watch('$viewContentLoaded', function () {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    // 最后执行
    setTimeout(function () {
        $scope.getDatas();
    }, 0);

    $scope.datas = {
        // 建筑id
        buildingId: global.read_storage("session", "building")["id"],

        fmt: "YYYY-MM",
        datePickerDom: "#reservation",
        fromDate: moment().add(-1, 'year').format("YYYY-MM"),
        toDate: moment().format("YYYY-MM"),
        todayStr: moment().format("YYYY-MM-DD"),
        type: "month", // 默认按月显示

        result: {
            summaryDatas: {},
            chartDatas: {},
            tableData: {},
        },

        option: settings.defaultLineOpt,

    }

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
            });
        });
    };

    // 获取图表数据
    $scope.getBuildingChartDataByType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingChartDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: $scope.datas.fromDate,
                to: $scope.datas.toDate,
                type: $scope.datas.type,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function () {
                $scope.datas.result.chartDatas = res.data;
                summaryChartDraw($scope.datas);
            });
        });
    };

    // 获取table数据
    $scope.getBuildingTableDataByType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getBuildingTableDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: $scope.datas.fromDate,
                to: $scope.datas.toDate,
                type: $scope.datas.type,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function () {
                $scope.datas.result.tableData.title = res.data[0];
                $scope.datas.result.tableData.data = res.data.slice(1, res.data.length);
            });
        });
    };

    // 获取数据
    $scope.getDatas = function () {
        $scope.getBuildingSummaryTotalData();
        $scope.getBuildingChartDataByType();
        $scope.getBuildingTableDataByType();
    };

    // 画图表
    $scope.summaryChart = echarts.init(document.getElementById("summaryChart"));

    function summaryChartDraw(data) {
        var opt = angular.copy($scope.datas.option);
        var dateType = $scope.datas.type+"s";

        // 生成x轴内容
        var xlen = Math.ceil(moment(moment($scope.datas.toDate).format($scope.datas.fmt)).diff(moment($scope.datas.fromDate).format($scope.datas.fmt), dateType, true));
        xlen = Math.min(10000, xlen); // 防止浏览器蹦了
        for(var i=0; i<=xlen; i++) {
            opt.xAxis[0].data.push(moment($scope.datas.fromDate).add(dateType, i).format($scope.datas.fmt));
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

});