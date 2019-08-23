app.controller('monitor_energy',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],

        type: $stateParams.type,  // 表类型

        fmt: "YYYY-MM-DD",
        datePickerDom: "#reservation",
        fromDate: moment().add(-15, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),

        fromDate: "2019-01-15",
        toDate: "2019-01-25",

        chartTypes: [
            {
                val: "hour",
                name: "按小时",
                "fmt" : "D-H",
            },
            {
                val: "day",
                name: "按日",
                "fmt" : "Y-M-D",
            },
            {
                val: "month",
                name: "按月",
                "fmt" : "Y-M",
            },
            {
                val: "year",
                name: "按年",
                "fmt" : "Y",
            }
        ],
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

        option: {
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
    };

    // 生成对比年份
    for(var i = 5; i > 0; i--) {
        var year = moment().add(-i, 'year').format("YYYY");
        $scope.datas.chartCompares.push({
            val: year,
            name: year+"年同比数据",
        })
    }
    $scope.datas.chartType = $scope.datas.chartTypes[0];
    $scope.datas.chartCompare = $scope.datas.chartCompares[0];

    // 获取数据
    $scope.getDatas = function(){
        // 获取汇总数据
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

        // 获取图表数据
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getEnergyChartDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: $scope.datas.fromDate,
                to: $scope.datas.toDate,
                type: $scope.datas.type,
                energyType: $scope.datas.type,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.chartDatas = res.data;
                summaryChartDraw($scope.datas);
            });
        });

        // 获取table数据
        var param = {
            _method: 'post',
            _url: settings.ajax_func.getEnergyTableDataByType,
            _param: {
                buildingId: $scope.datas.buildingId,
                from: $scope.datas.fromDate,
                to: $scope.datas.toDate,
                type: $scope.datas.type,
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.result.tableData.title = res.data[0];
                $scope.datas.result.tableData.data = res.data.slice(1, res.data.length);
            });
        });
    };

    $scope.getDatas();

    // $scope.datas.result = monitorSummary.result;
    // $scope.datas.result.chartDatas.ammeter.datas = [];
    // $scope.datas.result.chartDatas.watermeter.datas = [];
    // $scope.datas.result.chartDatas.gasmeter.datas = [];
    // $scope.datas.result.chartDatas.vapormeter.datas = [];
    // $scope.datas.result.dailyList.data = [];
    // //  根据日期生成随机数据
    // var normalAmmeterDaily = 5000;
    // var xlen = Math.ceil(moment(moment($scope.datas.toDate).format($scope.datas.fmt)).diff(moment($scope.datas.fromDate).format($scope.datas.fmt), 'days', true));
    // for(var i=0; i<=xlen; i++) {
    //     var d = moment($scope.datas.fromDate).add('days', i).format($scope.datas.fmt);
    //     var ad = (normalAmmeterDaily * Math.random()).toFixed(2);
    //     var wd = (normalAmmeterDaily / 10 * Math.random()).toFixed(2);
    //     var gd = (normalAmmeterDaily / 30 * Math.random()).toFixed(2);
    //     var vd = (normalAmmeterDaily / 100 * Math.random()).toFixed(2);
    //     $scope.datas.result.chartDatas.ammeter.datas.push({
    //         "val": ad,
    //         "key": d
    //     });
    //     $scope.datas.result.chartDatas.watermeter.datas.push({
    //         "val": wd,
    //         "key": d
    //     });
    //     $scope.datas.result.chartDatas.gasmeter.datas.push({
    //         "val": gd,
    //         "key": d
    //     });
    //     $scope.datas.result.chartDatas.vapormeter.datas.push({
    //         "val": vd,
    //         "key": d
    //     });
    //     $scope.datas.result.dailyList.data.unshift([d, ad, (ad/10000).toFixed(4), wd, (wd/10000).toFixed(4), gd, (gd/10000).toFixed(4), vd, (vd/10000).toFixed(4)]);
    // }

    //Date range picker
    $($scope.datas.datePickerDom).daterangepicker({
        startDate: moment($scope.datas.fromDate),
        endDate: moment($scope.datas.toDate),
        locale: {
            format: $scope.datas.fmt
        },
    });

    // 画图表
    $scope.summaryChart = echarts.init(document.getElementById("summaryChart"));
    summaryChartDraw($scope.datas);

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
                var ind = opt.xAxis[0].data.indexOf(moment(k.key).format($scope.datas.fmt));
                sd[ind] = parseFloat(k.val).toFixed(4);
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