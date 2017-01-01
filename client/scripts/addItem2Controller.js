

myapp.controller('addItem2Controller',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.number = [1,2,4,6];
	$scope.show1 = false;	
	$scope.price =  "1000000";
	$scope.highest_price =  "100000000";
    $scope.item = Data.item;
	
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

       getUserInformation = function() {
        $http({
            method: 'GET',
            url: '/api/users/' + Data.userID,
            data: {
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response.data);
                var info = response.data[0];
                $scope.user = info;
            }
        }, function errorCallback(response) {
            console.log('failed to get user info');
            console.log(response);

        });
    };

    //getUserInformation();

    $scope.updateUserAndCreateNewItem = function() {
    	$http({
            method: 'PUT',
            url: '/api/users/' +Data.userID,
            data: {
                'token': Data.token,
                'ten': $scope.user.ten,
                'email': $scope.user.email,
                'avatar': $scope.user.avatar,
                'soDienThoai': $scope.user.soDienThoai,
                'ngaySinh': $scope.user.ngaySinh,
                'gioiTinh': $scope.user.gioiTinh,
                'diaChi': $scoper.user.diaChi
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response.data);
                createNewItem();
            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);

        });
    };


    var generateId = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    var createNewItem  = function()
    {
    	var id = generateId();

    	$http({
            method: 'POST',
            url: '/api/items',
            data: {
                'token': Data.token,
    			'ID': id,
                'moTa': $scope.item.item_content,
                'ten': $scope.item.item_name,
                'hinhAnh': $scope.item.item_image,
                'chuyenMuc': $scope.item.item_type,
                'giaHienTai': $scope.item.item_price,
                'giaKhoiDiem': $scope.item.item_price,
                //
                'ngayHetHan': $scope.item.item_date + $scope.item.item_time,
                //
                'tinhTrang': $scope.item.item_situation,
                'trangThai': 1,
                'noiBan': $scope.item.item_location,
                'vanChuyen': $scope.item.item_trans,
                'nguoiBan': Data.userID

            }
        }).then(function successCallback(response) {
            if (response.status === 201) {
                console.log(response.data);
                $location.path('/them-san-pham-step-3');
            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);

        });
    }

	// -------------- Kết thúc link --------------
}]);