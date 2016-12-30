

myapp.controller('itemListController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	if (Data.token !== '') {
		$scope.show1 = false;
		$scope.username = Data.username;
	} else {
		$scope.show1 = true;
	}
	
	$scope.number = [1,2,4,6];
	$scope.price =  "1000000";
	$scope.highest_price =  "100000000";
	
	
	
	
}]);