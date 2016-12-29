

myapp.controller('loginController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {

    $scope.goToSignUp = function () {
        $location.path('/dang-ky');
    };

    $scope.goToHome = function () {
        $location.path('/trang-chu');
    };

	$scope.loginWithFacebook = function() {
        FB.login(function(response) {
            verifyFacebookAccessToken(response.authResponse.accessToken);
           
        }, {
            scope: 'public_profile, email'
        });
    };


    verifyFacebookAccessToken = function (access_token) {
         $http({
                method: 'POST',
                url: '/api/authenticate/facebook',
                data : {
                    'access_token' : access_token
                }
            }).then(function successCallback(response) {
                if (response.status === 200) {
                    Data.token = response.data.token;
                    Data.username = response.data.username;
                    $location.path('/trang-chu');
                    $scope.$apply();
                }
            }, function errorCallback(response) {
                console.log('failed to verify facebook access token');
                console.log(response);

            });
    };

    $scope.username = '';
    $scope.password = '';

    $scope.login = function() {
        if ($scope.username === '' && $scope.password === '') {
            alert('Vui lập không để trống username và password');
            return;
        }

        $http({
                method: 'POST',
                url: '/api/authenticate',
                data : {
                    'username' : $scope.username,
                    'password' : $scope.password
                }
            }).then(function successCallback(response) {
                if (response.status === 200) {
                    Data.token = response.data.token;
                    Data.username = response.data.username;
                    $location.path('/trang-chu');
                }
            }, function errorCallback(response) {
                console.log('failed to sign in');
                console.log(response);

            });
    }

   
}]);