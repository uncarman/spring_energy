app.controller('settings_group',function ($scope, $stateParams) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

        buildingId: global.read_storage("session", "building")["id"],

        type: $stateParams.type,

        levelLength: 2,  // group code level 长度

        itemList: [],   // 所有设备列表 
        tableData: {},  // 显示table的分类数据
        cacheData: {},  // 原始分类数据

        filterKey: "",

        // 当前编辑的item
        curMethod: "view",
        curItem: {},
        curItemCache: {},
    };

    $scope.getDatas = function(){
        $scope.ajaxGetItemGroups()
            .then($scope.buildItemGroupTable)
            .catch($scope.ajaxCatch);
    };
    
    $scope.ajaxGetItemGroups = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetItemGroups,
            _param: {
                buildingId: $scope.datas.buildingId
            }
        };
        return global.return_promise($scope, param);
    };

    $scope.buildItemGroupTable = function (res) {
        var tableData = {
            "title": ["id", "编号", "名称", "类型", "面积", "设备数量", "备注"],
            "data": [],
        };
        var cacheData = {};
        res.data.map(function (cur) {
            var displayName = cur.name;
            var level = cur.code.length / $scope.datas.levelLength;
            for(var i=1; i<level; i++) {
                displayName = (cur.code.substring($scope.datas.levelLength*i, (i+1)*$scope.datas.levelLength) != 0 ? "|------" : "" ) + displayName;
            }
            tableData.data.push([cur.id, cur.code, displayName, cur.type, cur.area, cur.itemNum, cur.note]);
            cacheData[cur.id] = cur;
        });
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
            $scope.datas.cacheData = cacheData;
        });
    }

    $scope.getItems = function() {
        // 缓存系统中所有设备类型
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetBuildingItems,
            _param: {
                buildingId: $scope.datas.buildingId
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                $scope.datas.itemList = res.data;
            });
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

    $scope.bindItem = function(ig) {
        $scope.datas.curItem = angular.copy($scope.datas.cacheData[ig[0]]);
        $scope.datas.curItemCache = angular.copy($scope.datas.cacheData[ig[0]]);
        $(".itemMapper").modal("show");
        $scope.getItemsByGroupId($scope.datas.cacheData[ig[0]]);
    }

    $scope.removeItem = function (ig, ind) {
        if(confirm("确定删除?")) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.ajaxRemoveItemGroup,
                _param: {
                    id: ig[0]
                }
            };
            global.ajax_data($scope, param, function (res) {
                $scope.$apply(function(){
                    $scope.datas.tableData.data.splice(ind, 1);
                });
            });
        };
    }

    $scope.updateItem = function () {
        var curItem = $scope.datas.curItem;
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxUpdateItemGroup,
            _param: {
                id: curItem.id,
                code: curItem.code,
                buildingId: $scope.datas.buildingId,
                type: curItem.type,
                name: curItem.name,
                parent: curItem.parent,
                area: curItem.area,
                note: curItem.note,
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
            _url: settings.ajax_func.ajaxCreateItemGroup,
            _param: {
                code: curItem.code,
                name: curItem.name,
                buildingId: $scope.datas.buildingId,
                type: curItem.type,
                parent: curItem.parent,
                area: curItem.area,
                note: curItem.note,
            }
        };
        global.ajax_data($scope, param, function (res) {
            // 刷新页面
            $scope.getDatas();
            $(".itemEdit").modal("hide");
        });
    }

    $scope.getItemsByGroupId = function(group) {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetItemsByGroupId,
            _param: {
                groupId: group.id
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.$apply(function(){
                var list = [];
                if(res.data) {
                    res.data.map(function(i){
                        list.push(i.id);
                    });
                }
                $scope.datas.itemList.map(function(i){
                    if(list.indexOf(i.id) >= 0) {
                        i.checked = true;
                    } else {
                        i.checked = false;
                    }
                });
            });
        });
    }

    $scope.updateGroupItem = function() {
        var list = [];
        $scope.datas.itemList.map(function(i){
            if(i.checked) {
                list.push(i.id);
            }
        });
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxUpdateGroupItem,
            _param: {
                groupId: $scope.datas.curItemCache.id,
                itemIds: list.join(",")
            }
        };
        global.ajax_data($scope, param, function (res) {
            $scope.getDatas();
            $(".itemMapper").modal("hide");
        });
    }

    // 初始化数据
    $scope.getDatas();
    $scope.getItems();

    console.log($scope.datas);

});