myapp.controller('addItem1Controller', ['$scope', '$http', 'Data', '$location', '$rootScope', function($scope, $http, Data, $location, $rootScope) {

    $scope.types = ["-- Chọn chuyên mục --",
        "Đồ điện tử",
        "Giải trí, Thể thao, Sở thích",
        "Xe cộ, máy móc",
        "Mẹ & Bé",
        "Thời trang & Phụ kiện",
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
        Data.danh_muc = danh_muc;
        $location.path('/danh-sach-san-pham');
    };

    $scope.goTo_Search_Result = function() {
        Data.danh_muc = $scope.searchString;
        $location.path('/danh-sach-san-pham');
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

}]);