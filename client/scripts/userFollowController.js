

myapp.controller('userFollowController',  ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', function ($scope, $http, Data, $location, $rootScope, $routeParams) {
	
	$scope.number = [1,2,4,6];
	$scope.price =  "1000000";
	$scope.highest_price =  "100000000";
	$scope.viewID = $routeParams.viewID;
	
	$(window).scrollTop(0, 0);
	if (Data.token !== '') {
		$scope.show1 = false;
		$scope.username = Data.username;

		//Lưu vào Storage
		localStorage.setItem("token", Data.token);
		localStorage.setItem("userID", Data.userID);
		localStorage.setItem("username", Data.username);
	} else {

		//Kiểm tra đã có userID trong Storage chưa
		if(localStorage.getItem("userID") !== null)
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

	// -------------- Link --------------

	$scope.goTo_SignUp = function () {
        $location.path('/dang-ky');
	};

	$scope.goTo_Login = function () {
        $location.path('/dang-nhap');
    };

	$scope.goTo_Logout = function () {
		localStorage.clear();
		Data.token = '';
		Data.userID = '';
		Data.username = '';
        $location.path('/');
    };

	$scope.goTo_Home = function () {
		$location.path('/');
    };

	$scope.goTo_Item_List = function (danh_muc) {
		Data.danh_muc = danh_muc;
        $location.path('/danh-sach-san-pham');
    };

	$scope.goTo_Search_Result = function () {
		Data.danh_muc = $scope.searchString;
        $location.path('/danh-sach-san-pham');
    };

	$scope.goTo_Item_Info = function (item_ID) {
		Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia/' + Data.item_ID);
    };

	$scope.goTo_User_Info = function () {
		Data.ViewUserID = Data.userID;
        $location.path('/user-thong-tin-chung/' + $scope.viewID);
    };

	$scope.goTo_User_Sell = function () {
        $location.path('/user-dang-ban/' + $scope.viewID);
    };

	$scope.goTo_User_Buy = function () {
        $location.path('/user-dang-dau/' + $scope.viewID);
    };

	$scope.goTo_User_Follow = function () {
        $location.path('/user-theo-doi/' + $scope.viewID);
    };

	$scope.goTo_Add_Item = function () {
        $location.path('/them-san-pham-step-1');
    };

	// -------------- Kết thúc link --------------
	
	
	var getUserFollowItems = function (){
		$http({
            method: 'GET',
            url: '/api/users/' + $scope.viewID,
            data: {
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response.data);
                var info = response.data[0];
                $scope.picture = info.avatar;
				
                $scope.staticName = info.ten;
                $scope.staticEmail = info.email;
                $scope.staticBirthday = info.ngaySinh;
                $scope.staticGender = info.gioiTinh;
				if($scope.staticEmail){ $scope.showEmail = true;}
				if($scope.staticBirthday){ $scope.showBirthday= true;}
				if($scope.staticGender){ $scope.showGender = true;}
				
            }
        }, function errorCallback(response) {
            console.log('failed to get user info');
            console.log(response);

        });
		
    	$http({
            method: 'GET',
            url: '/api/getItems/' + $scope.viewID
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response.data);
                $scope.user_items = response.data;
			
            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);

        });
    };
	
    getUserFollowItems();
	
}]);