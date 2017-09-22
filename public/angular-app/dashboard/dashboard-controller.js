angular.module('cdfinance').controller("DashboardController", DashboardController);

function DashboardController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;
    var latestprices = [];

    $http.get('/api/users/' + username + "/stocks").then(function (response) {
        vm.stocks = response.data.stocks;
        latestprices = [];
      })
      .then(function (response) {
        // 14. vm.stock
        console.log('14. vm.stock: ', vm.stocks);
        vm.stocks.forEach(function (element) {
          $http.get("/api/latestprice/" + element._id)
            .then(function (response) {
              console.log("20 . ", response)
            })
        }, this);

      })
      .catch(function (error) {
        console.log(error);
      })
    $http.get('/api/users/' + username).then(function (response) {
      vm.balance = response.data
    })

  } else {
    $location.path('/');
  }
}