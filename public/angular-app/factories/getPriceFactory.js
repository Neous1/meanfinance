angular.module('cdfinance').factory('getPriceFactory', getPriceFactory);

function getPriceFactory($http) {

  return {
    hello: hello
  };

  function hello(){
    console.log("we're in getPriceFactory!!!");
  };
}
