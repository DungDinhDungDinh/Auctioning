myapp.controller('userCommonInfoController', ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', '$route', function($scope, $http, Data, $location, $rootScope, $routeParams, $route) {

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

    $scope.goTo_Add_Item = function() {
        $location.path('/them-san-pham-step-1');
    };

	//Number only
	$scope.filterValue = function($event)
	{
		var charCode = ($event.which) ? $event.which : $event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
       		$event.preventDefault()
	}
	
    getUserInformation = function() {
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
                $scope.userID = info.ID;
                $scope.name = info.ten;
                $scope.email = info.email;
                $scope.phone = info.soDienThoai;
                $scope.birthday = info.ngaySinh;
                $scope.gender = info.gioiTinh;
                $scope.address = info.diaChi;
                $scope.picture = info.avatar;

                $scope.staticName = info.ten;
                $scope.staticEmail = info.email;
                $scope.staticBirthday = info.ngaySinh;
                $scope.staticGender = info.gioiTinh;
				if($scope.staticEmail){ $scope.showEmail = true;}
				if($scope.staticBirthday){ $scope.showBirthday= true;}
				if($scope.staticGender){ $scope.showGender = true;}
				
				//Trang thông tin của người khác
				if(Data.userID !== $scope.viewID) 
				{ 
					$scope.notMyInfo = true; 
					console.log($scope.phone);
					if (!$scope.name){ 
						$scope.name = '* Chưa cập nhật *';
					}
					if (!$scope.email){ 
						$scope.email = '* Chưa cập nhật *';
					}
					if (!$scope.phone){ 
						$scope.phone = '* Chưa cập nhật *';
					}
					if (!$scope.birthday){ 
						$scope.birthday = '* Chưa cập nhật *';
					}
					if (!$scope.gender){ 
						$scope.gender = '* Chưa cập nhật *';
					}
					if (!$scope.address){ 
						$scope.address = '* Chưa cập nhật *';
					}
				}
            }
        }, function errorCallback(response) {
            console.log('failed to get user info');
            console.log(response);

        });
    };

    getUserInformation();

    $scope.pickImage = function() {
        filepicker.pick({
                mimetype: 'image/*',
                container: 'modal',
                services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'WEBCAM', 'IMAGE_SEARCH']
            },
            function(Blob) {
                console.log(JSON.stringify(Blob));
                $scope.picture = Blob.url;
                $scope.$apply();
            },
            function(FPError) {
                console.log(FPError.toString());
            });
    };

    $scope.saveNewInfo = function() {		
		if($scope.gender === '* Chưa cập nhật *')
		{
			$scope.gender = null;	
		}
    	$http({
            method: 'PUT',
            url: '/api/users/' + $scope.userID,
            data: {
                'token': Data.token,
                'email': $scope.email,
    			'ten': $scope.name,
    			'avatar': $scope.picture,
    			'soDienThoai': $scope.phone,
    			'ngaySinh': $scope.birthday,
    			'gioiTinh': $scope.gender,
    			'diaChi': $scope.address
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
				alert('Lưu thay đổi thành công');
				$route.reload();
            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);

        });
    };

}]);