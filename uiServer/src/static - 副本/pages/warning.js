app.controller('warning',function ($scope) {

    $scope.$watch('$viewContentLoaded', function () {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    // 最后执行
    setTimeout(function () {
        $scope.getDatas();
    }, 0);

    $scope.datas = {
        user: global.read_storage("session", "user"),
        // 建筑id
        buildingId: global.read_storage("session", "building")["id"],

        fmt: "YYYY-MM",
        fromDate: moment().add(-1, 'year').format("YYYY-MM"),
        toDate: moment().format("YYYY-MM"),
        todayStr: moment().format("YYYY-MM-DD"),
        curFlowStatus: 0, // 默认未确定的

        result: {
            summaryDatas: {},
            tableData: {},
        },
    }

    $scope.getDatas = function () {
        $scope.getWarningSummary()
            .then($scope.warningSummary)
            .then($scope.getWarningList)
            .then($scope.buildItemWarningTable)
            .catch($scope.ajaxCatch);
//        $scope.$apply(function () {
//            var types = ["01", "02", "03", "05"];
//            for(i in types) {
//                var curType = types[i];
//                $scope.datas.result.summaryDatas.push({
//                    name: settings.typeNames[curType],
//                    unFixed: 0,
//                    month: 0,
//                    total: 0,
//                });
//            }
//
//            $scope.datas.result.tableData = {
//                "title": {
//                    "id":"序号",
//                    "baseType": "基础类型",
//                    "type": "报警类型",
//                    "recordedAt": "报警时间",
//                    "itemName": "设备名称",
//                    "planVal": "计划数据",
//                    "realVal": "实际数据",
//                    "unit": "单位",
//                    "note": "备注",
//                    "status": "是否处理",
//                },
//                "data": [
//                    /*{
//                        "id":"1",
//                        "baseType": "安全用电",
//                        "type": "电流超标",
//                        "recordedAt": "2019-05-01 14:20",
//                        "itemName": "2F 烹饪区、面点间、切配区",
//                        "planVal": "15",
//                        "realVal": "17.36",
//                        "unit": "A",
//                        "note": "因为暂时打开大功率设备,已处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"2",
//                        "baseType": "安全用电",
//                        "type": "温度超标",
//                        "recordedAt": "2019-06-12 10:30",
//                        "itemName": "-1F 指挥中心",
//                        "planVal": "50",
//                        "realVal": "65",
//                        "unit": "摄氏度",
//                        "note": "因为设备老化,已更换",
//                        "status": "是",
//                    },
//                    {
//                        "id":"3",
//                        "baseType": "安全用电",
//                        "type": "电压超标",
//                        "recordedAt": "2019-06-12 11:50",
//                        "itemName": "1#进线",
//                        "planVal": "380",
//                        "realVal": "550",
//                        "unit": "V",
//                        "note": "因为设备故障,已处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"4",
//                        "baseType": "安全用电",
//                        "type": "功率超标",
//                        "recordedAt": "2019-05-01 14:20",
//                        "itemName": "1#进线",
//                        "planVal": "457",
//                        "realVal": "487",
//                        "unit": "kw",
//                        "note": "因为全部设备都打开,已处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"5",
//                        "baseType": "水流平衡",
//                        "type": "流量偏低",
//                        "recordedAt": "2019-05-01 14:20",
//                        "itemName": "6下",
//                        "planVal": "1.25",
//                        "realVal": "0.78",
//                        "unit": "m3/s",
//                        "note": "因为管道堵塞,已处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"6",
//                        "baseType": "水流平衡",
//                        "type": "压力偏高",
//                        "recordedAt": "2019-05-01 14:20",
//                        "itemName": "6下",
//                        "planVal": "1.25",
//                        "realVal": "1.78",
//                        "unit": "千帕",
//                        "note": "因为管道堵塞,已处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"7",
//                        "baseType": "水流平衡",
//                        "type": "管道隐漏",
//                        "recordedAt": "2019-06-07 10:20",
//                        "itemName": "1总",
//                        "planVal": "1.05",
//                        "realVal": "1.15",
//                        "unit": "主管道,支路管道总流量比例",
//                        "note": "因为三楼支路管道老化,已处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"8",
//                        "baseType": "环境板块",
//                        "type": "二氧化碳超标",
//                        "recordedAt": "2019-06-07 10:20",
//                        "itemName": "3F会议室",
//                        "planVal": "800",
//                        "realVal": "1200",
//                        "unit": "PPM",
//                        "note": "因为使用会议室,人数较多,不用处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"9",
//                        "baseType": "环境板块",
//                        "type": "PM2.5超标",
//                        "recordedAt": "2019-06-07 10:20",
//                        "itemName": "3F会议室",
//                        "planVal": "250",
//                        "realVal": "330",
//                        "unit": "浓度",
//                        "note": "因为使用会议室,人数较多,不用处理",
//                        "status": "是",
//                    },
//                    {
//                        "id":"10",
//                        "baseType": "环境板块",
//                        "type": "温度超标",
//                        "recordedAt": "2019-06-07 10:20",
//                        "itemName": "3F会议室",
//                        "planVal": "30",
//                        "realVal": "32",
//                        "unit": "摄氏度",
//                        "note": "因为使用会议室,人数较多,不用处理",
//                        "status": "是",
//                    },*/
//                ],
//            };
//        });
    };

    $scope.getWarningSummary = function() {
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetItemWarningSummary,
            _param: {
                buildingId: $scope.datas.buildingId,
            }
        };
        return global.return_promise($scope, param);
    }
    $scope.warningSummary = function(res) {
        $scope.$apply(function(){
            $scope.datas.result.summaryDatas = res.data.map(function(d) {
                return {
                    name:d.name.replace("量", ""),
                    unFixed: d.unFixed,
                    monthTotal: d.monthTotal,
                    total: d.total,
                }
            });
        });
    }

    $scope.getWarningList = function() {
        var _param = {
            buildingId: $scope.datas.buildingId,
            hasFixed: 0,    // 未恢复
            flowStatus: $scope.datas.curFlowStatus,
        }
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxGetItemWarningList,
            _param: _param
        };
        return global.return_promise($scope, param);
    }

    $scope.buildItemWarningTable = function(res) {
        $scope.$apply(function(){
            var tableData = {
                "title": ["ID", "设备名称", "报警类型", "报警等级", "开始时间", "报警信息", "处理意见", "操作人", "处理结果", "最后更新"],
                "data": [],
            };
            var cacheData = {};
            res.data.map(function (cur) {
                tableData.data.push([cur.id, cur.itemName, cur.warningCategory, cur.severity, cur.reportedAt,
                                    cur.errMsg, cur.solutionRef, cur.operator, cur.note, cur.updatedAt]);
                cacheData[cur.id] = cur;
            });
            $scope.datas.result.tableData = tableData;
            $scope.datas.result.cacheData = cacheData;
        });
    }

    $scope.updateItem = function (ind, warning, status) {
        var note=prompt("请输入处理意见", "");
        var curItem = angular.copy($scope.datas.result.cacheData[warning[0]]);
        var param = {
            _method: 'post',
            _url: settings.ajax_func.ajaxUpdateItemWarning,
            _param: {
                id: curItem.id,
                operator: $scope.datas.user.name,
                flowStatus: status,
                note: note,
            }
        };
        global.return_promise($scope, param)
            .then(function(res) {
                MyAlert("操作成功");
                $scope.getDatas();
            })
            .catch($scope.ajaxCatch);;
    };

    $scope.changeFlowStatus = function(flowStatus) {
        $scope.datas.curFlowStatus = flowStatus;
        $scope.getWarningList()
            .then($scope.buildItemWarningTable)
            .catch($scope.ajaxCatch);
    }
});