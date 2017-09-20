angular.module('cdfinance').controller("BuyController", BuyController);

function BuyController($http, $window, AuthFactory, jwtHelper, $location, $rootScope, getPriceFactory) {
  var vm = this;
  console.log(getPriceFactory.hello);

  vm.buy = function() {
    if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
      var token = $window.sessionStorage.token;
      var decodedToken = jwtHelper.decodeToken(token);
      var username = decodedToken.username;

      var data = {"symbol" : vm.symbol, "amount": vm.amount}; // amount refers to numShares
      console.log("this is data: "+data["amount"]);

      // need to find valueOfShares bought and subtract from vm.balance on dashboard.
      //var valueOfShares =  data["amount"] * ; // numShares * pricePerShare
      //console.log("this is valueOfShares: "+valueOfShares);
      // totalValueOfSecurities should equal sum of all valueOfShares purchases
      //$rootScope.totalValueOfSecurities += valueOfShares;

      $http.post('/api/users/'+ username +"/stocks", data).then(function(response) {
        //check the responses
      }).catch(function(error) {
        console.log(error);
      })
    } else {
      $location.path('/');
    }
  }
}
