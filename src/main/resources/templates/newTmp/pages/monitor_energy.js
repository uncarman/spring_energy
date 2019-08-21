app.controller('monitor_energy',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "buildingId"),

        type: $stateParams.type,
        group: $stateParams.group,

        fmt: "YYYY-MM-DD",
        datePickerDom: "#reservation",
        fromDate: moment().add(-15, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
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

    $scope.datas.result = monitorSummary.result;
    $scope.datas.result.chartDatas.ammeter.datas = [];
    $scope.datas.result.chartDatas.watermeter.datas = [];
    $scope.datas.result.chartDatas.gasmeter.datas = [];
    $scope.datas.result.chartDatas.vapormeter.datas = [];
    $scope.datas.result.dailyList.data = [];
    //  根据日期生成随机数据
    var normalAmmeterDaily = 5000;
    var xlen = Math.ceil(moment(moment($scope.datas.toDate).format($scope.datas.fmt)).diff(moment($scope.datas.fromDate).format($scope.datas.fmt), 'days', true));
    for(var i=0; i<=xlen; i++) {
        var d = moment($scope.datas.fromDate).add('days', i).format($scope.datas.fmt);
        var ad = (normalAmmeterDaily * Math.random()).toFixed(2);
        var wd = (normalAmmeterDaily / 10 * Math.random()).toFixed(2);
        var gd = (normalAmmeterDaily / 30 * Math.random()).toFixed(2);
        var vd = (normalAmmeterDaily / 100 * Math.random()).toFixed(2);
        $scope.datas.result.chartDatas.ammeter.datas.push({
            "val": ad,
            "key": d
        });
        $scope.datas.result.chartDatas.watermeter.datas.push({
            "val": wd,
            "key": d
        });
        $scope.datas.result.chartDatas.gasmeter.datas.push({
            "val": gd,
            "key": d
        });
        $scope.datas.result.chartDatas.vapormeter.datas.push({
            "val": vd,
            "key": d
        });
        $scope.datas.result.dailyList.data.unshift([d, ad, (ad/10000).toFixed(4), wd, (wd/10000).toFixed(4), gd, (gd/10000).toFixed(4), vd, (vd/10000).toFixed(4)]);
    }

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