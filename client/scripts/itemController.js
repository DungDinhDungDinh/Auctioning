myapp.controller('itemController', ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', '$route', function($scope, $http, Data, $location, $rootScope, $routeParams, $route) {

	$scope.divNotiFollow = false;
	$scope.divNotiAuction = false;
    $scope.itemID = $routeParams.itemID;

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
        location.path('/san-pham-dau-gia/' + Data.item_ID);
    };

    $scope.goTo_User_Info = function(viewID) {
        if (!viewID) {
            $location.path('/user-thong-tin-chung/' + Data.userID);
        } else {
            $location.path('/user-thong-tin-chung/' + viewID);
        }
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

    // -------------- Kết thúc link --------------

	
    $scope.Theo_doi = function() {
        $http({
            method: 'POST',
            url: '/api/userfollows',
            data: {
                'userID': Data.userID,
                'itemID': $scope.itemID
            }
        }).then(function successCallback(response) {
            //console.log(response.data);
            if (response.status === 201) {
                $scope.show2 = true;
            }
        }, function errorCallback(response) {
            //console.log(response);

        });
    }

    $scope.Bo_theo_doi = function() {
        $http({
            method: 'PUT',
            url: '/api/userfollows',
            data: {
                'userID': Data.userID,
                'itemID': $scope.itemID
            }
        }).then(function successCallback(response) {
            //console.log(response.data);
            if (response.status === 200) {
                $scope.show2 = false;
            }
        }, function errorCallback(response) {
            //console.log(response);
        });
    }

    //Chuyển giá tiền thành có '.'
    changeNumber = function(price) {
        var x = price;
        var parts = x.toString().split(" ");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        price = parts.join(" ");
        return price
    }

    $scope.filterValue = function($event) {
        var charCode = ($event.which) ? $event.which : $event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            $event.preventDefault()
    }

    $scope.changePrice = function() {
        var x = $scope.yourPrice;
        x = x.replace(" đ", "");
        x = x.replace(/\./g, " ");
        x = x.replace(/ /g, "");
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $scope.yourPrice = parts.join(".");
        //$scope.yourPrice = $scope.yourPrice + " đ";
    }

    var getItemInformation = function() {
        $http({
            method: 'GET',
            url: '/api/items/' + $scope.itemID
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response.data);
                var item = response.data[0];
                $scope.item_name = item.ten;
                $scope.item_picture = item.hinhAnh;
                $scope.item_type = item.chuyenMuc;
                $scope.item_content = item.moTa;
                $scope.item_price = item.giaHienTai;
                $scope.item_status = item.trangThai
                $scope.item_situation = item.tinhTrang;
                $scope.item_location = item.noiBan;
                $scope.item_trans = item.vanChuyen;
                $scope.item_price = changeNumber($scope.item_price);

                var date = new Date(item.ngayHetHan);
                $scope.time_day = date.getDate();
                $scope.time_month = date.getMonth() + 1;
                $scope.time_year = date.getFullYear();
                $scope.time_hour = date.getHours();
                $scope.time_minute = date.getMinutes();

                if ($scope.time_day < 10) {
                    $scope.time_day = '0' + $scope.time_day;
                }

                if ($scope.time_month < 10) {
                    $scope.time_month = '0' + $scope.time_month;
                }

                if ($scope.time_hour < 10) {
                    $scope.time_hour = '0' + $scope.time_hour;
                }

                if ($scope.time_minute < 10) {
                    $scope.time_minute = '0' + $scope.time_minute;
                }

                $scope.item_dateExpire = $scope.time_day + '/' + $scope.time_month + '/' + $scope.time_year + ' ' + $scope.time_hour + ':' +$scope.time_minute;
				
                getUserInformation(item.nguoiBan, 1);
                getUserInformation(item.nguoiTra, 0);

                if (Data.userID === item.nguoiBan) {
                    $scope.ownItem = true;
                }

                if (item.trangThai === false) {
                    $scope.expiredShow = true;
                }

                if (!item.nguoiTra) {
                    $scope.noBuyer = true;
                }

                $(function() {
                    var austDay = new Date();
                    austDay = new Date($scope.time_year, $scope.time_month - 1, $scope.time_day, $scope.time_hour, $scope.time_minute);
                    $('#defaultCountdown').countdown({
                        until: austDay,
                        format: 'dHMS'
                    });
                    $('#year').text(austDay.getFullYear());
                });
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };
	
    var getUserInformation = function(id, isOwner) {
		console.log(id);
        $http({
            method: 'GET',
            url: '/api/users/' + id
        }).then(function successCallback(response) {
            if (response.status === 200) {
                var info = response.data[0];
                if (isOwner) {
                    $scope.owner = info;
                } else {
					console.log(response.data);
                    $scope.buyer = info;
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.bidItem = function() {
        if (!$scope.yourPrice) {
            alert('Hãy nhập giá của bạn');
            return;
        }
        var newPrice = $scope.yourPrice.replace(/\./g, '');
        newPrice = newPrice.replace(" đ", '');
        var itemPrice = $scope.item_price.replace(/\./g, '');
        if (Number(newPrice) > Number(itemPrice)) {
            $http({
                method: 'POST',
                url: '/api/userauctions',
                data: {
                    'userID': Data.userID,
                    'itemID': $scope.itemID,
                    'buyerName': Data.username,
                    'giaDaTra': newPrice
                }
            }).then(function successCallback(response) {
                if (response.status === 200) {
                    console.log(response.data);
                    Data.socket.emit('new_auction', {
                        itemID: $scope.itemID,
                        userID: Data.userID,
                        itemName: $scope.item_name
                    });
                    console.log(response.data);
                    alert('Ra giá thành công!');
                    $route.reload();

                }
            }, function errorCallback(response) {
                console.log(response);
                alert('Ra giá thất bại!');
            });
        } else {
            alert('Giá mới phải lớn hơn giá hiện tại!');
        }
    }

    var checkFollowItem = function() {
        $http({
            method: 'GET',
            url: '/api/userfollows',
            params: {
                'userID': Data.userID,
                'itemID': $scope.itemID
            }
        }).then(function successCallback(response) {           
            if (response.status === 200) {
                $scope.show2 = response.data.follow;
				console.log(response.data);
            }
        }, function errorCallback(response) {
            console.log(response);

        });
    };

    getItemInformation();
    checkFollowItem();
	
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

    // //Notification
    $scope.auction_noti = Data.auction_noti;
    $scope.follow_noti = Data.follow_noti;
	console.log($scope.auction_noti);
	console.log($scope.auction_noti);
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