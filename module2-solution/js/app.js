(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// Inject service into first controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;

	// Get the toBuy list from the service
	toBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();

	// Method that will invoke the service method to update the lists
	toBuy.updItems = function(index) {
		ShoppingListCheckOffService.updItems(index);
	}
}

// Inject service into second controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;

	// Get the bought list from the service
	bought.boughtList = ShoppingListCheckOffService.getBoughtList();

}

// Service ShoppingListCheckOffService
function ShoppingListCheckOffService() {
	var service = this;

	var toBuyItems = [
		{item_name:"Cookies", item_quantity: 10 },
		{item_name:"Crackers", item_quantity: 5 },
		{item_name:"Candy", item_quantity: 15 },
		{item_name:"Chips", item_quantity: 12 },
		{item_name:"Milk", item_quantity: 2 },
		{item_name:"Soda", item_quantity: 20 }
	];

	var boughtItems = [];

	// Return the toBuy list
	service.getToBuyList = function () {
		return toBuyItems;
	}

	// Return bought items list
	service.getBoughtList = function () {
		return boughtItems;
	}

	service.updItems = function (index) {
		var boughtItem = toBuyItems.splice(index,1);

		boughtItems.push(boughtItem[0]);
	}
}

}) ();