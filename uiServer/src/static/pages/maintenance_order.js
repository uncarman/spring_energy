define(function (require) {

    var app = require('../js/app');

    app.controller('maintenance_order', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
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
            $scope.datas.result.summaryDatas = {
                name: "",
                unFixed: 0,
                month: 0,
                total: 0,
            };

            $scope.datas.result.tableData = {
                "title": {
                    "id":"序号",
                    "deviceName": "设备名称",
                    "name": "报修人",
                    "position": "所在位置",
                    "note": "备注信息",
                    "recordedAt": "故障时间",
                    "fixedAt": "修复时间",
                    "status": "维修状态",
                },
                "data": [
                    {
                        "id":"1",
                        "deviceName": "2F 烹饪区、面点间、切配区",
                        "name": "张三",
                        "position": "2楼面点间",
                        "note": "线路老化, 电线外露",
                        "recordedAt": "2019-03-01 09:53:12",
                        "fixedAt": "2019-03-02 11:12:50",
                        "status": "已修复",
                    },
                    {
                        "id":"2",
                        "deviceName": "地下车库顶灯",
                        "name": "张三",
                        "position": "地下车库A区",
                        "note": "灯坏",
                        "recordedAt": "2019-03-05 09:53:12",
                        "fixedAt": "2019-03-05 11:12:50",
                        "status": "已修复",
                    },
                    {
                        "id":"3",
                        "deviceName": "5F新风+感应门",
                        "name": "张三",
                        "position": "5楼面大门",
                        "note": "门打不开",
                        "recordedAt": "2019-03-01 09:53:12",
                        "fixedAt": "2019-03-02 11:12:50",
                        "status": "已修复",
                    },
                    {
                        "id":"4",
                        "deviceName": "2F 烹饪区、面点间、切配区",
                        "name": "张三",
                        "position": "2楼面点间",
                        "note": "线路老化, 电线外露",
                        "recordedAt": "2019-03-01 09:53:12",
                        "fixedAt": "2019-03-02 11:12:50",
                        "status": "已修复",
                    },
                    {
                        "id":"5",
                        "deviceName": "2F 烹饪区、面点间、切配区",
                        "name": "张三",
                        "position": "2楼面点间",
                        "note": "线路老化, 电线外露",
                        "recordedAt": "2019-03-01 09:53:12",
                        "fixedAt": "2019-03-02 11:12:50",
                        "status": "已修复",
                    }
                ],
            };
        }

    }]);

});