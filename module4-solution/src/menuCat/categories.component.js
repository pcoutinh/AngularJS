(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuCat/templates/categoriescomponent.template.html',
  bindings: {
    categories: '<'
  }
});

})();
