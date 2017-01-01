myapp.controller('homeController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {

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
    }
	
	
	//Chuyển giá tiền thành có '.'
    $scope.changePrice = function(price) {
        var x = price;
        var parts = x.toString().split(" ");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        price = parts.join(" ");
        return price
    }
	
	var loadDuLieu = function() {
		
		//Lấy 4 item mới nhất
		$http({
            method: 'GET',
            url: '/api/new_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Cannot get 4 new item');
            console.log(response);
        });		
		
		//Lấy 5 item đồ điện tử
		$http({
            method: 'GET',
            url: '/api/new_electronic_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_electronic_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });
		
		//Lấy 5 item giải trí, thể thao, sở thích
		$http({
            method: 'GET',
            url: '/api/new_entertainment_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_entertainment_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item xe cộ, máy móc
		$http({
            method: 'GET',
            url: '/api/new_vehicle_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_vehicle_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item mẹ và bé
		$http({
            method: 'GET',
            url: '/api/new_momandbaby_titems'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_momandbaby_titems = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item thời trang & phụ kiện
		$http({
            method: 'GET',
            url: '/api/new_fashion_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_fashion_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item đồ ăn, thức uống
		$http({
            method: 'GET',
            url: '/api/new_food_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_food_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item đồ gia dụng
		$http({
            method: 'GET',
            url: '/api/new_home_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_home_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item sức khỏe & sắc đẹp
		$http({
            method: 'GET',
            url: '/api/new_healthy_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_healthy_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item bất động sản
		$http({
            method: 'GET',
            url: '/api/new_realty_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_realty_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
		//Lấy 5 item các loại khác
		$http({
            method: 'GET',
            url: '/api/new_other_items'
        }).then(function successCallback(response) {
            if (response.status === 200) {	
                console.log(response.data);
				console.log('load du lieu thanh cong');
                $scope.new_other_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });	
		
	}
	
	loadDuLieu();
}]);
