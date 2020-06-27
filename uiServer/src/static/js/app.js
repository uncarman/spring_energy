define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    var settings = require('comm').settings;
    var global = require('comm').global;

    require('angular-ui-router');

    var app = angular.module('app', ['ui.router']);
    
    app.config(function($interpolateProvider) {
	    $interpolateProvider.startSymbol('{[{');
	    $interpolateProvider.endSymbol('}]}');
	}).filter('trustAsResourceUrl', ['$sce', function($sce) {
	    return function(val) {
	        return $sce.trustAsResourceUrl(val);
	    };
	}]).filter('rangeFormat', function($filter) {
	    return function(number) {
	        number = number || 0;
	        var unit='';
	        switch(true){
	            case number > 1000*1000*1000:
	                unit='G';
	                number=number/(1000*1000*1000);
	                break;
	            case number > 1000*1000:
	                unit='M';
	                number=number/(1000*1000);
	                break;
	            case number>1000:
	                unit='k';
	                number=number/1000;
	                break;
	            default:
	                unit='';
	                number=number;
	                break;
	        }
	        return $filter('number')(number, 2)+unit;
	    };
	}).directive('onFinishRenderFilters', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    }]).directive('onFinishRender', ['$timeout', function ($timeout) {
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
    }]).controller('index', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
        // 检查是否登录
        global.check_logined();

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

    asyncLoader.configure(app);

    module.exports = app;
});
