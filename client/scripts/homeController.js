

myapp.controller('homeController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {

	if (Data.token !== '') {
		$scope.show1 = false;
		$scope.username = Data.username;
		
		//Lưu vào Storage
		localStorage.setItem("token", Data.token);
		localStorage.setItem("userID", Data.userID);
		localStorage.setItem("username", Data.username);
	} else {
		//Kiểm tra đã có userID trong Storage chưa
		if(localStorage.getItem("userID") != null)
		{
			$scope.show1 = false;
			Data.token = localStorage.getItem("token");
			Data.userID = localStorage.getItem("userID");
			Data.username = localStorage.getItem("username");
			
			$scope.username = Data.username;
		}
		else
			$scope.show1 = true;
	}
	
	$scope.goToItemList = function () {
        $location.path('/danh-sach-san-pham');
    };
	
	$scope.goToLogin = function () {
        $location.path('/dang-nhap');
    };
}]);