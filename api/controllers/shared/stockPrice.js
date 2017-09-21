var https = require('https');
var _apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=3KZ8QLDN95EF7RNO&outputsize=compact"
var queryString = require("querystring");
var requestLibrary = require("request");

module.exports.getPrice = function(req, res, symbol) {

  var url = _apiUrl + "&symbol=" + symbol

  console.log(url);

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
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);
        // console.log(data);
        var stockData = data['Time Series (Daily)']
        var keys = Object.keys(stockData);
        var price = parseFloat(stockData[keys[0]]['4. close']);
        res
          .status(200)
          .json({"price" : price});
      }
    });
  });
}

module.exports.returnPrice = function(symbol) {
  var url = _apiUrl + "&symbol=" + symbol;
  console.log("this is url line 46: ",url);
  var res;
  var cf = {uri:url, method: "GET", timeout: 10000, followRedirect: true, maxRedirect: 10 };
  requestLibrary(cf, function(err,response,bod){
    console.log("x",response);
    var s = JSON.parse(response);
    console.log("y",s);
  });

  // getData( url , res ,'returnPrice'  );
  console.log("line 56:  ",res);
  // var request = https.get(url, function (response) {
  //   // data is streamed in chunks from the server
  //   // so we have to handle the "data" event
  //   var buffer = "",
  //       data,
  //       route;
  //   console.log("this is response: " + response.body);
  //   console.log("this is response: " + response.status);
  //
  //   response.on('data', (d) => {
  //     console.log("**************");
  //   process.stdout.write(d);
  //   console.log("****************");
  //   });
  //
  //   // response.on("data", function (chunk) {
  //   //
  //   //   buffer += chunk;
  //   //   console.log("this is buffer: ", buffer);
  //   // });
  //
  //   response.on("end", function (err) {
  //     console.log("EEEEEENNNNNNNNNDDDDDDDDDD");
  //     if (err) {
  //       return err
  //     } else {
  //       // finished transferring data
  //       // dump the raw data
  //       data = JSON.parse(d);
  //       // console.log(data);
  //       var stockData = data['Time Series (Daily)'];
  //       console.log("this is stockdata: ", stockData);
  //       var keys = Object.keys(stockData);
  //
  //       console.log("this is keys: ", keys);
  //       return parseFloat(stockData[keys[0]]['4. close']);
  //     }
  //   });
  // });
}
