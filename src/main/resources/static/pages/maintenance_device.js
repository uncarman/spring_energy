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
            "title": ["id", "设备型号", "设备编码", "设备名称", "提供商", "所在位置", "数量", "投运时间", "正常"],
            "data": [],
        };
        var cacheData = {};

        // 假数据
        res.data = [
            {
                id: 1,
                code: "1000101",
                type: "冷冻水泵",
                name: "楼顶水泵001",
                brand: "科达瑞",
                pos: "楼顶",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_01.png"
            },
            {
                id: 2,
                code: "1000102",
                type: "冷冻水泵",
                name: "楼顶水泵002",
                brand: "科达瑞",
                pos: "楼顶",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_01.png"
            },
            {
                id: 3,
                code: "1000201",
                type: "空调机组",
                name: "楼顶空调001",
                brand: "海尔",
                pos: "楼顶",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_02.png"
            },
            {
                id: 4,
                code: "1000202",
                type: "空调机组",
                name: "楼顶空调002",
                brand: "海尔",
                pos: "楼顶",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_02.png"
            },
            {
                id: 5,
                code: "1000501",
                type: "打印机",
                name: "1F大厅打印机",
                brand: "Hp惠普",
                pos: "1楼",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_03.png"
            },
            {
                id: 6,
                code: "1000502",
                type: "打印机",
                name: "2F203打印机",
                brand: "Hp惠普",
                pos: "2楼",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_03.png"
            },
            {
                id: 7,
                code: "1000503",
                type: "打印机",
                name: "2F206打印机",
                brand: "Hp惠普",
                pos: "2楼",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_03.png"
            },
            {
                id: 8,
                code: "1000504",
                type: "打印机",
                name: "2F212打印机",
                brand: "Hp惠普",
                pos: "2楼",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_03.png"
            },
            {
                id: 9,
                code: "1000801",
                type: "UPS",
                name: "地下UPS001",
                brand: "华为",
                pos: "地下室仓库",
                num: "1",
                date: "2019-03-12",
                status: "是",
                img: "./images/device_02.png"
            },
        ];

        res.data.map(function (cur) {
			if($scope.datas.query != "") {
				if(cur.name.indexOf($scope.datas.query) >= 0) {
					tableData.data.push([cur.id, cur.type, cur.code, cur.name, cur.brand, cur.pos, cur.num, cur.date, cur.status]);
				}
			} else {
				tableData.data.push([cur.id, cur.type, cur.code, cur.name, cur.brand, cur.pos, cur.num, cur.date, cur.status]);
			}
            cacheData[cur.id] = cur;
        });
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
            $scope.datas.cacheData = cacheData;
        });
    }

	$scope.searchItem = function() {
		$scope.getDatas();
	};
	
    $scope.viewItem = function (ig) {
        $scope.datas.curMethod = "view";
        $scope.datas.curMethodReadOnly = true;
        $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
        $(".imgDisplay").modal("show");
    };

    $scope.editItem = $scope.viewItem;
});