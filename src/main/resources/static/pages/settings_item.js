app.controller('settings_item',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],

        type: $stateParams.type,

        tableData: {},  // 显示table的分类数据
        cacheData: {},  // 原始分类数据

        // 当前编辑的item
        curMethod: "view",
        curItem: {},
        curItemCache: {},
    };

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
            "title": ["id", "采集器ID", "类型ID", "编码", "设备名称", "描述", "数据类型", "数据单位", "变比系数", "最大数值"],
            "data": [],
        };
        var cacheData = {};
        res.data.map(function (cur) {
            tableData.data.push([cur.id, cur.collectorId, cur.itemType, cur.code, cur.name, cur.description, cur.dataType, cur.dataUnit, cur.coefficient, cur.maxValue]);
            cacheData[cur.id] = cur;
        });
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
            $scope.datas.cacheData = cacheData;
        });
    }

    $scope.viewItem = function (ig) {
        $scope.datas.curMethod = "view";
        $scope.datas.curMethodReadOnly = true;
        $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
        $(".itemEdit").modal("show");
    };

    $scope.editItem = function (ig) {
        $scope.datas.curMethod = "edit";
        $scope.datas.curMethodReadOnly = false;
        $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
        $(".itemEdit").modal("show");
    };

    $scope.createItem = function() {
        $scope.datas.curMethod = "create";
        $scope.datas.curMethodReadOnly = false;
        $scope.datas.curItem = {};
        $scope.datas.curItemCache = {};
        $(".itemEdit").modal("show");
    }

    $scope.removeItem = function (ig, ind) {
        if(confirm("确定删除?")) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.ajaxRemoveItem,
                _param: {
                    id: ig[0]
                }
            };
            global.ajax_data($scope, param, function (res) {
                $scope.getDatas();
            });
        };
    }

    $scope.updateItem = function () {
        var curItem = $scope.datas.curItem;
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxUpdateItem,
            _param: {
                id: curItem.id,
                collectorId: curItem.collector_id,
                itemType: curItem.item_type,
                code: curItem.code,
                name: curItem.name,
                description: curItem.description,
                dataType: curItem.data_type,
                dataUnit: curItem.data_unit,
                coefficient: curItem.coefficient,
                maxValue: curItem.max_value,
            }
        };
        global.ajax_data($scope, param, function (res) {
            // 刷新页面
            $scope.getDatas();
            $(".itemEdit").modal("hide");
        });
    }

    $scope.saveItem = function() {
        var curItem = $scope.datas.curItem;
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxCreateItem,
            _param: {
                collectorId: curItem.collector_id,
                itemType: curItem.item_type,
                code: curItem.code,
                name: curItem.name,
                description: curItem.description,
                dataType: curItem.data_type,
                dataUnit: curItem.data_unit,
                coefficient: curItem.coefficient,
                maxValue: curItem.max_value,
            }
        };
        global.ajax_data($scope, param, function (res) {
            // 刷新页面
            $scope.getDatas();
            $(".itemEdit").modal("hide");
        });
    }

    $scope.getDatas();
});