(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

// Create directive to display list
function foundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItems.html',
		scope: {
			items: '<',
			onRemove: '&'
		},
		controller: foundItemsDirectiveController,
		controllerAs: 'foundItemsCtrl',
		bindToController: true
	};

	return ddo;
}

function foundItemsDirectiveController() {
	var list = this;
}


// Create the Menu Search Service and inject it with the http and $q components
MenuSearchService.$inject = ['$q','$http'];
function MenuSearchService($q,$http) {
	var service = this;
	
	// Service funtion to get the menu items from the server and
	// search for the user input
	service.getMatchedMenuItems = function(searchTerm) {
		
		var deferred = $q.defer();
		var menuItems = [];
		var foundItems = [];	
		var result = {
     		foundItems: "",
     		message: ""
    	};

		if (!searchTerm) {
			result.message = "Nothing found !!!";
			deferred.reject(result);
		}
		else {
			var response = $http ({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function(response) {

				menuItems = response.data.menu_items;
				
				for (var i = 0; i < menuItems.length; i++) {
					if ((menuItems[i].description.toLowerCase().indexOf(searchTerm) != -1) ||
					   (menuItems[i].name.toLowerCase().indexOf(searchTerm) != -1)) {
						foundItems.push(menuItems[i]);
					}
				}

				if (foundItems.length > 0) {
					result.foundItems = foundItems;
					result.message = "";
					deferred.resolve(result);	
				}
				else {
					result.message = "Nothing found !!!";
	        		deferred.reject(result);
				}
			})	
			.catch (function(error) {
				result.message = "Error reading Rest API !!!";
				deferred.reject(result);
			})
		}
		return deferred.promise;
	}
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var narrowDown = this; 

	narrowDown.name = "";
	narrowDown.found = "";
	narrowDown.error = "";

	// Get list based on user input using the service
	narrowDown.getList = function () {
		narrowDown.error = "";

		var promise = MenuSearchService.getMatchedMenuItems(narrowDown.name.toLowerCase());

		promise.then(function(result) {
			narrowDown.found = result.foundItems;
			narrowDown.error = "";
		}, function(error) {
			narrowDown.error = error.message;
			narrowDown.found = "";
		});
	};

	// Remove item from the list
	narrowDown.removeItem = function(itemIndex) {
		narrowDown.found.splice(itemIndex,1);
	}
}

})();