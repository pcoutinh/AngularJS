(function () {
"use strict";

angular.module('public')
.service('UserInfoService', UserInfoService);

UserInfoService.$inject = ['$q', '$http', 'ApiPath'];

function UserInfoService($q, $http, ApiPath) {
  var service = this;
  service.user = null;

  service.getMenuItem = function(short_name) {
    var deferred = $q.defer();
    var itemPath = ApiPath + '/menu_items/' + short_name + '.json';
    
    $http.get(itemPath).then(function (response) {
      deferred.resolve(response.data);
    })
    .catch(function(error) {
      deferred.reject(null);
    });

    return deferred.promise;
  }

  service.getUser = function() {
    return service.user;
  }

  service.saveUser = function(user) {
    service.user = user;
  }

  service.clearUser = function() {
    service.user = null;
  }

}



})();