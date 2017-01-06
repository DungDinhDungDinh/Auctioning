

myapp.controller('homeController',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	if (Data.token !== '') {
		$scope.show1 = false;
		$scope.username = Data.name;
	} else {
		$scope.show1 = true;
	}
}]);