var crypto = require("crypto");

var hmac = function(key, string, encoding) {
  return crypto.createHmac("sha256", key).update(string, "utf8").digest(encoding);
}

module.exports = function aws4_sign(secret, date, region, service, string_to_sign) {
  var date_string = new Date(date).toISOString()
    .replace(/[:\-]|\.\d{3}/g, "").substr(0, 8);

  var date_key = hmac("AWS4" + secret, date_string);
  var region_key = hmac(date_key, region);
  var service_key = hmac(region_key, service);
  var signing_key = hmac(service_key, "aws4_request");

  var signature = hmac(signing_key, string_to_sign, "hex");

  return signature;
};
