app.controller('maintenance_order',function ($scope) {

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

    $scope.getDatas = function () {
        //
    }

});