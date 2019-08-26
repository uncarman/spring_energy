
app.controller('plan_energy',function ($scope, $stateParams) {

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
        $scope.$apply(function () {
            $scope.datas.chartType = $scope.datas.chartTypes[1];
        });
        $scope.getDatas();
    }, 0);

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],

        type: $stateParams.type,  // 表类型
        typeNames: settings.types[$stateParams.type],

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
        typeNames: settings.typeNames,

        result: {
            summaryDatas: {},
            chartDatas: {},
            tableData: {},
        },

        lineOpt: settings.defaultLineOpt,
    };

    // 生成对比年份
    for (var i = 1; i < 6; i++) {
        var year = moment().add(-i, 'year').format("YYYY");
        $scope.datas.chartCompares.push({
            val: year,
            name: year,
        })
    }

    // 获取汇总数据
    $scope.getDatas = function () {
        $scope.$apply(function () {

            $scope.datas.result.tableData = {
                "title": ["ID", "类型", "日期", "计划电量(KWH)", "平均密度(KWH/M2)", "计算方式", "备注"],
                "data": [
                    [1, "工作日", "", 12000, 1.0976, "所有用电 * 8小时 + 部分用电 * 16小时", ""],
                    [2, "周末", "", 6000, 0.5488, "部分用电 * 24小时", ""],
                    [3, "节假日", "", 8000, 0.7318, "所有用电 * 4小时 + 部分用电 * 16小时", ""],
                    [3, "普通", $scope.datas.toDate, 11000, 1.0062, "所有用电 * 8小时 + 部分用电 * 16小时 - 节能部分 * 8", ""],
                ]
            };
        });
    };

});