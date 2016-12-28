

myapp.controller('addItem2Controller',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.number = [1,2,4,6];
	$scope.show1 = false;	
	$scope.price =  "1000000";
	$scope.highest_price =  "100000000";
}]);