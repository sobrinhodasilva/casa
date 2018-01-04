var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//

var device = awsIot.device({
   keyPath: '../certs/esp8266_136837.private.key',
  certPath: '../certs/esp8266_136837.cert.pem',
    caPath: '../certs/root-CA.crt',
  clientId: 'AKIAIIHKPG5E3FY5C7WA',
      host: 'a3ih6jvb5f4mw.iot.us-west-2.amazonaws.com'
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('esp8266_136837/rpc');
    device.publish('esp8266_136837/rpc', JSON.stringify({ method:GPIO.Write, args:{pin:12, value:0}}) );
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
