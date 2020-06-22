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
            buttonText: {
                today: '今天',
                month: '月视图',
                week: '周视图',
                day: '日视图',
                prev: '上一月',
                next: '下一月',
            },
            //today: ["今天"],
            //allDayText: "全天",
            // titleFormat: {
            //     month: 'yyyy年 MMMM月',
            //     week: "[yyyy年] MMMM月d日 { '&#8212;' [yyyy年] MMMM月d日}",
            //     day: 'yyyy年 MMMM月d日 dddd'
            // },
            monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], //月份缩略命名（英语比较实用：全称January可设置缩略为Jan）
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],       //同理monthNames
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],  //同理monthNamesShort
            weekNumberTitle : "周",         //周的国际化,默认为"W"
            eventLimitText  : "更多",       //当一块区域内容太多以"+2 more"格式显示时，这个more的名称自定义（应该与eventLimit: true一并用）
            dayPopoverFormat : "YYYY年M月d日", //点开"+2 more"弹出的小窗口标题，与eventLimitClick可以结合用
            header: {
                left: 'prev,next today',
                center: '值班管理',
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
            events: [
                {
                    title: '张三',
                    start: '2019-09-06',
                    //color:'green',
                },
                {
                    title: '张三',
                    start: '2019-09-07',
                    //color:'green',
                },
                {
                    title: '张三',
                    start: '2019-09-08',
                    //color:'green',
                }
            ],
            events_bak: {
                //加载数据
                // url: '/Home/GetList',
                // error: function () {
                //     //
                // }
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
                $("#CalenderModalEdit").modal("show");
            },
            eventDrop: function (event, dayDelta, revertFunc) {
                //移动事件时候触发
                console.log("移动事件时候触发");
                console.log(event);
                $("#CalenderModalEdit").modal("show");
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