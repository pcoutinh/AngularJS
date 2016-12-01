(function () {
"use strict";

angular.module('public')
.component('favItem', {
  templateUrl: 'src/public/fav-item/fav-item.html',
  bindings: {
    userInfo: '<'
  },
  controller: FavItemController
});

FavItemController.$inject = ['ApiPath'];
function FavItemController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();