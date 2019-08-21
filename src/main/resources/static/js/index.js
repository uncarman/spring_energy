var app = angular.module('app',['ui.router']);
app.controller('index',function ($scope) {

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
                group: "01000",
            }
        })
        .state('monitor_electricity_by_subentry/:groupCode',{
            url:'/monitor_electricity_by_subentry/:groupCode',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                group: "01000",
            }
        })

        .state('monitor_electricity_by_area',{
            url:'/monitor_electricity_by_area',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                group: "21000",
            }
        })
        .state('monitor_electricity_by_org',{
            url:'/monitor_electricity_by_org',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                group: "11000",
            }
        })
        .state('monitor_electricity_by_custom',{
            url:'/monitor_electricity_by_custom',
            templateUrl:'pages/monitor_electricity_by_group.html',
            controller: 'monitor_electricity_by_group',
            params: {
                type: "01",
                group: "31000",
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
    ;

    $urlRouterProvider.otherwise('/dashboard');
});