angular.module('cdfinance').controller("FindController", FindController);

function FindController($http, getPriceFactory) {
  var vm = this;


  console.log("findController");

  vm.find = function() {

    // // // symbol can be put in input as lower or uppercase
    var greeting = "hello";
    var symbol = vm.symbol.toUpperCase();

    // // // symbol will always show as uppercase on browser
    // console.log("this is symbol: "+symbol);

    // not working
    var asdf = getPriceFactory.findPrice( symbol );

    setTimeout(function(){
      console.log("in setTimeout");
      vm.stockprice = asdf
      }, 5000
    );


    // $http.get("/api/stocks/" + symbol).then(function(response) {
    //   console.log("found stock")
    //   var stockprice = response.data.price
    //   vm.stockprice = stockprice;
    // }).catch(function(error) {
    //   if (error) {
    //     vm.error = error;
    //   }
    // })//catch
  }//find
}
