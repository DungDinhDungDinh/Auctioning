myapp.controller('itemListController',  ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', '$route', function($scope, $http, Data, $location, $rootScope, $routeParams, $route) {
	
	$scope.chuyenMuc = $routeParams.chuyenMuc;
	if($scope.chuyenMuc === 'do-dien-tu'){
		$scope.chuyenMuc = "Đồ điện tử";
		$scope.apiString = 'all_electronic_items';
	}
	if($scope.chuyenMuc === 'giai-tri-the-thao-so-thich'){
		$scope.chuyenMuc = "Giải trí, thể thao, sở thích";
		$scope.apiString = 'all_entertainment_items';
	}
	if($scope.chuyenMuc === 'xe-co-may-moc'){
		$scope.chuyenMuc = "Xe cộ, máy móc";
		$scope.apiString = 'all_vehicle_items';
	}
	if($scope.chuyenMuc === 'me-va-be'){
		$scope.chuyenMuc = "Mẹ và bé";
		$scope.apiString = 'all_momandbaby_titems';
	}
	if($scope.chuyenMuc === 'thoi-trang-va-phu-kien'){
		$scope.chuyenMuc = "Thời trang & phụ kiện";
		$scope.apiString = 'all_fashion_items';
	}
	if($scope.chuyenMuc === 'do-an-thuc-uong'){
		$scope.chuyenMuc = "Đồ ăn, thức uống";
		$scope.apiString = 'all_food_items';
	}
	if($scope.chuyenMuc === 'do-gia-dung'){
		$scope.chuyenMuc = "Đồ gia dụng";
		$scope.apiString = 'all_home_items';
	}
	if($scope.chuyenMuc === 'suc-khoe-va-sac-dep'){
		$scope.chuyenMuc = "Sức khỏe & sắc đẹp";
		$scope.apiString = 'all_healthy_items';
	}
	if($scope.chuyenMuc === 'bat-dong-san'){
		$scope.chuyenMuc = "Bất động sản";
		$scope.apiString = 'all_realty_items';
	}
	if($scope.chuyenMuc === 'cac-loai-khac'){
		$scope.chuyenMuc = "Các loại khác";
		$scope.apiString = 'all_other_items';
	}
	
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
        $location.path('/danh-sach-san-pham/' + danh_muc);
    };

	$scope.goTo_Search_Result = function () {
		if(!$scope.searchString)
		{
			$scope.searchString = 'all';
		}
        $location.path('/ket-qua-tim-kiem/' + $scope.searchString);
    };

	$scope.goTo_Item_Info = function (item_ID) {
		Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia/' + Data.item_ID);
    };

	$scope.goTo_User_Info = function () {
		Data.ViewUserID = Data.userID;
        $location.path('/user-thong-tin-chung/' + Data.userID);
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
	
	//Chuyển giá tiền thành có '.'
	changeNumber = function(price) {
        var x = price;
        var parts = x.toString().split(" ");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        price = parts.join(" ");
        return price
    }
	
	$scope.changeInfo = function(item) {
		item.giaHienTai = changeNumber(item.giaHienTai);
		if(item.trangThai === true){
			item.status = 'Đang đấu giá';
		} else {
			item.status = 'Đã kết thúc';
		} 
	}
	
	// Lấy danh sách các sản phẩm của chuyên mục
	var loadDuLieu = function() {
		$http({
            method: 'GET',
            url: '/api/' + $scope.apiString ,
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load danh sach chuyen muc thanh cong');
                $scope.all_type_items = response.data;
            }
        }, function errorCallback(response) {
            console.log(response);
        });
	}
	
	loadDuLieu();
}]);