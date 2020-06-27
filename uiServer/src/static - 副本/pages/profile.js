app.controller('profile',function ($scope) {

    $scope.$watch('$viewContentLoaded', function() {
        global.on_loaded_func($scope);    // 显示页面内容
    });

    $scope.datas = {

    }

});