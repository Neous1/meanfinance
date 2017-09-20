angular.module('cdfinance').factory('getPriceFactory', getPriceFactory);

function getPriceFactory(symbol) {
  // var vm = this;

  return {
    findPrice: findPrice
  };

  function findPrice(){

    // // symbol can be put in input as lower or uppercase
    // var symbol = getPriceFactory.symbol.toUpperCase();
    // // symbol will always show as uppercase on browser
    // console.log(symbol)
    
    console.log('hi');

    // return $http.get("/api/stocks/" + symbol).then(function(response) {
    //          console.log("found stock")
    //          var stockprice = response.data.price
    //            getPriceFactory.stockprice = stockprice;
    //          }).catch(function(error) {
    //            if (error) {
    //              getPriceFactory.error = error;
    //            }
    //          })//catch
  };//find
}
