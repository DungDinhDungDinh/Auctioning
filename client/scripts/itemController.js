

myapp.controller('itemController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	
	$scope.show1 = false;	
	$scope.price =  "1000000";
	$scope.highest_price =  "100000000";
	
	$scope.Theo_doi = function() 
	{	
		$scope.show2 = true;
	}
	
	$scope.Bo_theo_doi = function() 
	{	
		$scope.show2 = false;
	}	
	
	$scope.changeNumber = function() 
	{	
		var x = $scope.price;
		var parts = x.toString().split(" ");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		$scope.price = parts.join(" ");
	}
	
	$scope.changeNumber2 = function() 
	{	
		var x = $scope.highest_price;
		var parts = x.toString().split(" ");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		$scope.highest_price = parts.join(" ");
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