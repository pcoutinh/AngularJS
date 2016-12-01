(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['user'];

function InfoController(user) {
  var info = this;
  info.error = "";

  if (user === null ) {
    info.error = "Not Signed Up Yet. Sign up Now!";
  }
  else {
    info.error = "";
    info.user = user;
  }
}


})();