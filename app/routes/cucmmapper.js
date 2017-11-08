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

        // JS - VARIABLE DEFINITION
        var authentication = username + ":" + password;
        var soapreplyx = '';
        var cssx = '';
        var spacer = '-----';
        var rmline1 = '';
        var rmline2 = '';
        var rmline3 = '';
        var rmline4 = '';
        var rmbottomup1 = '';
        var rmbottomup2 = '';
        var rmbottomup3 = '';

        // HTTP.REQUEST - BUILD CALL
        var https = require("https");
        var headers = {
            'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listCss',
            'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
            'Content-Type': 'text/xml; charset=utf-8'
        };

        // SOAP - AXL CALL
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

        // HTTP.REQUEST - OPTIONS
        var options = {
            host: cucmpub, // IP ADDRESS OF CUCM PUBLISHER
            port: 8443, // DEFAULT CISCO SSL PORT
            path: '/axl/', // AXL URL
            method: 'POST', // AXL REQUIREMENT OF POST
            headers: headers, // HEADER VAR
            rejectUnauthorized: false // REQUIRED TO ACCEPT SELF-SIGNED CERTS
        };

        // HTTP.REQUEST - Doesn't seem to need this line, but it might be useful anyway for pooling?
        options.agent = new https.Agent(options);

        // HTTP.REQUEST - OPEN SESSION
        let soapRequest = https.request(options, soapResponse => {
            soapResponse.setEncoding('utf8');
            soapResponse.on('data', chunk => {
                soapreplyx += chunk
            });
            // HTTP.REQUEST - RESULTS + RENDER
            soapResponse.on('end', () => {

                // EDIT - SCRUB TEST XML - WORKING
                // var line1 = xmloriginal.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
                // var line2 = line1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
                // var line3 = line2.replace(/<soapenv:Body>/g, '');
                // var line4 = line3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
                // // console.log(line4);
                // // console.log(spacer);
                // var lineend1 = line4.replace(/<\/soapenv:Envelope>/g, '');
                // var lineend2 = lineend1.replace(/<\/soapenv:Body>/g, '');
                // var lineend3 = lineend2.replace(/<\/ns:listCssResponse>/g, '');
                // console.log(lineend3);
                // console.log(spacer);

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
                    res.render('cucmmapper-results.html', {
                        title: 'CUCM Toolbox',
                        cucmpub: cucmpub,
                        cssx: cssx,
                        soapreply: soapreplyx,
                        xmlscrubbed: xmlscrubbed
                    });
                });

                // XML2JS - 1ST WORKING CODE !!!
                // parser.parseString(xmlworking, function (err, result) {
                //   var cssx = result['return']['css'];
                //   console.log(cssx);
                //   console.log(spacer);
                //   res.render('cucmmapper-results.html', {
                //     title: 'CUCM 2.1',
                //     soapreply: soapreplyx,
                //     cucmpub: cucmpub,
                //     cssx: cssx
                //   });
                // });
            });
        });

        // SOAP - SEND AXL CALL
        soapRequest.write(soapBody);
        soapRequest.end();
    });
}