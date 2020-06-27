define(function (require) {

    var app = require('../js/app');

    app.controller('statistics_analysis', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
        var settings = require('comm').settings;
        var global = require('comm').global;
        var feather = require('feather');
        var echarts = require('echarts');
        var moment = require('moment');

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);    // 显示页面内容
        });

        // 最后执行
        setTimeout(function () {
            $scope.getDatas();
        }, 0);

        $scope.datas = {
            // 建筑id
            buildingId: global.read_storage("session", "building")["id"],
            fmt: "YYYY-MM",
            datePickerDom: "#reservation",
            fromDate: moment().add(-1, 'year').format("YYYY-MM"),
            toDate: moment().format("YYYY-MM"),
            todayStr: moment().format("YYYY-MM-DD"),
            type: "month", // 默认按月显示

            result: {
                summaryDatas: {},
                chartDatas: {},
                tableData: {},
            },

            option: settings.defaultLineOpt,

        }

        $scope.getDatas = function () {
            //
        }

    }]);

});