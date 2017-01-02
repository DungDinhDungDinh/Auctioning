

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
                    Data.username = response.data.name;
					Data.userID = response.data.userID;
                    localStorage.setItem("token", Data.token);
                    localStorage.setItem("userID", Data.userID);
                    localStorage.setItem("username", Data.username);
                    $location.path('/trang-chu');
                    console.log(response.data);
                }
            }, function errorCallback(response) {
                console.log('failed to verify facebook access token');
                console.log(response);

            });
    };

    $scope.username = '';
    $scope.password = '';

    $scope.login = function() {
        if ($scope.username === '') {
			$scope.errorText = " * Chưa nhập tên đăng nhập";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			//angular.element('#inputName').css({'border-color': 'red',});
			angular.element('#inputName').focus();
            return;
        }
		
		if ($scope.password === '') {
			$scope.errorText = " * Chưa nhập mật khẩu";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			//angular.element('#inputPassword').css({'border-color': 'red',});
			angular.element('#inputPassword').focus();
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
                    Data.userID = response.data.userID;
                    Data.username = response.data.name;
                    localStorage.setItem("token", Data.token);
                    localStorage.setItem("userID", Data.userID);
                    localStorage.setItem("username", Data.username);
                    console.log(response.data);
                    $location.path('/trang-chu');
                }
            }, function errorCallback(response) {
                console.log('failed to sign in');
				$scope.errorText = " * Tên đăng nhập hoặc mật khẩu không đúng";
				$scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
				angular.element('#inputName').focus();
                console.log(response);

            });
    }
}]);