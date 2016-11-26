(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  // console.log("Creating service");

  service.getAllCategories = function() {   

    return $http ({
        method: "GET",
        url: 'https://davids-restaurant.herokuapp.com/categories.json'
    });
  }

  service.getItemsForCategory = function(categoryShortName) {   

    return $http ({
       method: "GET",
       url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
       params: {
         category: categoryShortName
       }
    });
  }
}

})();
