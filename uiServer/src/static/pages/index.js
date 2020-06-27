
define(function (require) {
    var app = require('../js/app');

    app.controller('index', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

        // 检查是否登录
        global.check_logined();

        $scope.$watch('$viewContentLoaded', function() {
            global.on_loaded_func($scope);    // 显示页面内容
        });

        $scope.datas = {
            appName: "智慧楼宇管理系",
            appVersion: "v1.0",
            user: global.read_storage("session", "user"),
            curBuilding: global.read_storage("session", "building"),
            buildingList: global.read_storage("session", "buildingList"),
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

        $scope.gotoHome = function () {
            window.location.href = "#/"+settings.default_page;
        };

        $scope.gotoProfile = function () {
            window.location.href = "#/profile";
        };

        $scope.gotoHelp = function () {
            window.location.href = "#/help";
        };

        $scope.gotoLive = function () {
            window.location.href = "/live";
        };

        $scope.$on("updateBuildings", function(event, data) {
            $scope.$apply(function () {
                $scope.datas.buildingList = data;
                $scope.datas.curBuilding = data[0];
            });
        });

    }]);

});