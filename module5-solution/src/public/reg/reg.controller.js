(function () {
"use strict";

angular.module('public')
.controller('RegController', RegController);

RegController.$inject = ['UserInfoService'];

function RegController(UserInfoService) {
  var reg = this;
  
  reg.user = {
  	fname:"",
  	lname:"",
  	email:"",
  	phone:"",
  	short_name:"",
    fav_item:{}
  }

  reg.error = "";
  reg.infoMsg = "";

  reg.submit = function() {   
    UserInfoService.getMenuItem(reg.user.short_name).then(function (data) {
      reg.user.fav_item = data;
      reg.error = "";
      UserInfoService.saveUser(reg.user);
      reg.infoMsg = "Your information has been saved!!!";
    })
    .catch(function (error) {
      reg.error = "No such menu number exists!!!";
      reg.infoMsg = "";
      reg.user.fav_item = {};
      UserInfoService.clearUser();
    })
  }
}


})();