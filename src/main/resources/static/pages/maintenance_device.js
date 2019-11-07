app.controller('maintenance_device',function ($scope) {

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
		
		query: "",
		
        result: {
            summaryDatas: {},
            chartDatas: {},
            tableData: {},
        },

        option: settings.defaultLineOpt,

    }

    $scope.ajaxGetItems = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetBuildingItems,
            _param: {
                buildingId: $scope.datas.buildingId
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.getDatas = function(){
        $scope.ajaxGetItems()
            .then($scope.buildItemTable)
            .catch($scope.ajaxCatch);
    };

    $scope.buildItemTable = function(res) {
        var tableData = {
            "title": ["id", "设备型号", "设备编码", "设备名称", "提供商", "投运时间"],
            "data": [],
        };
        var cacheData = {};
        res.data.map(function (cur) {
			if($scope.datas.query != "" && cur.name.indexOf($scope.datas.query) >= 0) {
				tableData.data.push([cur.id, "电表", cur.code, cur.name, "科达瑞", "2019-03-12"]);
			}
            cacheData[cur.id] = cur;
        });
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
            $scope.datas.cacheData = cacheData;
        });
    }

	$scope.getDatas = function() {
		$scope.getDatas();
	};
	
    $scope.viewItem = function (ig) {
        $scope.datas.curMethod = "view";
        $scope.datas.curMethodReadOnly = true;
        $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
        $(".itemEdit").modal("show");
    };

    $scope.editItem = $scope.viewItem;
});