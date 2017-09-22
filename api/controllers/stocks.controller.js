var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');
var https = require('https');
var stockPrice = require('./shared/stockPrice.js')

module.exports.stocksGetPrice = function (req, res) {
  var symbol = req.params.symbol
  console.log("looking up symbol:", symbol);

  Stock
    .findById(symbol)
    .exec(function (err, stock) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else if (!stock) {
        res
          .status(404)
          .json({
            "message": "Stock symbol invalid"
          })
      } else {
        //found the stock symbol it is a valid NASDAQ stock symbol pull data
        //from api.
        var price = stockPrice.getPrice(req, res, symbol);

      }
    })

}
module.exports.latestPrice = function (req, res) {
  var symbol = req.params.symbol;
  console.log("32. latestprice FUNC", symbol);

  var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=3KZ8QLDN95EF7RNO&outputsize=compact&symbol="+symbol;

  var request = https.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "",
      data,
      route;

    response.on("data", function (chunk) {
      buffer += chunk;
    });

    response.on("end", function (err) {
      if (err) {
        res
          .status(500)
          .json(err)
      } else {
        data = JSON.parse(buffer);
        var lprice = data['Realtime Global Securities Quote']['03. Latest Price'];
        console.log("57 . ", data['Realtime Global Securities Quote']['03. Latest Price']);
        res
          .status(200)
          .json({
            "sym":symbol,
            "price": lprice
          });
      }
    });
  });




  // return symbol;





}