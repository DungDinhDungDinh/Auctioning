myapp.controller('userCommonInfoController', ['$scope', '$http', 'Data', '$location', '$rootScope', '$routeParams', '$route', '$filter', function($scope, $http, Data, $location, $rootScope, $routeParams, $route, $filter) {

    $scope.divNotiFollow = false;
    $scope.divNotiAuction = false;
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

    $scope.goTo_User_Info = function(viewID) {
        if (!viewID) {
            $location.path('/user-thong-tin-chung/' + Data.userID);
        } else {
            $location.path('/user-thong-tin-chung/' + viewID);
        }
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

    //Number only
    $scope.filterValue = function($event) {
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
                if ($scope.staticEmail) {
                    $scope.showEmail = true;
                }
                if ($scope.staticBirthday) {
                    $scope.showBirthday = true;
                }
                if ($scope.staticGender) {
                    $scope.showGender = true;
                }

                //Trang thông tin của người khác
                if (Data.userID !== $scope.viewID) {
                    $scope.notMyInfo = true;
                    console.log($scope.phone);
                    if (!$scope.name) {
                        $scope.name = '* Chưa cập nhật *';
                    }
                    if (!$scope.email) {
                        $scope.email = '* Chưa cập nhật *';
                    }
                    if (!$scope.phone) {
                        $scope.phone = '* Chưa cập nhật *';
                    }
                    if (!$scope.birthday) {
                        $scope.birthday = '* Chưa cập nhật *';
                    }
                    if (!$scope.gender) {
                        $scope.gender = '* Chưa cập nhật *';
                    }
                    if (!$scope.address) {
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


    $scope.cancel = function() {
        $route.reload();
    }

    $scope.saveNewInfo = function() {
        if ($scope.gender === '* Chưa cập nhật *') {
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