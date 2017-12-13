// MODULES - INCLUDES
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var rp = require('request-promise');

// FORM - DATA COLLECTION
var cucmpub = '192.168.204.10';
var cucmversion = '11.5';
var username = 'ajp-axl-test';
var password = 'wordpass@cucm2';

// JS - VARIABLE DEFINITION - GLOBAL
var authentication = username + ":" + password;
var cssx = null;
var partitionsx = null;
var trnaspatternsx = null;
var spacer = '-----';
var resultObject = null;
var hashpartitions = {};
var hashcss = {};
var i;

// FUCTION - COMBINE ITEMS WITHIN OBJECT: transpatternsx and routepatterns - WITH SAME KEY: routePartitionName
function combine(arr) {
    var combined = arr.reduce(function (result, item) {
        var current = result[item.routePartitionName];

        result[item.routePartitionName] = !current ? item : {
            pattern: current.pattern + ':' + item.pattern,
            description: item.description,
            routePartitionName: item.routePartitionName
        };

        return result;
    }, {});

    return Object.keys(combined).map(function (key) {
        return combined[key];
    });
};

// FUNCTION - COMBINE OBJECTS WITH KEY:partition - CREATE HASH
function classifypartition(e) {
    if (hashpartitions[e.partition]) {
        Object.keys(e).forEach(function (c) {
            hashpartitions[e.partition][c] = e[c];
        });
    } else {
        hashpartitions[e.partition] = e;
    }
}

// FUNCTION - COMBINE OBJECTS WITH KEY:css - CREATE HASH
function classifycss(e) {
    if (hashcss[e.css]) {
        Object.keys(e).forEach(function (c) {
            hashcss[e.css][c] = e[c];
        });
    } else {
        hashcss[e.css] = e;
    }
}

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

// ROUTEPATTERNS - SOAP - AXL REQUEST
var routepatternsaxlrequest = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ns:listRoutePattern sequence="?">' +
    '<searchCriteria>' +
    '<pattern>%</pattern>' +
    '</searchCriteria>' +
    '<returnedTags uuid="?">' +
    '<pattern>?</pattern>' +
    '<routePartitionName>?</routePartitionName>' +
    '</returnedTags>' +
    '</ns:listRoutePattern>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>');

// ROUTEPATTERNS - HTTP - REQUEST BUILD
var routepatternshttprequest = {
    method: 'POST',
    uri: 'https://' + cucmpub + ':8443/axl/',
    rejectUnauthorized: false,
    headers: {
        'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listRoutePattern',
        'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
        'Content-Type': 'text/xml; charset=utf-8',
    },
    body: routepatternsaxlrequest,
};

// LINES - SOAP - AXL REQUEST
var linesaxlrequest = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ns:listLine sequence="?">' +
    '<searchCriteria>' +
    '<pattern>%</pattern>' +
    '</searchCriteria>' +
    '<returnedTags uuid="?">' +
    '<pattern>?</pattern>' +
    '<routePartitionName>?</routePartitionName>' +
    '<shareLineAppearanceCssName>?</shareLineAppearanceCssName>' +
    '</returnedTags>' +
    '</ns:listLine>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>');

// LINES - HTTP - REQUEST BUILD
var linesshttprequest = {
    method: 'POST',
    uri: 'https://' + cucmpub + ':8443/axl/',
    rejectUnauthorized: false,
    headers: {
        'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listLine',
        'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
        'Content-Type': 'text/xml; charset=utf-8',
    },
    body: linesaxlrequest,
};

