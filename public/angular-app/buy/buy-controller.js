angular.module('cdfinance').controller("BuyController", BuyController);

function BuyController($http, $window, AuthFactory, jwtHelper, $location, $rootScope) {
  var vm = this;
  // getPriceFactory.hello(); // test 1

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


      // ///////// this is code from find (for reference only) //////////
      // $http.get("/api/stocks/" + symbol).then(function(response) {
      //   console.log("found stock")
      //   var stockprice = response.data.price;
      //   vm.stockprice = stockprice;
      // }).catch(function(error) {
      //   if (error) {
      //     vm.error = error;
      //   }
      // })//catch
      // /////////////////

      // $http.get('/api/users/'+ username +"/stocks/" + symbol)


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
