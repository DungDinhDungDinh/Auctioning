myapp.controller('homeController', ['$scope', '$http', 'Data', '$location', '$rootScope', function($scope, $http, Data, $location, $rootScope) {
	
	$scope.divNotiFollow = false;
	$scope.divNotiAuction = false;
	
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
        $location.path('/danh-sach-san-pham/' + danh_muc);
    };

    $scope.goTo_Search_Result = function() {
        if (!$scope.searchString) {
            $scope.searchString = 'all';
        }
        $location.path('/ket-qua-tim-kiem/' + $scope.searchString);
    };

    $scope.goTo_Item_Info = function(item_ID) {
        Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia/' + item_ID);
    };

    $scope.goTo_User_Info = function() {
        Data.ViewUserID = Data.userID;
        console.log(Data.ViewUserID);
        $location.path('/user-thong-tin-chung/' + Data.userID);
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                // console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
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
                //console.log(response.data);
                //console.log('load du lieu thanh cong');
                $scope.new_other_items = response.data;
            }
        }, function errorCallback(response) {
            console.log('Không thể lấy 5 đồ điện tử');
            console.log(response);
        });
    }
    loadDuLieu();
		
	//Hiện notification Follow	
	$(document).mouseup(function (e){
		var container = $("#notiFollow");
		var box = $("#notiBoxFollow");
		//Là box được chọn
		if(box.is(e.target) || (box.has(e.target).length !== 0)){
			//Nếu chưa show container
			if($scope.divNotiFollow === false){
				$scope.divNotiFollow = true;	
				$scope.notiFollowClass = 'box-noti-clicked';
			} else{
				// Đã show container
				if (!container.is(e.target) && (container.has(e.target).length === 0) && ($scope.divNotiFollow === true)) {
					$scope.divNotiFollow = false;
					$scope.notiFollowClass = 'box-noti';		
				}
			}
		} else { //không phải box
			$scope.notiFollowClass = 'box-noti';
			$scope.divNotiFollow = false;			
			$scope.$apply();
		}
	});
	
	
	//Hiện notification Auction
	$(document).mouseup(function (e){
		var container = $("#notiAuction");
		var box = $("#notiBoxAuction");
		//Là box được chọn
		if(box.is(e.target) || (box.has(e.target).length !== 0)){
			//Nếu chưa show container
			if($scope.divNotiAuction === false){
				$scope.divNotiAuction = true;	
				$scope.notiAuctionClass = 'box-noti-clicked';
			} else{
				// Đã show container
				if (!container.is(e.target) && (container.has(e.target).length === 0) && ($scope.divNotiAuction === true)) {
					$scope.divNotiAuction = false;
					$scope.notiAuctionClass = 'box-noti';		
				}
			}
		} else { //không phải box
			$scope.notiAuctionClass = 'box-noti';
			$scope.divNotiAuction = false;			
			$scope.$apply();
		}
	});

    //Notification
    $scope.auction_noti = Data.auction_noti;
    $scope.follow_noti = Data.follow_noti;

    Data.socket.on('auction_notification', function(data) {
        console.log('auction_notification');
        var users = data.users;
        if (users.indexOf(Data.userID) !== -1) {
            Data.auction_noti += 1;
            $scope.auction_noti = Data.follow_noti;
            $scope.$apply();
        }
    });


    Data.socket.on('follow_notification', function(data) {
        console.log('follow_notificaiton');
        var users = data.users;
        if (users.indexOf(Data.userID) !== -1) {
            Data.follow_noti += 1;
            $scope.follow_noti = Data.follow_noti;
            $scope.$apply();
        }
    });

}]);