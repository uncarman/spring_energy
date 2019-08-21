app.controller('dashboard',function ($scope) {

    $scope.datas = {
        fmt: "YYYY-MM-DD",
        datePickerDom: "#reservation",
        fromDate: moment().add(-15, 'day').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        todayStr:moment().format("YYYY-MM-DD"),
        mapId: "map",

    }

    $scope.init_page = function () {
        // 初始化地图
        initMap();
        $scope.getDatas();
    };

    $scope.refresh_datas = function () {
        $scope.getDatas();
    }

    $scope.getDatas = function () {
        $scope.ajaxBuildingList()
            .then($scope.drawMap)
            .then($scope.buildingListTable)
            .catch($scope.ajaxCatch);
    };

    $scope.ajaxBuildingList = function () {
        var param = {
            _method: 'get',
            _url: "/ajaxBuildingList",
            _param: {}
        };
        return global.return_promise($scope, param);
    }
    $scope.drawMap = function (datas) {
        console.log(datas);
        $scope.$apply(function () {
            var data = datas.result.buildingList.data;
            var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(6, -20)});
            for (var i = 0; i < data.length; i++) {
                var marker = new AMap.Marker({
                    position: [data[i].longitude, data[i].latitude],
                    map: map,
                    bubble: false,
                    topWhenClick: true,
                    cursor: "point",
                    extData: data[i],  // 缓存电站信息到market点中
                    ind: i,
                    //title: data[i].name,
                    label: {content: data[i].name, offset: new AMap.Pixel(30, 5)},
                    zIndex: 100,
                });
                marker.on('click', markerClick);
            }

            // 设置最佳显示状态
            map.setFitView();

            function markerClick(e) {
                var d = e.target.getExtData();
                var $content = $("<div class='media'></div>")
                    .append($("<div class='media-left'></div>")
                        .append($("<img class='media-object' style='margin-bottom: 10px;' width='80'>").attr("src", d.photo))
                    ).append($("<div class='media-body' style='min-width:240px;'></div>")
                        .append($("<p></p>").html("<b>"+d.name+"</b><br>"+d.address+"<br><br>查看详情 &nbsp; <a href='monitor.php?id="+d.id+"'>监测分析</a> &nbsp; <a href='statistics.php?id="+d.id+"'>数据统计</a> &nbsp; <a href='settingsGroup.php?id="+d.id+"'>系统配置</a>"))
                    );
                infoWindow.setContent($content.get(0));
                infoWindow.open(map, e.target.getPosition());
            }
        });
        return datas;
    };

    // 初始化地图
    function initMap() {
        map = new AMap.Map($scope.datas.mapId,{
            resizeEnable: true,
            rotateEnable:true,
            pitchEnable:true,
            zoom: 6,
            pitch:45,
            rotation:0,
            viewMode:'3D',//开启3D视图,默认为关闭
            expandZoomRange:true,
            zooms:[6,24],
        });
        //map.setMapStyle('amap://styles/d3e48bfa418416a85b7eec13dbe3aeb0');
        // 右上控制插件
        map.plugin(["AMap.ControlBar"],function(){
            map.addControl(new AMap.ControlBar({
                showZoomBar:true,
                showControlButton:true,
                position:{
                    right:'30px',
                    top:'10px'
                }
            }));
        });
        var content = [
            '<div class="context-menu-content">',
            '<ul class="context_menu">',
            '<li onclick="showSearch();">搜索</li>',
            '<li onclick="refreshDatas();">重新加载</li>',
            '<li class="split_line" onclick="map.zoomOut();">放大一级</li>',
            '<li class="split_line" onclick="map.zoomIn();">缩小一级</li>',
            '<li class="split_line" onclick="map.setZoom(12); map.setCenter(new AMap.LngLat(mapPos.getLng(), mapPos.getLat()));">放到跟前</li>',
            '<li class="split_line" onclick="map.setZoom(6);">缩到全局</li>',
            '</ul>',
            '</div>'
        ];
        contextMenu = new AMap.ContextMenu({
            isCustom: true,
            content: content.join('')
        });
        map.on('rightclick', function(e) {
            window.contextMenu.open(map, e.lnglat);
            window.mapPos = e.lnglat;
        });
        map.on("click", function (e) {
            setPlantView();
        })
    }

    $scope.buildingListTable = function (data) {
        $scope.$apply(function () {
            $scope.datas.buildingList = data.result.buildingList;
        });
    };

    $scope.view_item = function (item) {
        global.set_storage_key('session', [
            {key: 'buildingId', val: item.id},
        ]);
        window.location.href = "#/monitor?id="+item.id;
    }


    $scope.init_page();
});