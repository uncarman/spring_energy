app.controller('warning_settings',function ($scope) {

    $scope.$watch('$viewContentLoaded', function () {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    // 最后执行
    setTimeout(function () {
        $scope.getDatas();
    }, 0);

    $scope.datas = {
        // 建筑id
        user: global.read_storage("session", "user"),
        buildingId: global.read_storage("session", "building")["id"],

        fmt: "YYYY-MM",
        fromDate: moment().add(-1, 'year').format("YYYY-MM"),
        toDate: moment().format("YYYY-MM"),
        todayStr: moment().format("YYYY-MM-DD"),

        result: {
            summaryDatas: [],
            tableData: {},
        },
    }

    $scope.getDatas = function () {
        $scope.$apply(function () {
            var types = ["01", "02", "03", "05"];
            for(i in types) {
                var curType = types[i];
                $scope.datas.result.summaryDatas.push({
                    name: settings.typeNames[curType],
                    unFixed: 0,
                    month: 0,
                    total: 0,
                });
            }

            var tableData = fake_data["/undefined/warning/ajaxAlertList"]["result"]["warningList"];
            tableData.data = [];
            $scope.datas.result.tableData = tableData;
        });
    }

    $scope.updateItem = function () {

    }
});