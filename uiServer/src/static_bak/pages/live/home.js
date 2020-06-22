app.controller('home',function ($scope) {

    // 检查是否登录
    global.check_logined();

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });


    refreshInterval = 5*60*1000; // N 分钟刷新所有电站数据
    var mapId = "map";

    var videos = [
        "http://192.168.151.163:9435/FmVideo.html?channel=4&ip=192.168.1.28",
        "http://192.168.151.163:9435/FmVideo.html?channel=5&ip=192.168.1.29",
        "http://192.168.151.163:9435/FmVideo.html?channel=0&ip=192.168.1.140",
        "http://192.168.151.163:9435/FmVideo.html?channel=1&ip=192.168.1.141",
        "http://192.168.151.163:9435/FmVideo.html?channel=2&ip=192.168.1.142",
        "http://192.168.151.163:9435/FmVideo.html?channel=3&ip=192.168.1.143",
        "http://192.168.151.163:9435/FmVideo.html?channel=6&ip=192.168.1.7",
        "http://192.168.151.163:9435/FmVideo.html?channel=7&ip=192.168.1.8",
        "http://192.168.151.163:9435/FmVideo.html?channel=8&ip=192.168.1.9",
        "http://192.168.151.163:9435/FmVideo.html?channel=10&ip=192.168.1.11",
        "http://192.168.151.163:9435/FmVideo.html?channel=20&ip=192.168.1.19",
        "http://192.168.151.163:9435/FmVideo.html?channel=11&ip=192.168.1.18",
    ];

    $scope.data = {
        // 空气质量
        "cityId": "1233",  // 嘉兴市
        "AppCode": "1b676b19152f4f41b16a961742c49ac0",  // aliyun墨迹

        headCenter: "智慧楼宇数据管控平台",
        headLeft: "安全·舒适·节能",
        headRight: moment().format("YYYY-MM-DD dddd"),

        safeDays: 123, // 安全运行天数

        buildingSortName: ["海盐", "融通", "明州", "嘉善", "滨海", "嘉兴"],

        videoInd : 0,
        videos: videos.slice(0, 4),

        totalPerson: 100,
        totalArea: 1000,

        totalElec: 0, // 左上
        totalElecAvgArea: 0,
        totalElecAvgPerson: 0,
        totalWater: 0,
        totalWaterAvgArea: 0,
        totalWaterAvgPerson: 0,

        totalElecDay: 0, // 中间大字
        totalElecMonth: 0,

        visitorByDay: 12,  // 右上 日访客
        visitorByMonth: 12*30,  // 月访客

        // 人均用电排名
        elecAvgPerson: [
            {
                name: '楼1',
                percent: "55%",
                val: 302
            },
            {
                name: '楼2',
                percent: "75%",
                val: 302
            },
            {
                name: '楼3',
                percent: "65%",
                val: 302
            },
            {
                name: '楼4',
                percent: "85%",
                val: 302
            },
            {
                name: '楼5',
                percent: "100%",
                val: 510
            },
        ],
        waterAvgPerson: [
            {
                name: '楼1',
                percent: "55%",
                val: 302
            },
            {
                name: '楼2',
                percent: "75%",
                val: 302
            },
            {
                name: '楼3',
                percent: "65%",
                val: 302
            },
            {
                name: '楼4',
                percent: "85%",
                val: 302
            },
            {
                name: '楼5',
                percent: "100%",
                val: 510
            },
        ],
        // 每平米用电排名
        elecAvgArea: [
            {
                name: '楼1',
                percent: "55%",
                val: 302
            },
            {
                name: '楼2',
                percent: "75%",
                val: 302
            },
            {
                name: '楼3',
                percent: "65%",
                val: 302
            },
            {
                name: '楼4',
                percent: "85%",
                val: 302
            },
            {
                name: '楼5',
                percent: "100%",
                val: 510
            },
        ],
        waterAvgArea: [
            {
                name: '楼1',
                percent: "55%",
                val: 302
            },
            {
                name: '楼2',
                percent: "75%",
                val: 302
            },
            {
                name: '楼3',
                percent: "65%",
                val: 302
            },
            {
                name: '楼4',
                percent: "85%",
                val: 302
            },
            {
                name: '楼5',
                percent: "100%",
                val: 510
            },
        ],

        // 中间
        smokeDetector: {
            online: 120,
            closed: 12,
            error: 0,
        },
        light: {
            online: 120,
            closed: 12,
            error: 0,
        },
        camera: {
            online: 10,
            closed: 2,
            error: 0,
        },
        elevator: {
            online: 3,
            closed: 0,
            error: 0,
        },

        // 右下
        warnings: [
            {
                type: "烟感探头",
                name: "YG-001",
                time: "2020-01-01 12:12:12",
                warning: "设备掉线"
            },
            {
                type: "烟感探头",
                name: "YG-001",
                time: "2020-01-01 12:12:12",
                warning: "设备掉线"
            },
            {
                type: "烟感探头",
                name: "YG-001",
                time: "2020-01-01 12:12:12",
                warning: "设备掉线"
            },
            {
                type: "烟感探头",
                name: "YG-001",
                time: "2020-01-01 12:12:12",
                warning: "设备掉线"
            },
            {
                type: "烟感探头",
                name: "YG-001",
                time: "2020-01-01 12:12:12",
                warning: "设备掉线"
            },
            {
                type: "烟感探头",
                name: "YG-001",
                time: "2020-01-01 12:12:12",
                warning: "设备掉线"
            }
        ],
    };

    var LineOption = {
        dataZoom: {
            type: 'inside'
        },
        grid: {
            top: 10,
            left: 5,
            right: 5,
            bottom: 5,
        },
        tooltip: {
            trigger: 'axis',
            position: function (pos, params, dom, rect, size) {
                var obj = {top: 60};
                return obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            },
            formatter:function(params){
                var view = "";
                var colum=Math.ceil(params.length/14);
                var view = "时间 ："+params[0].axisValueLabel;
                var value='',raws;
                for (var i in params) {
                    if(i%colum){
                        view +='   ';
                    }else{
                        view += '<br/>';
                    }
                    view += params[i].marker;
                    view += params[i].seriesName;
                    value=": "+params[i].value[1];
                    view += value;


                }
                return view;
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel: null,
            axisLine: {
                lineStyle: {
                    color: "rgba(238,155,0,1)"
                }
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: null,
            axisLine: {
                lineStyle: {
                    color: "rgba(238,155,0,1)"
                }
            },
        },
        series: [
            {
                name:'日功率',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                // itemStyle: {
                //     color: 'rgba(238,155,0,1)'
                // },
                itemStyle: null,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(238,155,0,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(203,39,0,1)'
                    }])
                },
                data: [],
            }
        ],
    };
    var labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 10,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: function(params){
            str =  params.data.value
            return str
        },
        fontSize: 14,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    };
    var BarOption = {
        dataZoom: {
            type: 'inside'
        },
        color: ['#2E92FF'],
        grid: {
            top: 5,
            left: 15,
            right: 15,
            bottom: 10,
        },
        tooltip: {
            trigger: 'axis',
            position: function (pos, params, dom, rect, size) {
                var obj = {top: 60};
                return obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel: null,
            axisLine: {
                lineStyle: {
                    color: "rgba(60, 231, 218, 1)"
                }
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: null,
            axisLine: {
                lineStyle: {
                    color: "rgba(60, 231, 218, 1)"
                }
            },
        },
        series: [
            {
                name:'日发电',
                type:'bar',
                barWidth: "40%",
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(60, 231, 218, 1)'},
                            {offset: 1, color: 'rgba(60, 231, 218, 1)'}
                        ]
                    )
                },
                label: labelOption,
                data: [],
            },
            {
                name:'日用水',
                type:'bar',
                barWidth: "40%",
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(60, 231, 218, 0.5)'},
                            {offset: 1, color: 'rgba(60, 231, 218, 0.5)'}
                        ]
                    )
                },
                label: labelOption,
                data: [],
            }
        ],
    };

    $scope.$on("updateBuildings", function(event, data) {
        $scope.$apply(function () {
            $scope.datas.buildingList = data;
            $scope.datas.curBuilding = data[0];
        });
    });

});