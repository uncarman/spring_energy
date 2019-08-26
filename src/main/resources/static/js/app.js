var app = angular.module('app',['ui.router']);

// 页面渲染后执行
app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});


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
    };
    
    $scope.doLogout = function () {
        global.do_logout();
    }

    $scope.gotoHome = function () {
        window.location.href = "#"+settings.default_page;
    };

    $scope.gotoProfile = function () {
        window.location.href = "#profile";
    }

    $scope.gotoHelp = function () {
        window.location.href = "#help";
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
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "能耗分项",
            }
        })
        .state('monitor_electricity_by_subentry/:parent',{
            url:'/monitor_electricity_by_subentry/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "能耗分项",
            }
        })
        .state('monitor_electricity_by_area',{
            url:'/monitor_electricity_by_area',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "建筑区域",
            }
        })
        .state('monitor_electricity_by_area/:parent',{
            url:'/monitor_electricity_by_area/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "建筑区域",
            }
        })
        .state('monitor_electricity_by_org',{
            url:'/monitor_electricity_by_org',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "组织机构",
            }
        })
        .state('monitor_electricity_by_org/:parent',{
            url:'/monitor_electricity_by_org/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "组织机构",
            }
        })
        .state('monitor_electricity_by_custom',{
            url:'/monitor_electricity_by_custom',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "01",
                subType: "自定义",
            }
        })
        .state('monitor_electricity_by_custom/:parent',{
            url:'/monitor_electricity_by_custom/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
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
        .state('monitor_water_by_subentry',{
            url:'/monitor_water_by_subentry',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "02",
                subType: "能耗分项",
            }
        })
        .state('monitor_water_by_subentry/:parent',{
            url:'/monitor_water_by_subentry/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "02",
                subType: "能耗分项",
            }
        })
        .state('monitor_water_by_area',{
            url:'/monitor_water_by_area',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "02",
                subType: "建筑区域",
            }
        })
        .state('monitor_water_by_area/:parent',{
            url:'/monitor_water_by_area/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "02",
                subType: "建筑区域",
            }
        })
        .state('monitor_water_by_org',{
            url:'/monitor_water_by_org',
            templateUrl:'pages/monitor_water_by_group.html',
            controller: 'monitor_water_by_group',
            params: {
                type: "02",
                subType: "组织机构",
            }
        })
        .state('monitor_water_by_org/:parent',{
            url:'/monitor_water_by_org/:parent',
            templateUrl:'pages/monitor_water_by_group.html',
            controller: 'monitor_water_by_group',
            params: {
                type: "02",
                subType: "组织机构",
            }
        })
        .state('monitor_water_by_custom',{
            url:'/monitor_water_by_custom',
            templateUrl:'pages/monitor_water_by_group.html',
            controller: 'monitor_water_by_group',
            params: {
                type: "02",
                subType: "自定义",
            }
        })
        .state('monitor_water_by_custom/:parent',{
            url:'/monitor_water_by_custom/:parent',
            templateUrl:'pages/monitor_water_by_group.html',
            controller: 'monitor_water_by_group',
            params: {
                type: "02",
                subType: "自定义",
            }
        })

        // 燃气能
        .state('monitor_gas',{
            url:'/monitor_gas',
            templateUrl:'pages/monitor_energy.html',
            controller: 'monitor_energy',
            params: {
                type: "03"
            }
        })
        .state('monitor_gas_by_subentry',{
            url:'/monitor_gas_by_subentry',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "能耗分项",
            }
        })
        .state('monitor_gas_by_subentry/:parent',{
            url:'/monitor_gas_by_subentry/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "能耗分项",
            }
        })
        .state('monitor_gas_by_area',{
            url:'/monitor_gas_by_area',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "建筑区域",
            }
        })
        .state('monitor_gas_by_area/:parent',{
            url:'/monitor_gas_by_area/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "建筑区域",
            }
        })
        .state('monitor_gas_by_org',{
            url:'/monitor_gas_by_org',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "组织机构",
            }
        })
        .state('monitor_gas_by_org/:parent',{
            url:'/monitor_gas_by_org/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "组织机构",
            }
        })
        .state('monitor_gas_by_custom',{
            url:'/monitor_gas_by_custom',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "自定义",
            }
        })
        .state('monitor_gas_by_custom/:parent',{
            url:'/monitor_gas_by_custom/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "03",
                subType: "自定义",
            }
        })

        // 冷热量
        .state('monitor_cah',{
            url:'/monitor_cah',
            templateUrl:'pages/monitor_energy.html',
            controller: 'monitor_energy',
            params: {
                type: "04"
            }
        })
        .state('monitor_cah_by_subentry',{
            url:'/monitor_cah_by_subentry',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "能耗分项",
            }
        })
        .state('monitor_cah_by_subentry/:parent',{
            url:'/monitor_cah_by_subentry/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "能耗分项",
            }
        })
        .state('monitor_cah_by_area',{
            url:'/monitor_cah_by_area',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "建筑区域",
            }
        })
        .state('monitor_cah_by_area/:parent',{
            url:'/monitor_cah_by_area/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "建筑区域",
            }
        })
        .state('monitor_cah_by_org',{
            url:'/monitor_cah_by_org',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "组织机构",
            }
        })
        .state('monitor_cah_by_org/:parent',{
            url:'/monitor_cah_by_org/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "组织机构",
            }
        })
        .state('monitor_cah_by_custom',{
            url:'/monitor_cah_by_custom',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "自定义",
            }
        })
        .state('monitor_cah_by_custom/:parent',{
            url:'/monitor_cah_by_custom/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "04",
                subType: "自定义",
            }
        })

        // 蒸汽
        .state('monitor_steam',{
            url:'/monitor_steam',
            templateUrl:'pages/monitor_energy.html',
            controller: 'monitor_energy',
            params: {
                type: "05"
            }
        })
        .state('monitor_steam_by_subentry',{
            url:'/monitor_steam_by_subentry',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "能耗分项",
            }
        })
        .state('monitor_steam_by_subentry/:parent',{
            url:'/monitor_steam_by_subentry/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "能耗分项",
            }
        })
        .state('monitor_steam_by_area',{
            url:'/monitor_steam_by_area',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "建筑区域",
            }
        })
        .state('monitor_steam_by_area/:parent',{
            url:'/monitor_steam_by_area/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "建筑区域",
            }
        })
        .state('monitor_steam_by_org',{
            url:'/monitor_steam_by_org',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "组织机构",
            }
        })
        .state('monitor_steam_by_org/:parent',{
            url:'/monitor_steam_by_org/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "组织机构",
            }
        })
        .state('monitor_steam_by_custom',{
            url:'/monitor_steam_by_custom',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "自定义",
            }
        })
        .state('monitor_steam_by_custom/:parent',{
            url:'/monitor_steam_by_custom/:parent',
            templateUrl:'pages/monitor_energy_by_group.html',
            controller: 'monitor_energy_by_group',
            params: {
                type: "05",
                subType: "自定义",
            }
        })

        // 数据分析
        .state('statistics',{
            url:'/statistics',
            templateUrl:'pages/statistics.html',
            controller: 'statistics',
        })
        // 数据分析
        .state('statistics_fee',{
            url:'/statistics_fee',
            templateUrl:'pages/statistics_fee.html',
            controller: 'statistics_fee',
        })

        // 用能计划
        .state('plan_electricity',{
            url:'/plan_electricity',
            templateUrl:'pages/plan_energy.html',
            controller: 'plan_energy',
            params: {
                type: "01",
            }
        })
        .state('plan_water',{
            url:'/plan_water',
            templateUrl:'pages/plan_energy.html',
            controller: 'plan_energy',
            params: {
                type: "02",
            }
        })
        .state('plan_gas',{
            url:'/plan_gas',
            templateUrl:'pages/plan_energy.html',
            controller: 'plan_energy',
            params: {
                type: "03",
            }
        })
        .state('plan_cah',{
            url:'/plan_cah',
            templateUrl:'pages/plan_energy.html',
            controller: 'plan_energy',
            params: {
                type: "04",
            }
        })
        .state('plan_steam',{
            url:'/plan_steam',
            templateUrl:'pages/plan_energy.html',
            controller: 'plan_energy',
            params: {
                type: "05",
            }
        })

        // 节能管理
        .state('remould',{
            url:'/remould',
            templateUrl:'pages/remould.html',
            controller: 'remould',
        })


        // 报警管理
        .state('warning',{
            url:'/warning',
            templateUrl:'pages/warning.html',
            controller: 'warning',
        })
        .state('warning_settings',{
            url:'/warning_settings',
            templateUrl:'pages/warning_settings.html',
            controller: 'warning_settings',
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

        // 个人中心
        .state('profile',{
            url:'/profile',
            templateUrl:'pages/profile.html',
            controller: 'profile',
        })
        // 帮助中心
        .state('help',{
            url:'/help',
            templateUrl:'pages/help.html',
            controller: 'help',
        })
    ;

    $urlRouterProvider.otherwise('/dashboard');
});