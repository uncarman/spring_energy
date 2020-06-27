define(function (require) {
    var app = require('../../js/app');
    var feather = require('feather');

    app.controller('indexCtrl', ['$scope', function($scope) {
        // 检查是否登录
        global.check_logined();

        $scope.$watch('$viewContentLoaded', function() {
            feather.replace();
            global.on_loaded_func($scope);    // 显示页面内容
        });

        $scope.datas = {
            user: global.read_storage("session", "user"),
            //curBuilding: global.read_storage("session", "building"),
            //buildingList: global.read_storage("session", "buildingList"),
        };

        $scope.changeBuilding = function(building) {
            $scope.datas.curBuilding = building;
            global.set_storage_key('session', [
                {
                    key: 'building',
                    val: building,
                }
            ]);
        };

        $scope.doLogout = function () {
            global.do_logout();
            window.location.href = "/login.html";
        };

        $scope.ajaxBuildingList = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.ajaxGetUserBuildings,
                _param: {
                    userId: $scope.datas.user.id
                }
            };
            return global.return_promise($scope, param);
        }

        $scope.buildBuildingsTable = function (res) {
            var tableData = {
                "title": ["id", "图片", "建筑名称", "地址", "建筑面积", "建设年代"],
                "data": [],
            };
            var cacheData = {};
            res.data.map(function (cur) {
                cur.photo_url = cur.photo_url ? cur.photo_url : settings.default_photo;
                tableData.data.push([cur.id, cur.photo_url, cur.name, cur.address, cur.area, cur.build_year]);
                cacheData[cur.id] = cur;
            });
            $scope.$apply(function () {
                $scope.datas.tableData = tableData;
                $scope.datas.cacheData = cacheData;
            });

            // 缓存用户建筑列表
            global.set_storage_key('session', [
                {
                    key: 'buildingList',
                    val: $scope.datas.cacheData,
                }
            ]);
            // 如果有建筑列表, 默认第一个选中
            if(res.data.length > 0) {
                global.set_storage_key('session', [
                    {
                        key: 'building',
                        val: res.data[0],
                    }
                ]);
                $scope.$apply(function () {
                    $scope.datas.buildingList = $scope.datas.cacheData;
                    $scope.datas.curBuilding = res.data[0];
                    $scope.datas.buildingId = $scope.datas.curBuilding["id"];
                });
            }
        };

        $scope.getDatas = function () {
            $scope.ajaxBuildingList()
                .then($scope.buildBuildingsTable)
                // .then(function () {
                //     // 获取汇总数据
                //     $scope.getBuildingSummaryTotalData();

                //     // 图表数据
                //     $scope.getBuildingChartDataByType();
                //     // 获取分类标题
                //     $scope.getItemGroupByType(function () {
                //         $scope.getEnergyChartDataByType();
                //     });

                //     // 管网安全
                //     $scope.getPipSecurity();
                // })
                .catch($scope.ajaxCatch);

            // 获取天气
            // $scope.getLocalWeather();
            // $scope.getLocalAirPm();
        };

        // 执行函数
        $scope.getDatas();

    }]);
});
