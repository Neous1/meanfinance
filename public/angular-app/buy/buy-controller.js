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
      console.log("this is data.symbol: ", data["symbol"]);
      console.log("this is data.amount: ", data["amount"]);

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

      $http.get('/api/stocks/' + data["symbol"])
        .then(function(res){
          console.log("this is data.symbol inside GET: ", data["symbol"]);
          console.log("this is the GET response: ", res);
          var stockprice = res.data.price;
          console.log("this is stockprice: ", stockprice);
          vm.stockprice = stockprice; // how do we use this????


        })
        .catch(function(err){
          vm.error = err;
        });


      $http.post('/api/users/'+ username +"/stocks", data).then(function(response) {
        //check the responses
      }).catch(function(error) {
        console.log(error);
      })
    }//if
    else {
      $location.path('/');
    }//else

  }
}
