module.exports = function (app) {

    // MODULES - INCLUDES
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();

    // FORM - SUBMIT - CUCMMAPPER
    app.post('/cucmmapper/submit', function (req, res) {

        // FORM - DATA COLLECTION
        var cucmpub = req.body.cucmpub;
        var cucmversion = req.body.cucmversion;
        var username = req.body.username;
        var password = req.body.password;

        // JS - VARIABLE DEFINITION - GLOBAL
        var authentication = username + ":" + password;
        var soapreplyx = '';
        var cssx = null;
        var spacer = '-----';
        var rmline1 = '';
        var rmline2 = '';
        var rmline3 = '';
        var rmline4 = '';
        var rmbottomup1 = '';
        var rmbottomup2 = '';
        var rmbottomup3 = '';
        var soapreplyp = '';
        var partitionsx = null;
        var rmline1p = '';
        var rmline2p = '';
        var rmline3p = '';
        var rmline4p = '';
        var rmbottomup1p = '';
        var rmbottomup2p = '';
        var rmbottomup3p = '';

        // HTTP.REQUEST - BUILD CALL - GLOBAL
        var https = require("https");
        var headers = {
            'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listCss',
            'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
            'Content-Type': 'text/xml; charset=utf-8'
        };

        // SOAP - AXL CALL - CSS
        var soapBody = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
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

        // SOAP - AXL CALL - PARTITIONS
        var soapBody2 = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
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

        // HTTP.REQUEST - OPTIONS - GLOBAL
        var options = {
            host: cucmpub, // IP ADDRESS OF CUCM PUBLISHER
            port: 8443, // DEFAULT CISCO SSL PORT
            path: '/axl/', // AXL URL
            method: 'POST', // AXL REQUIREMENT OF POST
            headers: headers, // HEADER VAR
            rejectUnauthorized: false // REQUIRED TO ACCEPT SELF-SIGNED CERTS
        };

        // HTTP.REQUEST - GLOBAL (Doesn't seem to need this line, but it might be useful anyway for pooling?)
        options.agent = new https.Agent(options);

        // HTTP.REQUEST - OPEN SESSION - CSS
        var soapRequest = https.request(options, soapResponse => {
            soapResponse.setEncoding('utf8');
            soapResponse.on('data', chunk => {
                soapreplyx += chunk
            });
            // HTTP.REQUEST - RESULTS + RENDER
            soapResponse.on('end', () => {

                // EDIT - SCRUB XML OUTPUT
                var rmline1 = soapreplyx.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                var rmline2 = rmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                var rmline3 = rmline2.replace(/<soapenv:Body>/g, '');
                var rmline4 = rmline3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                var rmbottomup1 = rmline4.replace(/<\/soapenv:Envelope>/g, '');
                var rmbottomup2 = rmbottomup1.replace(/<\/soapenv:Body>/g, '');
                var xmlscrubbed = rmbottomup2.replace(/<\/ns:listCssResponse>/g, '');
                // console.log(xmlscrubbed);
                // console.log(spacer);

                // XML2JS - TESTING
                parser.parseString(xmlscrubbed, function (err, result) {
                    var cssx = result['return']['css'];
                    //   console.log(cssx);
                    //   console.log(spacer);
                    complete();
                });
            });
        });

        // SOAP - SEND AXL CALL - CSS
        soapRequest.write(soapBody);
        soapRequest.end();

        // SOAP - SEND AXL CALL - PARTITIONS
        var soapRequest2 = https.request(options, soapResponse2 => {
            soapResponse2.setEncoding('utf8');
            soapResponse2.on('data', chunk => {
                soapreplyp += chunk
            });
            // HTTP.REQUEST - RESULTS + RENDER
            soapResponse2.on('end', () => {
                console.log(soapreplyp);

                // EDIT - SCRUB XML OUTPUT
                var rmline1p = soapreplyp.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                var rmline2p = rmline1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                var rmline3p = rmline2.replace(/<soapenv:Body>/g, '');
                var rmline4p = rmline3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                var rmbottomup1p = rmline4.replace(/<\/soapenv:Envelope>/g, '');
                var rmbottomup2p = rmbottomup1.replace(/<\/soapenv:Body>/g, '');
                var xmlscrubbedp = rmbottomup2.replace(/<\/ns:listCssResponse>/g, '');
                console.log(xmlscrubbedp);
                console.log(spacer);

                // XML2JS - TESTING
                parser.parseString(xmlscrubbedp, function (err, result) {
                    var partitionsx = result['return']['css'];
                    //   console.log(partitionsx);
                    //   console.log(spacer);
                    complete();
                });
            });
        });
        // SOAP - SEND AXL CALL - PARTITIONS
        soapRequest2.write(soapBody2);
        soapRequest2.end();

        // PAGE - RENDER
        function complete() {
            if (cssx !== null && partitionsx !== null) {
                res.render('cucmmapper-results.html', {
                    title: 'CUCM Toolbox',
                    cucmpub: cucmpub,
                    cssx: cssx,
                    partitionsx: partitionsx,
                })
            } else {
                res.render('cucmerror.html', {
                    title: 'CUCM Toolbox',
                })
            }
        };
    });
}