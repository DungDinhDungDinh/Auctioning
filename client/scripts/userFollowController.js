

myapp.controller('userFollowController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	
	$scope.number = [1,2,4,6];
	$scope.price =  "1000000";
	$scope.highest_price =  "100000000";
	
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
		console.log(danh_muc);
		Data.danh_muc = danh_muc;
        $location.path('/danh-sach-san-pham');
    };

	$scope.goTo_Search_Result = function () {
		Data.danh_muc = $scope.searchString;
		console.log(Data.danh_muc);
        $location.path('/danh-sach-san-pham');
    };

	$scope.goTo_Item_Info = function (item_ID) {
		Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia');
    };

	$scope.goTo_User_Info = function () {
		Data.ViewUserID = Data.userID;
		console.log(Data.ViewUserID);
        $location.path('/user-thong-tin-chung');
    };

	$scope.goTo_User_Sell = function () {
        $location.path('/user-dang-ban');
    };

	$scope.goTo_User_Buy = function () {
        $location.path('/user-dang-dau');
    };

	$scope.goTo_User_Follow = function () {
        $location.path('/user-theo-doi');
    };

	$scope.goTo_Add_Item = function () {
        $location.path('/them-san-pham-step-1');
    };

	// -------------- Kết thúc link --------------
}]);