myapp.controller('addItem1Controller', ['$scope', '$http', 'Data', '$location', '$rootScope', '$filter', function($scope, $http, Data, $location, $rootScope, $filter) {

    $scope.divNotiFollow = false;
    $scope.divNotiAuction = false;

    $scope.types = ["-- Chọn chuyên mục --",
        "Đồ điện tử",
        "Giải trí, thể thao, sở thích",
        "Xe cộ, máy móc",
        "Mẹ và bé",
        "Thời trang & phụ kiện",
        "Đồ ăn, thức uống",
        "Đồ gia dụng",
        "Sức khỏe & sắc đẹp",
        "Bất động sản",
        "Các loại khác"
    ];

    $scope.situations = ["-- Chọn trạng thái sản phẩm --",
        "Hàng mới",
        "Hàng đã qua sử dụng",
        "Hàng hiếm"
    ];

    $scope.locations = ["-- Chọn vùng bán hàng --",
        "Hà Nội",
        "Tp Hồ Chí Minh",
        "Đông Bắc Bộ",
        "Các tỉnh lân cận Hà Nội",
        "Hải Phòng Nam Định Thái Bình",
        "Thanh Nghệ Tĩnh",
        "Bình Trị Thừa Thiên Huế",
        "Quảng Nam Đà Nẵng",
        "Tây Nguyên",
        "Nam Trung Bộ",
        "Đông Nam Bộ",
        "Cần Thơ - Tây Nam Bộ"
    ];

    $scope.trans = ["-- Chọn phí vận chuyển --",
        "Miễn phí toàn quốc",
        "Miễn phí trong khu vực",
        "Thỏa thuận sau"
    ];

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
			$location.path('/dang-nhap');
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


    //Tip name
    $scope.showTipName = function() {
        $scope.tipName = true;
    }

    $scope.hideTipName = function() {
            $scope.tipName = false;
        }
        //Tip content
    $scope.showTipContent = function() {
        $scope.tipContent = true;
    }

    $scope.hideTipContent = function() {
            $scope.tipContent = false;
        }
        //Tip type
    $scope.showTipType = function() {
        $scope.tipType = true;
    }

    $scope.hideTipType = function() {
        $scope.tipType = false;
    }

    //Tip price
    $scope.showTipPrice = function() {
        $scope.tipPrice = true;
    }

    $scope.hideTipPrice = function() {
        $scope.tipPrice = false;
    }

    //Tip location
    $scope.showTipLocation = function() {
        $scope.tipLocation = true;
    }

    $scope.hideTipLocation = function() {
        $scope.tipLocation = false;
    }

    //Tip trans
    $scope.showTipTrans = function() {
        $scope.tipTrans = true;
    }

    $scope.hideTipTrans = function() {
        $scope.tipTrans = false;
    }

    $scope.filterValue = function($event) {
        var charCode = ($event.which) ? $event.which : $event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            $event.preventDefault()
    }

    $scope.changePrice = function() {
        var x = $scope.item_price;
        x = x.replace(/ /g, "");
        var parts = x.toString().split(" ");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $scope.item_price = parts.join(" ");
    }

    $scope.selectImg = function() {
        console.log('ooo');
        filepicker.pick({
                mimetype: 'image/*',
                container: 'modal',
                services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'WEBCAM', 'IMAGE_SEARCH']
            },
            function(Blob) {
                console.log(JSON.stringify(Blob));
                $scope.item_image = Blob.url;
                $scope.$apply();
            },
            function(FPError) {
                console.log(FPError.toString());
            });
    }

    $scope.checkToNextStep = function() {
        $scope.class_name = "add-info-input";
        $scope.class_content = "add-info-textarea";
        $scope.class_type = "add-info-select";
        $scope.class_situation = "add-info-select";
        $scope.class_image = "chose-img-div";
        $scope.class_price = "add-info-input";
        $scope.class_date = "add-info-input";
        $scope.class_time = "add-info-input";
        $scope.class_location = "add-info-select";
        $scope.class_trans = "add-info-select";
        $scope.error_show_name = false;
        $scope.error_show_content = false;
        $scope.error_show_type = false;
        $scope.error_show_situation = false;
        $scope.error_show_image = false;
        $scope.error_show_price = false;
        $scope.error_show_date = false;
        $scope.error_show_time = false;
        $scope.error_show_location = false;
        $scope.error_show_trans = false;
        $scope.item_date = $('#datepicker').val();
        $scope.item_time = $('#timepicker').val();

        if (!$scope.item_name) {
            $scope.error_name = 'Không được để trống';
            $scope.error_show_name = true;
            $scope.class_name = "add-info-input-error";
            angular.element('#item_name').focus();
            return;
        }

        if (!$scope.item_content) {
            $scope.error_content = 'Không được để trống';
            $scope.error_show_content = true;
            $scope.class_content = "add-info-textarea-error";
            angular.element('#item_content').focus();
            return;
        }

        if ($scope.item_type === $scope.types[0]) {
            $scope.error_type = 'Hãy chọn chuyên mục';
            $scope.error_show_type = true;
            $scope.class_type = "add-info-select-error";
            angular.element('#item_type').focus();
            return;
        }

        if ($scope.item_situation === $scope.situations[0]) {
            $scope.error_situation = 'Hãy chọn trạng thái sản phẩm';
            $scope.error_show_situation = true;
            $scope.class_situation = "add-info-select-error";
            angular.element('#item_situation').focus();
            return;
        }

        //if(!$scope.item_image)
        //{			
        //	$scope.error_image = 'Hãy chọn hình ảnh';
        //	$scope.error_show_image = true;
        //	$scope.class_image = "chose-img-div-error";
        //	angular.element('#item_situation').focus();
        //	return;
        //}

        if (!$scope.item_price) {
            $scope.error_price = 'Không được để trống';
            $scope.error_show_price = true;
            $scope.class_price = "add-info-input-error";
            angular.element('#item_price').focus();
            return;
        }

        if (!$scope.item_date) {
            $scope.error_date = 'Không được để trống';
            $scope.error_show_date = true;
            $scope.class_date = "add-info-input-error";
            angular.element('#datepicker').focus();
            return;
        }

        if (!$scope.item_time) {
            $scope.error_time = 'Không được để trống';
            $scope.error_show_time = true;
            $scope.class_time = "add-info-input-error";
            angular.element('#timepicker').focus();
            return;
        }

        if ($scope.item_location === $scope.locations[0]) {
            $scope.error_location = 'Hãy chọn khu vực bán hàng';
            $scope.error_show_location = true;
            $scope.class_location = "add-info-select-error";
            angular.element('#item_location').focus();
            return;
        }

        if ($scope.item_trans === $scope.trans[0]) {
            $scope.error_trans = 'Hãy chọn phương thức vận chuyển';
            $scope.error_show_trans = true;
            $scope.class_trans = "add-info-select-error";
            angular.element('#item_trans').focus();
            return;
        }

        var item = {};
        item.item_name = $scope.item_name;
        item.item_content = $scope.item_content;
        item.item_type = $scope.item_type;
        item.item_situation = $scope.item_situation;
        item.item_image = $scope.item_image;
        item.item_price = $scope.item_price;
        item.item_date = $('#datepicker').val();
        console.log(item.item_date);
        item.item_time = $('#timepicker').val();
        item.item_date = $scope.item_date;
        item.item_time = $scope.item_time;
        item.item_location = $scope.item_location;
        item.item_trans = $scope.item_trans;
        Data.item = item;
        $location.path('/them-san-pham-step-2');

    };


    var timeCondition = function() {
        var day = new Date();
        $(function() {
            $("#datepicker").datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: 0
            }).on("change", function() {
                var selectedDateString = $("#datepicker").val();
                var selectedDate = new Date(selectedDateString);
                if (selectedDate.getDate() === day.getDate() && selectedDate.getMonth() === day.getMonth()) {
                    // Kiểm tra nếu là ngày hiện tại	
                    $('#timepicker').timepicker({
                        showleadingzero: true
                    });
                    $('#timepicker').timepicker('setTime', 'null');
                    $('#timepicker').timepicker(
                        'option', {
                            minTime: {
                                hour: day.getHours(),
                                minute: day.getMinutes()
                            }
                        }
                    );
                } else {
                    //Nếu không phải ngày hiện tại
                    $('#timepicker').timepicker({
                        showLeadingZero: true
                    });
                    $('#timepicker').timepicker('setTime', 'null');
                    $('#timepicker').timepicker(
                        'option', {
                            minTime: {
                                hour: 0,
                                minute: 0
                            }
                        }
                    );
                }

            });
        });

    }
    timeCondition();

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
    var getNotiAuction = function() {
        $http({
            method: 'GET',
            url: '/api/notifications',
            params: {
                'userID': Data.userID,
                'kind': 0
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $scope.auction_info = response.data;
                console.log($scope.auction_info);
                $scope.auction_noti = $filter('filter')($scope.auction_info, {
                    seen: false
                }).length;
                if ($scope.auction_noti !== 0) {
                    $scope.haveAuctionNoti = true;
                }
                console.log($scope.auction_info);
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
                'kind': 1
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
                'kind': 0
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
                'kind': 1
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
                'kind': kind
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