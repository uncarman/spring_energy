app.controller('monitor_electricity_by_group', function ($scope, $stateParams) {

    $scope.datas = {

        buildingId: global.read_storage("session", "buildingId"),

        type: $stateParams.type,
        group: $stateParams.group,
        groupCode: $stateParams.groupCode,

        fmt: "YYYY-MM-DD",
        leftOn: true,
        datePickerDom: "#reservation",
        fromDate: moment().add(-7, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),

        dgt: global.request("dgt"),
        pid: global.request("pid") || 0,

        summaryChartTypes: [
            "能耗密度kwh/m2",
            "能耗kwh",
        ],

        summaryData: {
            internationalValue: 0.15,  // 国际能耗
        },

        summaryTableTitles: [],
        summaryTableDatas: [],
    }

    console.log($scope.datas.group);

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
        global.init_top_menu($scope);
        global.init_left($scope, function () {
            setTimeout(function(){
                //$scope.summaryChart.resize();
                $scope.summaryPieChart.resize();
                $scope.dailyChart.resize();
            }, 500);
        });
        //$scope.init_datepicker($scope.datas.datePickerClassName);
        console.log("init_page");
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

    $scope.getDatas = function () {
        $scope.ajaxAmmeterGroupsSummaryDailyByType()
            .then($scope.initBaseDatas)
            .then($scope.dailyChartDraw)
            .then($scope.summaryPieDraw)
            .then($scope.summaryChartTable)
            .catch($scope.ajax_catch);
    };
    $scope.ajaxAmmeterGroupsSummaryDailyByType = function () {
        var param = {
            _method: 'get',
            _url: "/" + $scope.datas.buildingId + "/monitor/ajaxAmmeterGroupsSummaryDaily/" + $scope.datas.dgt,
            _param: {
                from : $scope.datas.fromDate,
                to: $scope.datas.toDate,
                pid: $scope.datas.pid,
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.initBaseDatas = function (data) {
        console.log(data);
        if(!$scope.datas.pageInited) {
            $scope.$apply(function () {
                $scope.datas.pageInited = true;
                $scope.datas.types = data.result.types;
                $scope.datas.typeGroups = data.result.typeGroups;
                $scope.datas.types.map(function (t) {
                    if(t.id == $scope.datas.dgt) {
                        $scope.datas.currentType = t;
                        $scope.datas.guides.push({
                            "href": "../monitor/ammeterByType?dgt="+t.id,
                            "name" : t.name,
                        })
                    }
                });
                $scope.datas.typeGroups.map(function (t) {
                    if(t.group_type == $scope.datas.dgt && t.id == $scope.datas.pid) {
                        $scope.datas.currentTypeGroup = t;
                        $scope.datas.guides.push({
                            "href": "",
                            "name" : t.name,
                        })
                    }
                });
            });
        }
        return data;
    };

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

    window._scope = $scope;
});