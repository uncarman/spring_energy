app.controller('monitor_electricity_by_group', function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "buildingId"),

        type: $stateParams.type,
        subType: $stateParams.subType,
        parent: $stateParams.parent,

        fmt: "YYYY-MM-DD",
        leftOn: true,
        datePickerDom: "#reservation",
        fromDate: moment().add(-7, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),

        fromDate: "2019-01-15",
        toDate: "2019-01-25",

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
        query: {
//                    type: null,
//                    compareTo: null,
        },
        chartType: null,  // 默认按天
        chartCompare: null,  // 默认上一年度

        result:{
            itemGroups: {},
            summaryDatas: {},
            chartDatas: {},
            tableData: {},
        },

    }

    console.log($scope.datas.group);

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

    // 获取分类标题
    $scope.getItemGroupByType = function () {
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
            });
        });
    }

    // 获取分类标题
    $scope.getEnergyChartDataByType = function() {
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
    }

    // 获取table数据
    $scope.getEnergyTableDataByType = function() {
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
    }

    $scope.getDatas = function () {
        // 获取分类标题
        $scope.getItemGroupByType();
        // 获取图表数据
        $scope.getEnergyChartDataByType();
        // 获取table数据
        $scope.getEnergyTableDataByType();
    };

    //Date range picker
    $($scope.datas.datePickerDom).daterangepicker({
        startDate: moment($scope.datas.fromDate),
        endDate: moment($scope.datas.toDate),
        locale: {
            format: $scope.datas.fmt
        },
    });










    $scope = global.init_base_scope($scope);
    $scope.compareClass = global.normalCompareClass;
    $scope.compareValue = global.normalCompareValue;



    $scope.ch_datas_on = function () {
        $scope.datas.leftOn = !$scope.datas.leftOn;
        global.init_left($scope, function () {
            setTimeout(function () {
                //$scope.summaryChart.resize();
                $scope.summaryPieChart.resize();
                $scope.dailyChart.resize();
            }, 500);
        });
    }

    $scope.init_page = function () {
        $scope.dailyChart = echarts.init(document.getElementById("dailyChart"));
        $scope.summaryPieChart = echarts.init(document.getElementById("summaryPieChart"));
        $scope.getDatas();
    };

    $scope.refresh_datas = function () {
        //$scope.datas.fromDate = $($scope.datas.datePickerClassName).find("input").eq(0).val();
        //$scope.datas.toDate = $($scope.datas.datePickerClassName).find("input").eq(1).val();
        //$scope.getDatas();
    }

    $scope.pageJump = function(url) {
        if(url != "") {
            window.location.href = url;
        }
    }
    $scope.pageGoto = function(dgt, pid) {
        if(typeof pid == "undefined") {
            pid = 0;
        }
        if($scope.datas.dgt != dgt || $scope.datas.pid != pid) {
            window.location.href = "../monitor/ammeterByType?pid="+pid+"&dgt="+dgt;
        }
    }



    var opts = {
        color: settings.colors,
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:[]
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data:[]
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
//                    {
//                        name:'照明与插座',
//                        type:'line',
//                        stack: '总量',
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
//                        data:[]
//                    },
        ]
    };
    $scope.dailyChartDraw = function (data) {
        console.log(data);
        var opt = angular.copy(opts);
        for(var i=0; i<=moment(data.result.to).diff(moment(data.result.from), "days"); i++) {
            opt.xAxis[0].data.push(moment(data.result.from).add(i, "day").format("YYYY-MM-DD"));
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

        data.result["dailyDatas"].map(function (d) {
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
        });
        // 添加国际值线
        legend_data.push("国际值");
        opt.series.push({
            name: "国际值",
            type: "line",
            symbol: 'none',
            itemStyle: {normal: {lineStyle: {type: 'dotted'}}},
            data: fmtEChartData(opt.xAxis[0].data, {datas: []}, undefined, $scope.datas.summaryData.internationalValue),
            z: 100,  // 显示在最顶层
        });
        opt.legend.data = legend_data;
        $scope.datas.subTypes = tmp_sub_data;
        console.log(opt);
        global.drawEChart($scope.dailyChart, opt);
        return data;
    };
    function fmtEChartData (categroys, data, func, defaultVal) {
        if(typeof defaultVal == "undefined") { defaultVal = 0; }
        if(typeof func == "undefined") { func = function(a){ return a.val; } };
        var tmpSeriesData = [];
        for (var i in categroys) {
            tmpSeriesData[i] = defaultVal;
            for (var j in data.datas) {
                if (data.datas[j].key == categroys[i]) {
                    tmpSeriesData[i] = func(data.datas[j].val, data.prop_area);
                    break;
                }
            }
        }
        return tmpSeriesData;
    }

    var pieOpt = {
        color: settings.colors,
        tooltip : {
            trigger: 'top',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data:[],
            x : 'center',
            y: "10px",
        },
        calculable : true,
        series : [
            {
                name:'占比',
                type:'pie',
                radius : [30, 110],
                center : ['50%', '50%'],
                roseType : 'area',
                x: '50%',               // for funnel
                max: 40,                // for funnel
                sort : 'ascending',     // for funnel
                data:[]
            }
        ]
    };
    $scope.summaryPieDraw = function (data) {
        var opt = angular.copy(pieOpt);
        var legend_data = [];
        data.result["dailyDatas"].map(function (d) {
            opt.legend.data.push(d["name"]);
            var data = 0;
            for(var i=0; i< d.datas.length; i++) {
                data += parseFloat(d.datas[i].val);
            }
            opt.series[0].data.push({
                value: data.toFixed(2),
                name: d["name"]
            });
        });
        console.log(opt);
        $scope.summaryPieChart.setOption(opt, true);
        $scope.summaryPieChart.resize();
        return data;
    };

    $scope.chSummaryChartInput = function () {
        if(typeof $scope.datas.selectSummaryChartType == "undefined") {
            $scope.datas.selectSummaryChartType = 0;
        }
        $scope.dailyChartDraw($scope.datas.cacheData);
    }

    $scope.summaryChartTable = function (data) {
        $scope.datas.summaryTableTitles = ["日期"];
        $scope.datas.summaryTableDatas = {};

        for(var i=0; i<=moment(data.result.to).diff(moment(data.result.from), "days"); i++) {
            var k = moment(data.result.from).add(i, "day").format("YYYY-MM-DD");
            $scope.datas.summaryTableDatas[k] = [k];
        }

        data.result["dailyDatas"].map(function (d) {
            $scope.datas.summaryTableTitles.push(d["name"]);
            $scope.datas.summaryTableTitles.push(d["name"]+"密度");
            var ind = $scope.datas.summaryTableTitles.indexOf(d["name"]);
            for(var o in $scope.datas.summaryTableDatas) {
                $scope.datas.summaryTableDatas[o].push(0);
                $scope.datas.summaryTableDatas[o].push(0);
            }
            for(var i in d.datas) {
                $scope.datas.summaryTableDatas[d.datas[i].key][ind] = parseFloat(d.datas[i].val).toFixed(4);
                $scope.datas.summaryTableDatas[d.datas[i].key][ind+1] = (d.datas[i].val/d.prop_area).toFixed(4);
            }
        });
        console.log($scope.datas.summaryTableTitles);
        console.log($scope.datas.summaryTableDatas);
        $scope.$apply(function () {
            $scope.datas.summaryTableTitles = $scope.datas.summaryTableTitles;
            $scope.datas.summaryTableDatas = $scope.datas.summaryTableDatas;
        });

        $scope.datas.cacheData = data;
    };

    $scope.init_page();

});