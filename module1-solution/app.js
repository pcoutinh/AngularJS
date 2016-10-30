(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.items = "";
	$scope.message = "";
	$scope.color = "";

	$scope.check = function() {
		var totalItems = getTotalItems();
		genMsg(totalItems);
	}

	function getTotalItems() {
		var total = 0;

		if ($scope.items == "") {
			total = 0;
		}
		else {
			total = $scope.items.split(',').length;	
		}
		return total;
	}

	function genMsg(totalItems) {
		var msg = "";
		$scope.color = "green";

		if (totalItems == 0) {
			msg = "Please enter data first";
			$scope.color = "red";
		}
		else if (totalItems <= 3) {
			msg = "Enjoy!";	
		}
		else {
			msg = "Too much!";
		}
		$scope.message = msg;
	}
}

})();