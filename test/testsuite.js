var assert = require("assert");
var fs = require("fs");
var path = require("path");
var sign = require("..");

var secret = "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY";
var date = "2011-09-09T23:36:00.000Z";
var region = "us-east-1";
var service = "host";

// Files from the official test suite at:
// http://docs.aws.amazon.com/general/latest/gr/signature-v4-test-suite.html
var testsuite = fs.readdirSync(__dirname + "/aws4_testsuite");

var test_names = testsuite.filter(function(test) {
  return path.extname(test) === ".sts";
}).map(function(test) {
  return path.basename(test, ".sts");
});

var string_to_sign = testsuite.filter(function(test) {
  return path.extname(test) === ".sts";
}).map(function(test) {
  return fs.readFileSync(__dirname + "/aws4_testsuite/" + test, {
    encoding: "utf8"
  });
});

var expected_signature = testsuite.filter(function(test) {
  return path.extname(test) === ".authz";
}).map(function(test) {
  return fs.readFileSync(__dirname + "/aws4_testsuite/" + test, {
    encoding: "utf8"
  });
}).map(function(authz) {
  return authz.substr(-64);
});

for (var i = 0; i < string_to_sign.length; i++) {
  assert.equal(
    sign(
      secret,
      date,
      region,
      service,
      string_to_sign[i]
    ),
    expected_signature[i],
    "Should match known good example for " + test_names[i]
  );
}
