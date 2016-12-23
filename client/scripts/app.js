var myapp = angular.module('Auctioning', ['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/trang-chu', {
        templateUrl: './view/trang-chu.html',
        controller: 'trangChuController'
    }).
    when('/dang-ky', {
        templateUrl: './view/dang-ky.html',
        controller: 'dangKyController'
    }).
    when('/dang-nhap', {
        templateUrl: './view/dang-nhap.html',
        controller: 'dangNhapController'
    }).
	when('/san-pham-dau-gia', {
        templateUrl: './view/san-pham-dau-gia.html',
        controller: 'itemController'
    }).
	when('/user-thong-tin-chung', {
        templateUrl: './view/user-thong-tin-chung.html',
        controller: 'userCommonInfoController'
    }).
    otherwise({
        redirectTo: '/trang-chu'
    });
}]);

myapp.service('Data', function() {

});
