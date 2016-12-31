

myapp.controller('addItem1Controller',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.number = [1,2,4,6];
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
					"Các loại khác"];

	$scope.status = ["-- Chọn trạng thái sản phẩm --",
					"Hàng mới",
					"Hàng đã qua sử dụng",
					"Hàng hiếm"];

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
					"Cần Thơ - Tây Nam Bộ"];

	$scope.trans = ["-- Chọn phí vận chuyển --",
					"Miễn phí toàn quốc",
					"Miễn phí trong khu vực",
					"Thỏa thuận sau"];

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
		console.log(danh_muc);
		Data.danh_muc = danh_muc;
        $location.path('/danh-sach-san-pham');
    };

	$scope.goTo_Search_Result = function () {
		Data.danh_muc = $scope.searchString;
		console.log(Data.danh_muc);
        $location.path('/danh-sach-san-pham');
    };

	$scope.goTo_Item_Info = function (item_ID) {
		Data.item_ID = item_ID;
        $location.path('/san-pham-dau-gia');
    };

	$scope.goTo_User_Info = function () {
		Data.ViewUserID = Data.userID;
		console.log(Data.ViewUserID);
        $location.path('/user-thong-tin-chung');
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

	// -------------- Kết thúc link --------------


	//Tip name
	$scope.showTipName = function()
	{
		$scope.tipName = true;
		$scope.myStyle={border:'1px solid blue'};
	}

	$scope.hideTipName = function()
	{
		$scope.tipName = false;
	}
	//Tip content
	$scope.showTipContent = function()
	{
		$scope.tipContent = true;
		$scope.myStyle={border:'1px solid red'};
	}

	$scope.hideTipContent = function()
	{
		$scope.tipContent = false;
	}
	//Tip type
	$scope.showTipType = function()
	{
		$scope.tipType = true;
	}

	$scope.hideTipType = function()
	{
		$scope.tipType = false;
	}

	//Tip location
	$scope.showTipLocation = function()
	{
		$scope.tipLocation = true;
	}

	$scope.hideTipLocation = function()
	{
		$scope.tipLocation = false;
	}

	//Tip trans
	$scope.showTipTrans = function()
	{
		$scope.tipTrans = true;
	}

	$scope.hideTipTrans = function()
	{
		$scope.tipTrans = false;
	}


	$scope.filterValue = function($event)
	{
		var charCode = ($event.which) ? $event.which : $event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
       		$event.preventDefault()
	}

	$scope.changePrice = function()
	{
		var x = $scope.name;
		x = x.replace(/ /g,"");
		var parts = x.toString().split(" ");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		$scope.name = parts.join(" ");
	}

	$scope.selectImg = function () {
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
		Data.item_name = $scope.item_name;
		Data.item_content = $scope.item_content;
		Data.item_type = $scope.item_type;
		Data.item_status = $scope.item_status;
		Data.item_image = $scope.item_image;
		Data.item_price = $scope.item_price;
		$scope.item_date = $('#datepicker').val();
		$scope.item_time = $('#timepicker').val();
		Data.item_date = $scope.item_date;
		Data.item_time = $scope.item_time;
		Data.item_location = $scope.item_location;
		Data.item_trans = $scope.item_trans;

		localStorage.setItem("test", $scope.item_content);
		console.log($scope.item_content);

		$location.path('/them-san-pham-step-2');

	};




}]);
