var app = angular.module( 'app', [] );
/*
    AppController
*/
app.controller( 'appController', function( $scope, $http, $timeout ) {

  // Say, the string is empty initially...
  $scope.encryptedString = "";

  // How long is encrypted string?
  this.encryptedStringLength = function() {
    return $scope.encryptedString.length;
  }

  // How long is decrypted one?
  this.decryptedStringLength = function() {
    return decryptPassword( $scope.encryptedString ).length;
  }

  // magic happens here
  this.decryptPasswordString = function() {
    return decryptPassword( $scope.encryptedString );
  }

  // The other side of medal...
  this.flip = function () {
    $timeout(
      function() {
        angular.element(
          document.querySelector(".front")).
          removeClass("close-open").
          addClass("hidden open-close")
      } ,0
    );
    $timeout(
        function() {
          angular.element(
            document.querySelector(".back")).
            removeClass("hidden").
            addClass("close-open")
      }, 500
    );
  }

  // Go back to front side
  this.back = function() {
    $timeout(
      function() {
        angular.element(
          document.querySelector(".back")).
          removeClass("close-open").
          addClass("hidden open-close")
      } ,0
    );
    $timeout(
      function() {
        angular.element(
          document.querySelector(".front")).
          removeClass("hidden open-close").
          addClass("close-open")
      }, 500
    );
  }
});
