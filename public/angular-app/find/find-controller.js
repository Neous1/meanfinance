angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;


  console.log("findController");
  vm.find = function() {
    // // symbol can be put in input as lower or uppercase
    var symbol = vm.symbol.toUpperCase();
    // // symbol will always show as uppercase on browser
    console.log(symbol)

    // getPriceFactory.findPrice();

    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      var stockprice = response.data.price
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })//catch
  }//find
}
