define(function (require) {

    var app = require('../js/app');

    app.controller('login', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
        var settings = require('comm').settings;
        var global = require('comm').global;
        var feather = require('feather');
        var echarts = require('echarts');
        var moment = require('moment');

        $scope.datas = {
            username: "",
            password: "",
        }

        $scope.doLogin = function () {
            if($scope.datas.username == "") {
                alert("请填写用户名.");
                return false;
            }
            if($scope.datas.password == "") {
                alert("请填写密码.");
                return false;
            }
            var param = {
                _method: 'post',
                _url: settings.ajax_func.ajaxLogin,
                _param: {
                    userName: $scope.datas.username,
                    password: $scope.datas.password,
                }
            };
            global.ajax_data($scope, param, function (res) {
                var user = res.data;
                user.photo_url = user.photo_url ? user.photo_url : settings.default_photo;
                global.set_storage_key('session', [
                    {
                        key: 'user',
                        val: user,
                    }
                ]);
                window.location.href = "/";
            }, [], function (res) {
                if(res.message) {
                    alert(res.message);
                }
            });
        }
    }]);

});