app.controller('maintenance_duty',function ($scope) {

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

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            weekNumbers: true,
            weekNumbersWithinDays: true,
            weekNumberCalculation: 'ISO',
            editable: true,
            navLinks: true, // can click day/week names to navigate views
            defaultView:'month',
            contentHeight:540,
            selectable: true,
            selectHelper: true,//在agenda视图下选择时会带上对应的时间
            dragOpacity: 0.5, //Event被拖动时的不透明度
            events: {
                //加载数据
                url: '/Home/GetList',
                error: function () {
                    // pass
                }
            },
            select: function (start, end) {
                console.log('选择日期触发');
                $("#CalenderModalEdit").modal("show");
            },
            eventDrop: function (event, dayDelta, revertFunc) {
                console.log('eventDrop --- start ---');
                console.log('eventDrop被执行，Event的title属性值为：', event.title);
                if (dayDelta._days != 0) {
                    console.log('eventDrop被执行，Event的start和end时间改变了：', dayDelta._days + '天！');
                } else if (dayDelta._milliseconds != 0) {
                    console.log('eventDrop被执行，Event的start和end时间改变了：', dayDelta._milliseconds / 1000 + '秒！');
                } else {
                    console.log('eventDrop被执行，Event的start和end时间没有改变！');
                }
                //revertFunc();
                console.log('eventDrop --- end ---');
            },
            eventClick: function (event, element) {
                //点击事件触发
                console.log("点击事件触发");
                console.log(event);
            },
            eventDrop: function (event, dayDelta, revertFunc) {
                //移动事件时候触发
                console.log("移动事件时候触发");
                console.log(event);
            }
        });

        // 生成值班人员数据
        var tableData = {
            "title": ["id", "姓名", "联系方式", "负责区域", "职位", "备注"],
            "data": [
                [1, "张三", "15800000001", "1F,2F,3F", "值班长", ""],
                [2, "李四", "15800000002", "1F", "值班员", ""],
                [3, "王五", "15800000003", "2F", "值班员", ""],
                [4, "刘六", "15800000004", "3F", "值班员", ""],
            ],
        };
        $scope.$apply(function () {
            $scope.datas.tableData = tableData;
        });
    }

});