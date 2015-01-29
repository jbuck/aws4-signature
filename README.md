# aws4-signature

AWS Version 4 signature generator

[![Build Status](https://travis-ci.org/jbuck/aws4-signature.svg)](https://travis-ci.org/jbuck/aws4-signature)

## Example

```javascript
var aws4_sign = require("aws4-signature");

var signature = aws4_sign(
  "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
  "2011-09-09T12:00:00.000Z",
  "us-east-1",
  "iam",
  "AWS4-HMAC-SHA256\n20110909T233600Z\n20110909/us-east-1/iam/aws4_request\n3511de7e95d28ecd39e9513b642aee07e54f4941150d8df8bf94b328ef7e55e2"
);

// Outputs "ced6826de92d2bdeed8f846f0bf508e8559e98e4b0199114b84c54174deb456c"
console.log(signature);
```

## API

aws4-signature has a single function that returns a hexadecimal encoded signature

```
function aws4_sign(
  secret, // Your AWS secret key
  date, // The date of the request in any format that "new Date()" can parse
  region, // The region that is receiving the request
  service, // The service that is receiving the request
  string_to_sign // The string to sign
)
```
