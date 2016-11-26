(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuCat/templates/home.template.html'
  })

  // List all categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuCat/templates/categories.template.html',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().then(function(response) {
                // console.log("got response in state categories")
                return response.data;
              });
      }]
    }
  })

  // List Items within a category
  .state('items', {
    url: '/items/{category}',
    templateUrl: 'src/menuCat/templates/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.category)
              .then(function(response) {
                  return response.data.menu_items;
              });
      }]
    }
  });

}

})();
