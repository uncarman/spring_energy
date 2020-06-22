app.controller('remould',function ($scope, $stateParams) {

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

        type: $stateParams.type,  // 表类型
        typeName: settings.types[$stateParams.type],

        fmt: "YYYY-MM-DD",
        datePickerDom: ".datePicker",
        fromDate: moment().add(-12, 'month').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),

        result: {
            tableData: {},
        },
    };


    $scope.getDatas = function () {
        $scope.$apply(function () {
            var tableData = {
                "title": ["ID", "建筑名称", "改造支路", "改造时间", "改造单位", "情况说明", "责任人", "电话", "填写时间"],
                "data": [
                    [1, "上海学府家园", "办公空调", "2019-05-20", "央泰能源管理有限公司", "改造已完成", "张经理", "18800000000", "2019-07-01"],
                ],
            };
            $scope.datas.result.tableData = tableData;
        });
    };

});
