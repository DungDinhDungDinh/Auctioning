myapp.controller('userCommonInfoController', ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', function($scope, $http, Data, $location, $rootScope, $routeParams) {

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

    $scope.goTo_Item_List = function(danh_muc) {
        console.log(danh_muc);
        Data.danh_muc = danh_muc;
        $location.path('/danh-sach-san-pham');
    };

    $scope.goTo_Search_Result = function() {
        Data.danh_muc = $scope.searchString;
        console.log(Data.danh_muc);
        $location.path('/danh-sach-san-pham');
    };

    $scope.goTo_Item_Info = function(item_ID) {
        Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia');
    };

    $scope.goTo_User_Info = function() {
        Data.ViewUserID = Data.userID;
        console.log(Data.ViewUserID);
        $location.path('/user-thong-tin-chung');
    };

    $scope.goTo_User_Sell = function() {
        $location.path('/user-dang-ban');
    };

    $scope.goTo_User_Buy = function() {
        $location.path('/user-dang-dau');
    };

    $scope.goTo_User_Follow = function() {
        $location.path('/user-theo-doi');
    };

    $scope.goTo_Add_Item = function() {
        $location.path('/them-san-pham-step-1');
    };

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
                console.log($scope.picture);

                $scope.staticName = info.ten;
                $scope.staticEmail = info.email;
                $scope.staticBirthday = info.ngaySinh;
                $scope.staticGender = info.gioiTinh;
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
    	console.log($scope.userID);
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
                console.log(response.data);

            }
        }, function errorCallback(response) {
            console.log('failed to update user information');
            console.log(response);

        });
    };

    // -------------- Kết thúc link --------------
}]);