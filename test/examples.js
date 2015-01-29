var assert = require("assert");
var sign = require("..");
var string_to_sign;
var expected_signature;

// http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html
string_to_sign = "eyAiZXhwaXJhdGlvbiI6ICIyMDEzLTA4LTA3VDEyOjAwOjAwLjAwMFoiLA0KICAiY29uZGl0aW9ucyI6IFsNCiAgICB7ImJ1Y2tldCI6ICJleGFtcGxlYnVja2V0In0sDQogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgInVzZXIvdXNlcjEvIl0sDQogICAgeyJhY2wiOiAicHVibGljLXJlYWQifSwNCiAgICB7InN1Y2Nlc3NfYWN0aW9uX3JlZGlyZWN0IjogImh0dHA6Ly9leGFtcGxlYnVja2V0LnMzLmFtYXpvbmF3cy5jb20vc3VjY2Vzc2Z1bF91cGxvYWQuaHRtbCJ9LA0KICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICJpbWFnZS8iXSwNCiAgICB7IngtYW16LW1ldGEtdXVpZCI6ICIxNDM2NTEyMzY1MTI3NCJ9LA0KICAgIFsic3RhcnRzLXdpdGgiLCAiJHgtYW16LW1ldGEtdGFnIiwgIiJdLA0KDQogICAgeyJ4LWFtei1jcmVkZW50aWFsIjogIkFLSUFJT1NGT0ROTjdFWEFNUExFLzIwMTMwODA2L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSwNCiAgICB7IngtYW16LWFsZ29yaXRobSI6ICJBV1M0LUhNQUMtU0hBMjU2In0sDQogICAgeyJ4LWFtei1kYXRlIjogIjIwMTMwODA2VDAwMDAwMFoiIH0NCiAgXQ0KfQ==";
expected_signature = "21496b44de44ccb73d545f1a995c68214c9cb0d41c45a17a5daeec0b1a6db047";
assert.equal(
  sign(
    "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "2013-08-06T12:00:00.000Z",
    "us-east-1",
    "s3",
    string_to_sign
  ),
  expected_signature,
  "Should match known good example"
);

// http://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
string_to_sign = "AWS4-HMAC-SHA256\n20110909T233600Z\n20110909/us-east-1/iam/aws4_request\n3511de7e95d28ecd39e9513b642aee07e54f4941150d8df8bf94b328ef7e55e2";
expected_signature = "ced6826de92d2bdeed8f846f0bf508e8559e98e4b0199114b84c54174deb456c";
assert.equal(
  sign(
    "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
    "2011-09-09T12:00:00.000Z",
    "us-east-1",
    "iam",
    string_to_sign
  ),
  expected_signature,
  "Should match known good example"
);
