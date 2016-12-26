myapp.controller('signUpController', ['$scope', '$http', 'Data', '$location', '$rootScope', function($scope, $http, Data, $location, $rootScope) {
    $scope.goToSignIn = function() {
        $location.path('/dang-nhap');
    };

    $scope.goToHome = function() {
        $location.path('/trang-chu');
    };

    $scope.username = '';
    $scope.password = '';
    $scope.retypePassword = '';


    $scope.signUp = function() {
    	if ($scope.username === '' || $scope.password === ''  || $scope.retypePassword === '') {
    		alert('Vui lòng nhập đủ các trường cần thiết');
    		return;
    	}

    	if ($scope.username.length < 4) {
    		alert('Username phải dài hơn 4 ký tự');
    		return;
    	}

    	if ($scope.password.length < 6) {
    		alert('Username phải dài hơn 6 ký tự');
    		return;
    	}

    	if ($scope.password !== $scope.retypePassword) {
    		alert('Vui lòng nhập lại đúng mật khẩu');
    		return;
    	}

    	signUp($scope.username, $scope.password);

    };

    signUp = function(username, password) {
    	$http({
                method: 'POST',
                url: '/api/users',
                data : {
                    'username' : username,
                    'password' : password
                }
            }).then(function successCallback(response) {
                if (response.status === 201) {
                   alert('Đăng ký thành công, bạn có thể đăng nhập bằng tài khoản mới tạo');
                   $location.path('/dang-nhap');
                }
            }, function errorCallback(response) {
                console.log('failed to sign up new account');
                console.log(response);
            });

    }
}]);