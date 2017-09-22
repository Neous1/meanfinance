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

        vm.stocks.sort(function (a, b) {
          // console.log("18. ", a, b);
          // console.log("18. ", a._id, b._id);
          return (a._id < b._id) ? -1 : (a._id > b._id) ? 1 : 0;
        });

        latestprices = [];
      })
      .then(function (response) {
        // 14. vm.stock
        console.log('14. vm.stock: ', vm.stocks);
        vm.stocks.forEach(function (element) {
          $http.get("/api/latestprice/" + element._id)
            .then(function (response) {
              console.log("20 . ", response.data.sym, response.data.price);
              var resData = response.data;
              vm.stocks.find(function(item){
                if (item._id === response.data.sym) {
                  item["price"]=response.data.price;
                  console.log("33. ", item);
                  item["totalValue"]= totalValue(item["price"], item.amount);
                }
              })
            })
        }, this);

      })
      .catch(function (error) {
        console.log(error);
      })
      function totalValue(price, amount){
        var val = parseFloat(price) * parseInt(amount);
        console.log("46 . ", val);
        return val ;

      }



    $http.get('/api/users/' + username).then(function (response) {
      vm.balance = response.data
    })

  } else {
    $location.path('/');
  }
}