myapp.controller('itemListController', ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', '$route', '$filter', function($scope, $http, Data, $location, $rootScope, $routeParams, $route, $filter) {

    $scope.divNotiFollow = false;
    $scope.divNotiAuction = false;
    $scope.chuyenMuc = $routeParams.chuyenMuc;
    if ($scope.chuyenMuc === 'do-dien-tu') {
        $scope.chuyenMuc = "Đồ điện tử";
        $scope.apiString = 'all_electronic_items';
    }
    if ($scope.chuyenMuc === 'giai-tri-the-thao-so-thich') {
        $scope.chuyenMuc = "Giải trí, thể thao, sở thích";
        $scope.apiString = 'all_entertainment_items';
    }
    if ($scope.chuyenMuc === 'xe-co-may-moc') {
        $scope.chuyenMuc = "Xe cộ, máy móc";
        $scope.apiString = 'all_vehicle_items';
    }
    if ($scope.chuyenMuc === 'me-va-be') {
        $scope.chuyenMuc = "Mẹ và bé";
        $scope.apiString = 'all_momandbaby_titems';
    }
    if ($scope.chuyenMuc === 'thoi-trang-va-phu-kien') {
        $scope.chuyenMuc = "Thời trang & phụ kiện";
        $scope.apiString = 'all_fashion_items';
    }
    if ($scope.chuyenMuc === 'do-an-thuc-uong') {
        $scope.chuyenMuc = "Đồ ăn, thức uống";
        $scope.apiString = 'all_food_items';
    }
    if ($scope.chuyenMuc === 'do-gia-dung') {
        $scope.chuyenMuc = "Đồ gia dụng";
        $scope.apiString = 'all_home_items';
    }
    if ($scope.chuyenMuc === 'suc-khoe-va-sac-dep') {
        $scope.chuyenMuc = "Sức khỏe & sắc đẹp";
        $scope.apiString = 'all_healthy_items';
    }
    if ($scope.chuyenMuc === 'bat-dong-san') {
        $scope.chuyenMuc = "Bất động sản";
        $scope.apiString = 'all_realty_items';
    }
    if ($scope.chuyenMuc === 'cac-loai-khac') {
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
        if (localStorage.getItem("userID") !== null) {
            $scope.show1 = false;
            Data.token = localStorage.getItem("token");
            Data.userID = localStorage.getItem("userID");
            Data.username = localStorage.getItem("username");
            $scope.username = Data.username;
        } else {
            $scope.show1 = true;
        }
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
        if (danh_muc === "Đồ điện tử") {
            danh_muc = 'do-dien-tu';
        }
        if (danh_muc === "Giải trí, thể thao, sở thích") {
            danh_muc = 'giai-tri-the-thao-so-thich';
        }
        if (danh_muc === "Xe cộ, máy móc") {
            danh_muc = 'xe-co-may-moc';
        }
        if (danh_muc === "Mẹ và bé") {
            danh_muc = 'me-va-be';
        }
        if (danh_muc === "Thời trang & phụ kiện") {
            danh_muc = 'thoi-trang-va-phu-kien';
        }
        if (danh_muc === "Đồ ăn, thức uống") {
            danh_muc = 'do-an-thuc-uong';
        }
        if (danh_muc === "Đồ gia dụng") {
            danh_muc = 'do-gia-dung';
        }
        if (danh_muc === "Sức khỏe & sắc đẹp") {
            danh_muc = 'suc-khoe-va-sac-dep';
        }
        if (danh_muc === "Bất động sản") {
            danh_muc = 'bat-dong-san';
        }
        if (danh_muc === "Các loại khác") {
            danh_muc = 'cac-loai-khac';
        }
        $location.path('/danh-sach-san-pham/' + danh_muc);
        $route.reload();
    };

    $scope.goTo_Search_Result = function() {
        if (!$scope.searchString) {
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
        if (item.trangThai === true) {
            item.status = 'Đang đấu giá';
        } else {
            item.status = 'Đã kết thúc';
        }

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

        item.date = $scope.time_day + '/' + $scope.time_month + '/' + $scope.time_year;
        item.time = $scope.time_hour + ':' + $scope.time_minute;
    }

    // Lấy danh sách các sản phẩm của chuyên mục
    var loadDuLieu = function() {
        $http({
            method: 'GET',
            url: '/api/' + $scope.apiString,
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log('load danh sach chuyen muc thanh cong');
                if (response.data.length === 0) {
                    $scope.notFound = true;
                }
                $scope.all_type_items = response.data;
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    loadDuLieu();

    //Hiện notification Follow  
    $(document).mouseup(function(e) {
        var container = $("#notiFollow");
        var box = $("#notiBoxFollow");
        //Là box được chọn
        if (box.is(e.target) || (box.has(e.target).length !== 0)) {
            //Nếu chưa show container
            if ($scope.divNotiFollow === false) {
                $scope.divNotiFollow = true;
                setSeenAllNoti(1);
                $scope.follow_noti = 0;
                $scope.notiFollowClass = 'box-noti-clicked';
                $scope.$apply();
            } else {
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
    $(document).mouseup(function(e) {
        var container = $("#notiAuction");
        var box = $("#notiBoxAuction");
        //Là box được chọn
        if (box.is(e.target) || (box.has(e.target).length !== 0)) {
            //Nếu chưa show container
            if ($scope.divNotiAuction === false) {
                $scope.divNotiAuction = true;
                setSeenAllNoti(0);
                $scope.auction_noti = 0;
                $scope.notiAuctionClass = 'box-noti-clicked';
                $scope.$apply();
            } else {
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
    $scope.auction_info = [];

    Data.socket.on('auction_notification', function(data) {
        console.log('auction_notification');
        var users = data.users;
        if (users.indexOf(Data.userID) !== -1) {
            getNotiAuction();
            $scope.$apply();
        }
    });

    Data.socket.on('follow_notification', function(data) {
        console.log('follow_notificaiton');
        var users = data.users;
        if (users.indexOf(Data.userID) !== -1) {
            getNotiFollow();
            $scope.$apply();
        }
    });

    var getNotiAuction = function() {
        $http({
            method: 'GET',
            url: '/api/notifications',
            params: {
                'userID': Data.userID,
                'kind': 0,
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $scope.auction_info = response.data;
                $scope.auction_noti = $filter('filter')($scope.auction_info, {
                    seen: false
                }).length;
                if ($scope.auction_noti !== 0) {
                    $scope.haveAuctionNoti = true;
                }
                angular.forEach($scope.auction_info, function(data) {
                    if (data.status === true) {
                        data.massage = 'Đã có trả giá cao hơn cho sản phẩm này';
                    } else {
                        data.massage = 'Thời hạn đấu giá sản phẩm đã kết thúc';
                    }
                });
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    var getNotiFollow = function() {
        $http({
            method: 'GET',
            url: '/api/notifications',
            params: {
                'userID': Data.userID,
                'kind': 1,
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $scope.follow_info = response.data;
                $scope.follow_noti = $filter('filter')($scope.follow_info, {
                    seen: false
                }).length;
                if ($scope.follow_noti !== 0) {
                    $scope.haveFollowNoti = true;
                }
                angular.forEach($scope.follow_info, function(data) {
                    if (data.status === true) {
                        data.massage = 'Đã có trả giá cao hơn cho sản phẩm này';
                    } else {
                        data.massage = 'Thời hạn đấu giá sản phẩm đã kết thúc';
                    }
                });
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.deleteAuctionNoti = function(index) {
        var noti = $scope.auction_info[index];
        $scope.auction_info.splice(index, 1);
        //gọi api xóa auction noti của user ở đây
        //...
        $http({
            method: 'DELETE',
            url: '/api/notifications/' + noti._id,
            params: {
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response);
            }
        }, function errorCallback(response) {
            console.log(response);
        });

    }

    $scope.deleteFollowNoti = function(index) {
        var noti = $scope.auction_info[index];
        $scope.follow_info.splice(index, 1);
        //gọi api xóa follow noti của user ở đây
        //...
        $http({
            method: 'DELETE',
            url: '/api/notifications/' + noti._id,
            params: {
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.deleteAllAuctionNoti = function(index) {
        $scope.auction_info = [];
        //gọi api xóa toàn bộ auction noti của user ở đây
        //...
        $http({
            method: 'DELETE',
            url: '/api/notifications',
            params: {
                'userID': Data.userID,
                'kind': 0,
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.deleteAllFollowNoti = function(index) {
        $scope.follow_info = [];
        //gọi api xóa toàn bộ follow noti của user ở đây
        //...
        $http({
            method: 'DELETE',
            url: '/api/notifications',
            params: {
                'userID': Data.userID,
                'kind': 1,
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    getNotiAuction();
    getNotiFollow();

    var setSeenAllNoti = function(kind) {
        $http({
            method: 'POST',
            url: '/api/notifications_seen',
            data: {
                'userID': Data.userID,
                'kind': kind,
                'token': Data.token
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                console.log(response);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.inDevelopmentAlert = function() {
        alert('Chức năng hiện tại đang được phát triển ...');
    };

}]);