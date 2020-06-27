app.controller('house_hold',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],

        tableData: {},  // 显示table的分类数据
        cacheData: {},  // 原始分类数据

        // 当前编辑的item
        curMethod: "view",
        curItem: {},
        curItemCache: {},
    };

    $scope.ajaxGetHouseholdList = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetHouseholdList,
            _param: {
                buildingId: $scope.datas.buildingId
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.getDatas = function(){
        $scope.ajaxGetHouseholdList()
            .then($scope.buildHouseholdListTable)
            .catch($scope.ajaxCatch);
    };

    $scope.buildHouseholdListTable = function(res) {
        var tableData = {
            "title": ["ID", "照片", "商户名称", "商户别名", "备注", "电表编号", "创建时间", "更新时间"],
            "data": [],
        };
        var cacheData = {};
        res.data.map(function (cur) {
            tableData.data.push([cur.id, cur.photo, cur.name, cur.alias, cur.notes, cur.itemCode, cur.createdAt, cur.updatedAt]);
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

    $scope.viewItemData = function(ig) {
        $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.getItemData($scope.datas.curItem)
            .then(function(res){
                $scope.$apply(function(){
                    $scope.datas.curItemData = res.data;
                    $scope.datas.curItemData.otherData = JSON.parse(res.data.otherData);
                });
                $(".itemData").modal("show");
            }).catch(global.ajaxCatch);
    }

    $scope.getItemData = function(item){
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetItemCurrentData,
            _param: {
                id: item.itemIds
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.removeItem = function (ig, ind) {
        if(confirm("确定删除?")) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.ajaxRemoveHouseHold,
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
            _url: settings.ajax_func.ajaxUpdateHouseHold,
            _param: {
                id: curItem.id,
                buildingId: curItem.buildingId,
                name: curItem.name,
                alias: curItem.alias,
                itemIds: curItem.itemIds,
                photo: curItem.photo,
                notes: curItem.notes,
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
            _url: settings.ajax_func.ajaxCreateHouseHold,
            _param: {
                buildingId: curItem.buildingId,
                name: curItem.name,
                alias: curItem.alias,
                itemIds: curItem.itemIds,
                photo: curItem.photo,
                notes: curItem.notes,
            }
        };
        global.ajax_data($scope, param, function (res) {
            // 刷新页面
            $scope.getDatas();
            $(".itemEdit").modal("hide");
        });
    }

    $scope.cashFlow = function(ig, ind) {
        window.location.href = "#/cash_flow/"+$scope.datas.cacheData[ig[0]].itemIds;
    }

    $scope.getDatas();
});