define(function (require) {

    var app = require('../js/app');

    app.controller('settings_base', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
        var settings = require('comm').settings;
        var global = require('comm').global;
        var feather = require('feather');
        var echarts = require('echarts');
        var moment = require('moment');

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

        $scope.ajaxGetBaseDatas = function() {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.ajaxGetBasicDatas,
                _param: {}
            };
            return global.return_promise($scope, param);
        }

        $scope.getDatas = function(){
            $scope.ajaxGetBaseDatas()
                .then($scope.buildBaseDatasTable)
                .catch($scope.ajaxCatch);
        };

        $scope.buildBaseDatasTable = function(res) {
            var tableData = {
                "title": ["id", "类型ID", "类型名称", "数据编码", "数据名称", "备注"],
                "data": [],
            };
            var cacheData = {};
            res.data.map(function (cur) {
                tableData.data.push([cur.id, cur.type, cur.name, cur.basic_code, cur.basic_name, cur.note]);
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
                    _url: settings.ajax_func.ajaxRemoveBasicData,
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
                _url: settings.ajax_func.ajaxUpdateBasicData,
                _param: {
                    id: curItem.id,
                    type: curItem.type,
                    name: curItem.name,
                    basicCode: curItem.basic_code,
                    basicName: curItem.basic_name,
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
                _url: settings.ajax_func.ajaxCreateBasicData,
                _param: {
                    type: curItem.type,
                    name: curItem.name,
                    basicCode: curItem.basic_code,
                    basicName: curItem.basic_name,
                    note: curItem.note,
                }
            };
            global.ajax_data($scope, param, function (res) {
                // 刷新页面
                $scope.getDatas();
                $(".itemEdit").modal("hide");
            });
        }

        $scope.getDatas();
    }]);

});