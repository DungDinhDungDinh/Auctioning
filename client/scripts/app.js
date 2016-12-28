var myapp = angular.module('Auctioning', ['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/trang-chu', {
        templateUrl: './view/trang-chu.html',
        controller: 'homeController'
    }).
    when('/dang-ky', {
        templateUrl: './view/dang-ky.html',
        controller: 'signUpController'
    }).
    when('/dang-nhap', {
        templateUrl: './view/dang-nhap.html',
        controller: 'loginController'
    }).
	when('/san-pham-dau-gia', {
        templateUrl: './view/san-pham-dau-gia.html',
        controller: 'itemController'
    }).
	when('/user-thong-tin-chung', {
        templateUrl: './view/user-thong-tin-chung.html',
        controller: 'userCommonInfoController'
    }).
	when('/user-dang-ban', {
        templateUrl: './view/user-dang-ban.html',
        controller: 'userSellController'
    }).
	when('/user-dang-dau', {
        templateUrl: './view/user-dang-dau.html',
        controller: 'userAuctionController'
    }).
	when('/user-theo-doi', {
        templateUrl: './view/user-theo-doi.html',
        controller: 'userFollowController'
    }).
	when('/them-san-pham-step-1', {
        templateUrl: './view/them-san-pham-step-1.html',
        controller: 'addItem1Controller'
    }).
	when('/them-san-pham-step-2', {
        templateUrl: './view/them-san-pham-step-2.html',
        controller: 'addItem2Controller'
    }).
	when('/them-san-pham-step-3', {
        templateUrl: './view/them-san-pham-step-3.html',
        controller: 'addItem3Controller'
    }).
    otherwise({
        redirectTo: '/trang-chu'
    });
}]);

myapp.service('Data', function() {
    this.token = '';
    this.username = '';
});
