app.controller('cash_flow',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],
        itemId: $stateParams.itemId,

        tableData: {},  // 显示table的分类数据
        cacheData: {},  // 原始分类数据

        // 当前编辑的item
        curMethod: "view",
        curItem: {},
        curItemCache: {},
    };

    $scope.ajaxGetHouseholdByItemId = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetHouseholdByItemId,
            _param: {
                itemId: $stateParams.itemId
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.ajaxGetItemById = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetItemById,
            _param: {
                id: $stateParams.itemId
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.ajaxGetCashflow = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetCashflow,
            _param: {
                itemId: $stateParams.itemId
            }
        };
        return global.return_promise($scope, param);
    }

    $scope.getDatas = function(){
        $scope.ajaxGetCashflow()
            .then($scope.buildCashflowTable)
            .catch($scope.ajaxCatch);
        $scope.ajaxGetHouseholdByItemId()
            .then(function (data) {
                $scope.$apply(function () {
                    $scope.datas.household = data.data;
                })
            })
            .catch($scope.ajaxCatch);
        $scope.ajaxGetItemById()
            .then(function (data) {
                $scope.$apply(function () {
                    $scope.datas.item = data.data;
                })
            })
            .catch($scope.ajaxCatch);
    };

    $scope.buildCashflowTable = function(res) {
        var tableData = {
            "title": ["id", "设备编号", "设备名称", "操作类型", "操作来源", "订单号", "备注", "创建时间"],
            "data": [],
        };
        var cacheData = {};
        res.data.map(function (cur) {
            tableData.data.push([cur.id, cur.operatorId, cur.itemId, cur.fee, cur.event, cur.source, cur.orderId, cur.notes, cur.createdAt]);
            cacheData[cur.id] = cur;
        });
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
            $scope.datas.cacheData = cacheData;
        });
    }

    $scope.feeClass = function(item) {
        // ind=3 代表 fee
        if(item[3] >= 0) {
            return "success";
        } else {
            return "warning";
        }
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
        $scope.datas.curItem = { itemId: $scope.datas.itemId };
        $scope.datas.curItemCache = { itemId: $scope.datas.itemId };
        $(".itemEdit").modal("show");
    }

//    $scope.removeItem = function (ig, ind) {
//        if(confirm("确定删除?")) {
//            var param = {
//                _method: 'post',
//                _url: settings.ajax_func.ajaxRemoveBasicData,
//                _param: {
//                    id: ig[0]
//                }
//            };
//            global.ajax_data($scope, param, function (res) {
//                $scope.getDatas();
//            });
//        };
//    }
//
//    $scope.updateItem = function () {
//        var curItem = $scope.datas.curItem;
//        var param = {
//            _method: 'post',
//            _url: settings.ajax_func.ajaxUpdateBasicData,
//            _param: {
//                id: curItem.id,
//                type: curItem.type,
//                name: curItem.name,
//                basicCode: curItem.basic_code,
//                basicName: curItem.basic_name,
//                note: curItem.note,
//            }
//        };
//        global.ajax_data($scope, param, function (res) {
//            // 刷新页面
//            $scope.getDatas();
//            $(".itemEdit").modal("hide");
//        });
//    }

    $scope.saveItem = function() {
        $scope.readFee()
            .then($scope.updateFee)
            .then($scope.saveItemToServer)
            .catch(global.ajaxCatch);
    }

    // TODO 读表当前数据
    $scope.readFee = function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function(){
               resolve(100);
            }, 200);
        });
    }
    // TODO 更新表数据
    $scope.updateFee = function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function(){
               resolve("SUCCESS");
            }, 200);
        });
    }
    $scope.saveItemToServer = function() {
        var curItem = $scope.datas.curItem;
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxCreateCashflow,
            _param: {
                operatorId: global.read_storage('session', "user").id,
                itemId: curItem.itemId,
                fee: $("#event").val() == "recharge" ? Math.abs(curItem.fee) : -Math.abs(curItem.fee),
                event: $("#event").val(),
                source: "plantform",
                notes: curItem.notes,
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