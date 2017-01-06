

myapp.controller('addItem1Controller',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.number = [1,2,4,6];
	$scope.show1 = false;	
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
}]);