angular.module('cdfinance').factory('getPriceFactory', getPriceFactory);

function getPriceFactory($http) {
  // var vm = this;

  return {
    findPrice: findPrice
  };

  function findPrice(symbol){
    // var x = 3;
    // // symbol can be put in input as lower or uppercase
    // var symbol = getPriceFactory.symbol.toUpperCase();
    // // symbol will always show as uppercase on browser
    // console.log(symbol)

    console.log("sanity check " + symbol);

    return $http.get("/api/stocks/" + symbol).then(complete).catch(failed);
  };//findPrice

  function complete (response) {
    console.log("found stock");
    var stockprice = response.data.price;
    console.log("this is stockprice: "+stockprice);
    getPriceFactory.stockprice = stockprice;
  };//complete

  function failed (error) {
    console.log(error);
  }//catch
}
