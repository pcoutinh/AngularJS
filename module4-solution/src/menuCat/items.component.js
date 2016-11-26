(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuCat/templates/itemscomponent.template.html',
  bindings: {
    items: '<'
  }
});

})();
