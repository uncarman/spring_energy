var app = angular.module('app',['ui.router']);
app.controller('index',function ($scope) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {
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
    }

});
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dashboard',{
            url:'/dashboard',
            templateUrl:'pages/dashboard.html',
            controller: 'dashboard',
        })
        .state('monitor',{
            url:'/monitor',
            templateUrl:'pages/monitor.html',
            controller: 'monitor',
        })

        // 电能
        .state('monitor_electricity',{
            url:'/monitor_electricity',
            templateUrl:'pages/monitor_energy.html',
            controller: 'monitor_energy',
            params: {
                type: "01"
            }
        })
        .state('monitor_electricity_by_subentry',{
            url:'/monitor_electricity_by_subentry',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "能耗分项",
            }
        })
        .state('monitor_electricity_by_subentry/:parent',{
            url:'/monitor_electricity_by_subentry/:parent',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "能耗分项",
            }
        })
        .state('monitor_electricity_by_area',{
            url:'/monitor_electricity_by_area',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "建筑区域",
            }
        })
        .state('monitor_electricity_by_area/:parent',{
            url:'/monitor_electricity_by_area/:parent',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "建筑区域",
            }
        })
        .state('monitor_electricity_by_org',{
            url:'/monitor_electricity_by_org',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "组织架构",
            }
        })
        .state('monitor_electricity_by_org/:parent',{
            url:'/monitor_electricity_by_org/:parent',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "组织架构",
            }
        })
        .state('monitor_electricity_by_custom',{
            url:'/monitor_electricity_by_custom',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "自定义",
            }
        })
        .state('monitor_electricity_by_custom/:parent',{
            url:'/monitor_electricity_by_custom/:parent',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                subType: "自定义",
            }
        })


        // 水能
        .state('monitor_water',{
            url:'/monitor_water',
            templateUrl:'pages/monitor_energy.html',
            controller: 'monitor_energy',
            params: {
                type: "02"
            }
        })


        // 分组编辑
        .state('settings_group',{
            url:'/settings_group',
            templateUrl:'pages/settings_group.html',
            controller: 'settings_group',
        })
        // 设备管理
        .state('settings_item',{
            url:'/settings_item',
            templateUrl:'pages/settings_item.html',
            controller: 'settings_item',
        })
        // 基本配置
        .state('settings_base',{
            url:'/settings_base',
            templateUrl:'pages/settings_base.html',
            controller: 'settings_base',
        })
    ;

    $urlRouterProvider.otherwise('/dashboard');
});