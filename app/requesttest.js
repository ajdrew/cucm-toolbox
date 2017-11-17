// MODULES - INCLUDES
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var rp = require('request-promise');

// FORM - DATA COLLECTION
var cucmpub = '10.37.252.20';
var cucmversion = '11.0';
var username = 'WebAdmin';
var password = '!CucmL@b!';

// JS - VARIABLE DEFINITION - GLOBAL
var authentication = username + ":" + password;
var cssx = null;
var partitionsx = null;
var spacer = '-----';

//
// -- BLOCK - CSS AXL CALL --
//

// CSS - JS - VARIABLE DEFINITION
var cssrmline1 = '';
var cssrmline2 = '';
var cssrmline3 = '';
var cssrmline4 = '';
var cssrmbottomup1 = '';
var cssrmbottomup2 = '';

// CSS - SOAP - AXL REQUEST
var cssaxlrequest = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ns:listCss sequence="?">' +
    '<searchCriteria>' +
    '<name>%</name>' +
    '</searchCriteria>' +
    '<returnedTags uuid="?">' +
    '<name>?</name>' +
    '<description>?</description>' +
    '<clause>?</clause>' +
    '</returnedTags>' +
    '</ns:listCss>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>');

// CSS - HTTP - REQUEST BUILD
var csshttprequest = {
    method: 'POST',
    uri: 'https://' + cucmpub + ':8443/axl/',
    rejectUnauthorized: false,
    headers: {
        'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listCss',
        'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
        'Content-Type': 'text/xml; charset=utf-8',
    },
    body: cssaxlrequest,
};

// CSS - HTTP - REQUEST
rp(csshttprequest)
    .then(function (body) {
        var cssrmline1 = body.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
        var cssrmline2 = cssrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
        var cssrmline3 = cssrmline2.replace(/<soapenv:Body>/g, '');
        var cssrmline4 = cssrmline3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
        var cssrmbottomup1 = cssrmline4.replace(/<\/soapenv:Envelope>/g, '');
        var cssrmbottomup2 = cssrmbottomup1.replace(/<\/soapenv:Body>/g, '');
        var cssxmlscrubbed = cssrmbottomup2.replace(/<\/ns:listCssResponse>/g, '');
        parser.parseString(cssxmlscrubbed, function (err, result) {
            var cssx = result['return']['css'];
            // console.log(cssx);
            // console.log(spacer);
            
        });
    })
    .catch(function (err) {
        console.log(err);
    });

//
// -- BLOCK - PARTITIONS AXL CALL
//

// PARTITIONS - JS - VARIABLE DEFINITION
var partitionsrmline1 = '';
var partitionsrmline2 = '';
var partitionsrmline3 = '';
var partitionsrmline4 = '';
var partitionsrmbottomup1 = '';

// PARTITIONS - SOAP - AXL REQUEST
var partitionsaxlrequest = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ns:listRoutePartition sequence="?">' +
    '<searchCriteria>' +
    '<name>%</name>' +
    '</searchCriteria>' +
    '<returnedTags uuid="?">' +
    '<name>?</name>' +
    '</returnedTags>' +
    '</ns:listRoutePartition>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>');

// PARTITIONS - HTTP - REQUEST BUILD
var partitionshttprequest = {
    method: 'POST',
    uri: 'https://' + cucmpub + ':8443/axl/',
    rejectUnauthorized: false,
    headers: {
        'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listRoutePartition',
        'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
        'Content-Type': 'text/xml; charset=utf-8',
    },
    body: partitionsaxlrequest,
};

// PARTITIONS - HTTP - REQUEST
rp(partitionshttprequest)
    .then(function (body) {
        var partitionsrmline1 = body.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
        var partitionsrmline2 = partitionsrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
        var partitionsrmline3 = partitionsrmline2.replace(/<soapenv:Body>/g, '');
        var partitionsrmline4 = partitionsrmline3.replace(/<ns:listRoutePartitionResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
        var partitionsrmbottomup1 = partitionsrmline4.replace(/<\/soapenv:Envelope>/g, '');
        var partitionsrmbottomup2 = partitionsrmbottomup1.replace(/<\/soapenv:Body>/g, '');
        var partitionsxmlscrubbed = partitionsrmbottomup2.replace(/<\/ns:listRoutePartitionResponse>/g, '');
        parser.parseString(partitionsxmlscrubbed, function (err, result) {
            var partitionsx = result['return']['routePartition'];
            // console.log(partitionsx);
            // console.log(spacer);
        });
    })
    .catch(function (err) {
        console.log(err);
    });

// PAGE - RENDER
// console.log(csss);
console.log(cssx);
console.log(partitionsx);