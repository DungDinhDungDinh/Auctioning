myapp.controller('dangNhapController', ['$scope', '$http', 'Data', '$location', '$rootScope', function($scope, $http, Data, $location, $rootScope) {

    $scope.loginWithFacebook = function() {
        FB.login(function(response) {
            FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                Data.name = response.name;
                $location.path('/trang-chu');
            });
        }, {
            scope: 'public_profile,email'
        });
    };

}]);