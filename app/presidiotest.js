// MODULES - INCLUDES
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var rp = require('request-promise');

// FORM - DATA COLLECTION
// var cucmpub = '192.168.204.10';
// var cucmversion = '11.5';
// var username = 'ajp-axl-test';
// var password = 'wordpass@cucm';

var cucmpub = '10.37.252.20';
var cucmversion = '11.0';
var username = 'WebAdmin';
var password = '!CucmL@b!';

// JS - VARIABLE DEFINITION - GLOBAL
var authentication = username + ":" + password;
var cssx = null;
var partitionsx = null;
var trnaspatternsx = null;
var spacer = '-----';
var resultObject = null;

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

// TRANSPATTERNS - JS - VARIABLE DEFINITION
var transpatternsrmline1 = '';
var transpatternsrmline2 = '';
var transpatternsrmline3 = '';
var transpatternsrmline4 = '';
var transpatternsrmbottomup1 = '';

// TRANSPATTERNS - SOAP - AXL REQUEST
var transpatternsaxlrequest = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ns:listTransPattern sequence="?">' +
    '<searchCriteria>' +
    '<pattern>%</pattern>' +
    '</searchCriteria>' +
    '<returnedTags uuid="?">' +
    '<pattern>?</pattern>' +
    '<description>?</description>' +
    '<routePartitionName>?</routePartitionName>' +
    '</returnedTags>' +
    '</ns:listTransPattern>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>');

// TRANSPATTERNS - HTTP - REQUEST BUILD
var transpatternshttprequest = {
    method: 'POST',
    uri: 'https://' + cucmpub + ':8443/axl/',
    rejectUnauthorized: false,
    headers: {
        'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listTransPattern',
        'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
        'Content-Type': 'text/xml; charset=utf-8',
    },
    body: transpatternsaxlrequest,
};

// CHAINED REQUESTS + OUTPUT
// CHAIN 1 - CSS REQUEST
rp(csshttprequest)
    .then(function (resultcss) {
        var cssrmline1 = resultcss.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
        var cssrmline2 = cssrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
        var cssrmline3 = cssrmline2.replace(/<soapenv:Body>/g, '');
        var cssrmline4 = cssrmline3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
        var cssrmbottomup1 = cssrmline4.replace(/<\/soapenv:Envelope>/g, '');
        var cssrmbottomup2 = cssrmbottomup1.replace(/<\/soapenv:Body>/g, '');
        var cssxmlscrubbed = cssrmbottomup2.replace(/<\/ns:listCssResponse>/g, '');
        parser.parseString(cssxmlscrubbed, function (err, result) {
            var cssx = result['return']['css'];
            // console.log(cssx);

            // CHAIN 2 - PARTITIONS REQUEST
            return rp(partitionshttprequest)
                .then(function (resultpartitions) {
                    var partitionsrmline1 = resultpartitions.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                    var partitionsrmline2 = partitionsrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                    var partitionsrmline3 = partitionsrmline2.replace(/<soapenv:Body>/g, '');
                    var partitionsrmline4 = partitionsrmline3.replace(/<ns:listRoutePartitionResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                    var partitionsrmbottomup1 = partitionsrmline4.replace(/<\/soapenv:Envelope>/g, '');
                    var partitionsrmbottomup2 = partitionsrmbottomup1.replace(/<\/soapenv:Body>/g, '');
                    var partitionsxmlscrubbed = partitionsrmbottomup2.replace(/<\/ns:listRoutePartitionResponse>/g, '');
                    parser.parseString(partitionsxmlscrubbed, function (err, result) {
                        var partitionsx = result['return']['routePartition'];
                        // console.log(cssx);
                        // console.log(partitionsx);

                        // CHAIN 3 - TRANSPATTERNS REQUEST
                        return rp(transpatternshttprequest)
                            .then(function (resulttranspatterns) {
                                var transpatternsrmline1 = resulttranspatterns.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                                var transpatternsrmline2 = transpatternsrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                                var transpatternsrmline3 = transpatternsrmline2.replace(/<soapenv:Body>/g, '');
                                var transpatternsrmline4 = transpatternsrmline3.replace(/<ns:listTransPatternResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                                var transpatternsrmbottomup1 = transpatternsrmline4.replace(/<\/soapenv:Envelope>/g, '');
                                var transpatternsrmbottomup2 = transpatternsrmbottomup1.replace(/<\/soapenv:Body>/g, '');
                                var transpatternsrmspecial = transpatternsrmbottomup2.replace(/<\/ns:listTransPatternResponse>/g, '');
                                var transpatternsxmlscrubbed = transpatternsrmspecial.replace(/<routePartitionName\suuid="{........-....-....-....-............}">/g, '<routePartitionName>');
                                parser.parseString(transpatternsxmlscrubbed, function (err, result) {
                                    var transpatternsx = result['return']['transPattern'];
                                    // console.log(cssx);
                                    // console.log(partitionsx);
                                    console.log(transpatternsx);

                                    function search(nameKey, myArray){
                                        for (var i=0; i < myArray.length; i++) {
                                            if (myArray[i].routePartitionName === nameKey) {
                                                return myArray[i];
                                            }
                                        }
                                    }

                                    var resultObject = search("DNR_52_Gwinn_Site-PT", transpatternsx);
                                    console.log(spacer);
                                    console.log(resultObject);

                                    // PAGE - RENDER ALL RESULTS
                                    // res.render('cucmmapper-results.html', {
                                    //     title: 'CUCM Toolbox',
                                    //     cucmpub: cucmpub,
                                    //     css: cssx,
                                    //     partitions: partitionsx,
                                    //     transpatterns: transpatternsx,
                                    // })
                                });
                            })
                    });
                })
        });
    })
// });
// }