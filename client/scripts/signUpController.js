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

	$scope.generateId = function() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
	
    $scope.signUp = function() {
    	if ($scope.username === '') {
    		$scope.errorText = " * Chưa nhập tên đăng nhập";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			angular.element('#inputID').focus();
    		return;
    	}
		
		if ($scope.username.length < 6) {
    		$scope.errorText = " * Tên đăng nhập phải dài tối thiểu 6 ký tự";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			angular.element('#inputID').focus();
    		return;
    	}
		
		if ($scope.password === '') {
    		$scope.errorText = " * Chưa nhập mật khẩu";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			angular.element('#inputPassword').focus();
    		return;
    	}
		
		
    	if ($scope.password.length < 6) {
    		$scope.errorText = " * Password phải dài tối thiểu 6 ký tự";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			angular.element('#inputPassword').focus();
    		return;
    	}
		
		if ($scope.retypePassword === '') {
    		$scope.errorText = " * Chưa nhập xác nhận mật khẩu";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			angular.element('#inputRePassword').focus();
    		return;
    	}

    	if ($scope.password !== $scope.retypePassword) {
    		$scope.errorText = " * Xác nhận Password chưa chính xác";
            $scope.errorStyle = {"color":"red", "font-size":"12px", "display":"block"};
			angular.element('#inputRePassword').focus();
    		return;
    	}
		
    	signUp($scope.username, $scope.password);

    };

    signUp = function(username, password) {
    	$http({
                method: 'POST',
                url: '/api/users',
                data : {
                    'ID' : $scope.generateId()
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