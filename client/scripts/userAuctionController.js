myapp.controller('userAuctionController', ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', function($scope, $http, Data, $location, $rootScope, $routeParams) {

    $scope.number = [1, 2, 4, 6];
    $scope.price = "1000000";
    $scope.highest_price = "100000000";
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
        if (localStorage.getItem("userID") !== null) {
            $scope.show1 = false;
            Data.token = localStorage.getItem("token");
            Data.userID = localStorage.getItem("userID");
            Data.username = localStorage.getItem("username");
            $scope.username = Data.username;
        } else
            $scope.show1 = true;
    }

    // -------------- Link --------------

    $scope.goTo_SignUp = function() {
        $location.path('/dang-ky');
    };

    $scope.goTo_Login = function() {
        $location.path('/dang-nhap');
    };

    $scope.goTo_Logout = function() {
        localStorage.clear();
        Data.token = '';
        Data.userID = '';
        Data.username = '';
        $location.path('/');
    };

    $scope.goTo_Home = function() {
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

    $scope.goTo_Item_Info = function(item_ID) {
        Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia/' + Data.item_ID);
    };

    $scope.goTo_User_Info = function() {
        Data.ViewUserID = Data.userID;
        $location.path('/user-thong-tin-chung/' + $scope.viewID);
    };

    $scope.goTo_User_Sell = function() {
        $location.path('/user-dang-ban/' + $scope.viewID);
    };

    $scope.goTo_User_Buy = function() {
        $location.path('/user-dang-dau/' + $scope.viewID);
    };

    $scope.goTo_User_Follow = function() {
        $location.path('/user-theo-doi/' + $scope.viewID);
    };

    $scope.goTo_Add_Item = function() {
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
		$http({
            method: 'GET',
            url: '/api/userauctions/' ,//+ Data.viewID + '/' + item.ID,
            params: {
                'userID': $scope.viewID,
				'itemID': item.ID
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {		
				item.giaDaTra = response.data[0].giaDaTra;
				item.giaDaTra = changeNumber(item.giaDaTra);
            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);
        });
		var date = new Date(item.ngayHetHan);
		$scope.time_day = date.getDate();			
		$scope.time_month = date.getMonth() + 1;
		$scope.time_year = date.getFullYear();
		$scope.time_hour = date.getHours();
		$scope.time_minute = date.getMinutes();
		
		if($scope.time_day < 10){
			$scope.time_day = '0' + $scope.time_day;
		}
		
		if($scope.time_month < 10){
			$scope.time_month = '0' + $scope.time_month;
		}
		
		if($scope.time_hour < 10){
			$scope.time_hour = '0' + $scope.time_hour;
		}
		
		if($scope.time_minute < 10){
			$scope.time_minute = '0' + $scope.time_minute;
		}

		item.date = $scope.time_day + '/' + $scope.time_month + '/' + $scope.time_year;
		item.time = $scope.time_hour + ':' +$scope.time_minute;
	};

	
	var  getUserInformation = function() {
        $http({
            method: 'GET',
            url: '/api/users/' + $scope.viewID,
            data: {
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {   
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
    };

    var getUserAuctionItems = function() {
        $http({
            method: 'GET',
            url: '/api/item_auctioning',
            params: {
                'userID': $scope.viewID
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
				console.log(response.data);
                $scope.item_list_ID = response.data;
				$scope.auctioning_items = [];
		
				//Lấy danh sách item
                for (i = 0; i < $scope.item_list_ID.length; i++) {
                    $http({
						method: 'GET',
						url: '/api/items/' +  $scope.item_list_ID[i].itemID,
					}).then(function successCallback(response) {
						$scope.auctioning_items.push(response.data[0]);
						console.log($scope.auctioning_items);
					});
                };
									
            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);
        });
    };


    getUserInformation();
	getUserAuctionItems();
}]);