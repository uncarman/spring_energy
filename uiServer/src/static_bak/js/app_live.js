moment.locale("zh_cn");

var app = angular.module('app',['ui.router']);

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

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

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'pages/live/home.html',
            controller: 'home',
        })
        .state('monitor',{
            url:'/monitor',
            templateUrl:'pages/live/monitor.html',
            controller: 'monitor',
        })
    ;

    $urlRouterProvider.otherwise('/home');
});