// CHAINED REQUESTS + OUTPUT
// CHAIN 1 - CSS REQUEST
rp(csshttprequest)
    .then(function (resultcss) {
        // SCRUB XML FOR PARSER TO PROCESS INTO JS OBJECT
        var cssrmline1 = resultcss.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
        var cssrmline2 = cssrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
        var cssrmline3 = cssrmline2.replace(/<soapenv:Body>/g, '');
        var cssrmline4 = cssrmline3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
        var cssrmbottomup1 = cssrmline4.replace(/<\/soapenv:Envelope>/g, '');
        var cssrmbottomup2 = cssrmbottomup1.replace(/<\/soapenv:Body>/g, '');
        var cssxmlscrubbed = cssrmbottomup2.replace(/<\/ns:listCssResponse>/g, '');
        // PARSE FROM XML STRING TO JS OBJECT
        parser.parseString(cssxmlscrubbed, function (err, result) {
            var cssx = result['return']['css'];
            // MODIFY OBJECTS
            for (i = 0; i < cssx.length; i++) {
                cssx[i].css = cssx[i]['name'];
                delete cssx[i].name;
            }
            for (i = 0; i < cssx.length; i++) {
                cssx[i].partitions = cssx[i]['clause'];
                delete cssx[i].clause;
            }
            // console.log(cssx);
            // console.log(spacer);


            // CHAIN 2 - PARTITIONS REQUEST
            return rp(partitionshttprequest)
                .then(function (resultpartitions) {
                    // SCRUB XML FOR PARSER TO PROCESS INTO JS OBJECT
                    var partitionsrmline1 = resultpartitions.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                    var partitionsrmline2 = partitionsrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                    var partitionsrmline3 = partitionsrmline2.replace(/<soapenv:Body>/g, '');
                    var partitionsrmline4 = partitionsrmline3.replace(/<ns:listRoutePartitionResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                    var partitionsrmbottomup1 = partitionsrmline4.replace(/<\/soapenv:Envelope>/g, '');
                    var partitionsrmbottomup2 = partitionsrmbottomup1.replace(/<\/soapenv:Body>/g, '');
                    var partitionsxmlscrubbed = partitionsrmbottomup2.replace(/<\/ns:listRoutePartitionResponse>/g, '');
                    // PARSE FROM XML STRING TO JS OBJECT
                    parser.parseString(partitionsxmlscrubbed, function (err, result) {
                        var partitionsx = result['return']['routePartition'];
                        // MODIFY OBJECTS
                        for (i = 0; i < partitionsx.length; i++) {
                            partitionsx[i].partition = partitionsx[i]['name'];
                            delete partitionsx[i].name;
                        }
                        // END RESULT VAR
                        // console.log(partitionsx);
                        // console.log(spacer);


                        // CHAIN 3 - TRANSPATTERNS REQUEST
                        return rp(transpatternshttprequest)
                            .then(function (resulttranspatterns) {
                                // SCRUB XML FOR PARSER TO PROCESS INTO JS OBJECT
                                var transpatternsrmline1 = resulttranspatterns.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                                var transpatternsrmline2 = transpatternsrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                                var transpatternsrmline3 = transpatternsrmline2.replace(/<soapenv:Body>/g, '');
                                var transpatternsrmline4 = transpatternsrmline3.replace(/<ns:listTransPatternResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                                var transpatternsrmbottomup1 = transpatternsrmline4.replace(/<\/soapenv:Envelope>/g, '');
                                var transpatternsrmbottomup2 = transpatternsrmbottomup1.replace(/<\/soapenv:Body>/g, '');
                                var transpatternsrmspecial = transpatternsrmbottomup2.replace(/<\/ns:listTransPatternResponse>/g, '');
                                var transpatternsxmlscrubbed = transpatternsrmspecial.replace(/<routePartitionName\suuid="{........-....-....-....-............}">/g, '<routePartitionName>');
                                // PARSE FROM XML STRING TO JS OBJECT
                                parser.parseString(transpatternsxmlscrubbed, function (err, result) {
                                    var transpatternsx = result['return']['transPattern'];
                                    // COMBINE ITEMS WITHIN OBJECT
                                    var transpatternsxreduced = combine(transpatternsx);
                                    // MODIFY OBJECTS
                                    for (i = 0; i < transpatternsxreduced.length; i++) {
                                        transpatternsxreduced[i].partition = transpatternsxreduced[i]['routePartitionName'];
                                        delete transpatternsxreduced[i].routePartitionName;
                                    }
                                    for (i = 0; i < transpatternsxreduced.length; i++) {
                                        transpatternsxreduced[i].translationpattern = transpatternsxreduced[i]['pattern'];
                                        delete transpatternsxreduced[i].pattern;
                                    }
                                    // END RESULT VAR
                                    // console.log(transpatternsxreduced);
                                    // console.log(spacer);

                                    // CHAIN 4 - ROUTEPATTERNS REQUEST
                                    return rp(routepatternshttprequest)
                                        .then(function (resultroutepatterns) {
                                            // SCRUB XML FOR PARSER TO PROCESS INTO JS OBJECT
                                            var routepatternsrmline1 = resultroutepatterns.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                                            var routepatternsrmline2 = routepatternsrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                                            var routepatternsrmline3 = routepatternsrmline2.replace(/<soapenv:Body>/g, '');
                                            var routepatternsrmline4 = routepatternsrmline3.replace(/<ns:listRoutePatternResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                                            var routepatternsrmbottomup1 = routepatternsrmline4.replace(/<\/soapenv:Envelope>/g, '');
                                            var routepatternsrmbottomup2 = routepatternsrmbottomup1.replace(/<\/soapenv:Body>/g, '');
                                            var routepatternsrmspecial = routepatternsrmbottomup2.replace(/<\/ns:listRoutePatternResponse>/g, '');
                                            var routepatternsxmlscrubbed = routepatternsrmspecial.replace(/<routePartitionName\suuid="{........-....-....-....-............}">/g, '<routePartitionName>');
                                            // PARSE FROM XML STRING TO JS OBJECT
                                            parser.parseString(routepatternsxmlscrubbed, function (err, result) {
                                                var routepatternsx = result['return']['routePattern'];
                                                // FUNCTION - COMBINE ITEMS WITHIN OBJECT - RUN
                                                var routepatternsxreduced = combine(routepatternsx);
                                                // MODIFY OBJECTS
                                                for (i = 0; i < routepatternsxreduced.length; i++) {
                                                    routepatternsxreduced[i].partition = routepatternsxreduced[i]['routePartitionName'];
                                                    delete routepatternsxreduced[i].routePartitionName;
                                                }
                                                for (i = 0; i < routepatternsxreduced.length; i++) {
                                                    routepatternsxreduced[i].routepattern = routepatternsxreduced[i]['pattern'];
                                                    delete routepatternsxreduced[i].pattern;
                                                }
                                                // END RESULT VAR
                                                // console.log(routepatternsxreduced);
                                                // console.log(spacer);

                                                // CHAIN 5 - LINE REQUEST
                                                return rp(linesshttprequest)
                                                    .then(function (resultlines) {
                                                        // SCRUB XML FOR PARSER TO PROCESS INTO JS OBJECT
                                                        var linesrmline1 = resultlines.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                                                        var linesrmline2 = linesrmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                                                        var linesrmline3 = linesrmline2.replace(/<soapenv:Body>/g, '');
                                                        var linesrmline4 = linesrmline3.replace(/<ns:listLineResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                                                        var linesrmbottomup1 = linesrmline4.replace(/<\/soapenv:Envelope>/g, '');
                                                        var linesrmbottomup2 = linesrmbottomup1.replace(/<\/soapenv:Body>/g, '');
                                                        var linesrmspecial = linesrmbottomup2.replace(/<\/ns:listLineResponse>/g, '');
                                                        var linesxmlscrubbed = linesrmspecial.replace(/<routePartitionName\suuid="{........-....-....-....-............}">/g, '<routePartitionName>');
                                                        // PARSE FROM XML STRING TO JS OBJECT
                                                        parser.parseString(linesxmlscrubbed, function (err, result) {
                                                            var linesx = result['return']['line'];
                                                            // FUNCTION - COMBINE ITEMS WITHIN OBJECT - RUN
                                                            var linesxreduced = combine(linesx);
                                                            // MODIFY OBJECTS
                                                            for (i = 0; i < linesxreduced.length; i++) {
                                                                linesxreduced[i].partition = linesxreduced[i]['routePartitionName'];
                                                                delete linesxreduced[i].routePartitionName;
                                                            }
                                                            for (i = 0; i < linesxreduced.length; i++) {
                                                                linesxreduced[i].line = linesxreduced[i]['pattern'];
                                                                delete linesxreduced[i].pattern;
                                                            }
                                                            // END RESULT VAR
                                                            // console.log(linesxreduced);
                                                            // console.log(spacer);


                                                            // END CHAIN - RESULTS - PARTITIONSTABLE
                                                            // COMBINE OBJECTS - ADD VARS to HASH
                                                            partitionsx.forEach(classifypartition);
                                                            transpatternsxreduced.forEach(classifypartition);
                                                            routepatternsxreduced.forEach(classifypartition);
                                                            linesxreduced.forEach(classifypartition);
                                                            // COMBINE OBJECTS - ITERATE HASH + REMOVE ANY FIELDS
                                                            var partitionstable = Object.keys(hashpartitions).map(function (e) {
                                                                delete hashpartitions[e]['$'];
                                                                delete hashpartitions[e]['description'];
                                                                delete hashpartitions[e]['shareLineAppearanceCssName'];
                                                                return hashpartitions[e];
                                                            });
                                                            // FINAL ANSWER
                                                            console.log(partitionstable);
                                                            console.log(spacer);


                                                            // END CHAIN - RESULTS - CSSTABLE
                                                            // COMBINE OBJECTS - ADD VARS to HASH
                                                            cssx.forEach(classifycss);
                                                            // COMBINE OBJECTS - ITERATE HASH + REMOVE ANY FIELDS
                                                            var csstable = Object.keys(hashcss).map(function (e) {
                                                                delete hashcss[e]['$'];
                                                                delete hashcss[e]['description'];
                                                                return hashcss[e];
                                                            });
                                                            // FINAL ANSWER
                                                            console.log(csstable);
                                                            console.log(spacer);








                                                            // PAGE - RENDER ALL RESULTS
                                                            // res.render('cucmmapper-results.html', {
                                                            //     title: 'CUCM Toolbox',
                                                            //     cucmpub: cucmpub,
                                                            //     partitionstable: partitionstable,
                                                            //     csstable: csstable,
                                                            // })
                                                        });
                                                    })
                                            });
                                        })
                                });
                            })
                    });
                })
        });
    })
// });
// }