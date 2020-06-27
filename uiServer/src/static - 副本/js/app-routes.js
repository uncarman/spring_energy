define(function (require) {
    var app = require('./app');
    var version = (settings && settings.is_debug) ? new Date().getMinutes() : new Date().getDate();

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './modules/login/login.html?v='+version,
                controllerUrl: './modules/login/loginCtrl',
                controller: 'loginCtrl'
            })
            .state('index', {
                url: '/index',
                views: {
                    // 无名 view
                    '': {
                        templateUrl: './pages/index/index.html?v='+version,
                        controllerUrl: './pages/index/index',
                        controller: 'indexCtrl',
                    },
                    'nav@index': {
                        templateUrl: './pages/_components/nav/nav.html?v='+version,
                        controllerUrl: './pages/_components/nav/nav',
                        controller: 'navCtrl',
                    },
                }
            })
            .state('monitor', {
                url: '/monitor',
                views: {
                    // 无名 view
                    '': {
                        templateUrl: './pages/monitor/monitor.html?v='+version,
                        controllerUrl: './pages/monitor/monitor',
                        controller: 'monitorCtrl',
                    },
                    'nav@monitor': {
                        templateUrl: './pages/_components/nav/nav.html?v='+version,
                        controllerUrl: './pages/_components/nav/nav',
                        controller: 'navCtrl',
                    },
                }
            })
            .state('products', {
                url: '/products',
                templateUrl: './modules/products/products.html'+version,
                controllerUrl: './modules/products/productsCtrl',
                controller: 'productsCtrl',
                // load more controllers, services, filters, ...
                //dependencies: ['./services/usersService']
            });
    }]);

    app.directive('onFinishRenderFilters', function ($timeout) {
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
    });
});
