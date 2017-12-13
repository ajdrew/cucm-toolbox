// DEFINE VARIABLES
var partitions = [{
        '$': {
            uuid: '{0F314A21-B066-B597-BCFA-6EC88CF8813B}'
        },
        partition: ['AllPhones']
    },
    {
        '$': {
            uuid: '{4DCF3A89-ADA1-2770-4154-F6E0204D9A71}'
        },
        partition: ['Unity_Connection']
    },
    {
        '$': {
            uuid: '{B653BC00-2D90-790C-AE0D-16C3DD2F8EDD}'
        },
        partition: ['LAB-Tansform-Calling']
    },
    {
        '$': {
            uuid: '{148C8971-87E4-49D3-1536-69B6C95293B3}'
        },
        partition: ['Blocked']
    },
    {
        '$': {
            uuid: '{25534E0F-F69A-FDDB-2FAD-34312BB6CEFC}'
        },
        partition: ['LAB-PSTN-Sim-911']
    },
    {
        '$': {
            uuid: '{EC1E144B-2C8C-22CC-F1F5-423CF0343367}'
        },
        partition: ['LAB-PSTN-Sim-Local']
    },
    {
        '$': {
            uuid: '{9C7F3223-AE2D-7605-C642-0CEAB81CD555}'
        },
        partition: ['LAB-PSTN-Sim-LD']
    },
    {
        '$': {
            uuid: '{15AFADC3-859B-2806-B9D1-5678CE035E3D}'
        },
        partition: ['LAB-PSTN-Sim-Intl']
    },
    {
        '$': {
            uuid: '{5DD43CF0-5FB0-A6A0-A71D-D284265F37C7}'
        },
        partition: ['Agents']
    },
    {
        '$': {
            uuid: '{7FDE7E11-F821-2491-BB08-E6A41DAB205D}'
        },
        partition: ['UCCX']
    },
    {
        '$': {
            uuid: '{17500618-9567-92B9-8C15-95D794094A3F}'
        },
        partition: ['Intercom']
    },
    {
        '$': {
            uuid: '{77049844-AB06-F899-26D0-C0940E20D4D5}'
        },
        partition: ['Netech_Managers']
    },
    {
        '$': {
            uuid: '{A9DD47E0-1C4A-AAB9-E859-E6EEDB26E6B0}'
        },
        partition: ['Assistant_Route_Point']
    }
];

var transpatterns = [{
        '$': {
            uuid: '{3FF82ECB-7364-41DB-176B-65D28885339F}'
        },
        pattern: ['9.19005554444'],
        description: ['Sample Outbound Call Block'],
        partition: ['Blocked']
    },
    {
        '$': {
            uuid: '{18C2C829-AFAE-DB28-A003-5F1731907D85}'
        },
        pattern: ['555555XXXX'],
        description: ['Inbound DID Range'],
        partition: ['AllPhones']
    },
    {
        '$': {
            uuid: '{465EFEF8-C405-8D30-2C97-4BF9907C92C6}'
        },
        pattern: ['3100'],
        description: ['Intercom Xlate'],
        partition: ['Intercom']
    },
    {
        '$': {
            uuid: '{C17E117C-41C7-D459-8CD1-B1D3C4EDC40D}'
        },
        pattern: ['3101'],
        description: ['Intercom Xlate'],
        partition: ['Intercom']
    }
];

lines = [{
        description: undefined,
        partition: [''],
        line: '1000:7100'
    },
    {
        description: undefined,
        partition: ['UCCX'],
        line: '7000:7001:7002:7003:7004:7005:7006:7007:7008:7009:7010:7011:7012:7013:7014:7015:7016:7017:7018:7019:7020:7021:7022:7023:7024:7025:7026:7027:7028:7029:7030:7031:7032:7033:7034:7035:7036:7037:7038:7039:7040:7041:7042:7043: 7044: 7045: 7046: 7047: 7048: 7049: 7050: 7051: 7052: 7053: 7054: 7055: 7056: 7057: 7058: 7059: 7060: 7061: 7062: 7063: 7064: 7065: 7066: 7067: 7068: 7069: 7070: 7071: 7072: 7073: 7074: 7075: 7076: 7077: 7078: 7079: 7080: 7081: 7082: 7083: 7084: 7085: 7086: 7087: 7088: 7089: 7090: 7091: 7092: 7093: 7094: 7095: 7096: 7097: 7098: 7099: 7900 '
    }, {
        description: undefined,
        partition: ['AllPhones'],
        line: '1001:1002:1003:1004:12345:2040:12346:2000:2001:2002:2003:2050:1010:2004:2005:2006:2016:1234'
    },
    {
        description: undefined,
        partition: ['Agents'],
        line: '7906:7905'
    },
    {
        '$': {
            uuid: '{7812FC0F-E5E7-33EF-4BA0-09D175B00DDC}'
        },
        shareLineAppearanceCssName: [
            [Object]
        ],
        partition: ['Assistant_Route_Point'],
        line: ['4XXX']
    },
    {
        description: undefined,
        partition: ['Generated_Everyone'],
        line: '2006:2010'
    },
    {
        description: undefined,
        partition: ['Intercom'],
        line: '3000:3001'
    },
    {
        '$': {
            uuid: '{087168D9-8982-2C39-EDCF-BAC9F95C6CB0}'
        },
        shareLineAppearanceCssName: [
            [Object]
        ],
        partition: ['Generated_MA_Intercom'],
        line: ['3002']
    }
];

var hash = {};

// FUNCTION - COMBINE ITEMS WITHIN OBJECT - WITH SAME KEY:partition
function combine(arr) {
    var combined = arr.reduce(function (result, item) {
        var current = result[item.partition];

        result[item.partition] = !current ? item : {
            pattern: current.pattern + ':' + item.pattern,
            description: item.description,
            partition: item.partition
        };

        return result;
    }, {});

    return Object.keys(combined).map(function (key) {
        return combined[key];
    });
};

// FUNCTION - COMBINE ITEMS WITHIN OBJECT - RUN
var result = combine(transpatterns);
console.log(result);
console.log("-----");

function classify(e) {
    if (hash[e.partition]) {
        Object.keys(e).forEach(function (c) {
            hash[e.partition][c] = e[c];
        });
    } else {
        hash[e.partition] = e;
    }
}

// FUNCTION - COMBINE OBJECTS - ADD VARS to HASH
partitions.forEach(classify);
result.forEach(classify);
lines.forEach(classify);

// FUNCTION - COMBINE OBJECTS - ITERATE HASH + REMOVE ANY FIELDS
var combo = Object.keys(hash).map(function (e) {
    delete hash[e]['routePartitionName'];
    delete hash[e]['$'];
    delete hash[e]['description'];
    delete hash[e]['shareLineAppearanceCssName'];
    return hash[e];
});

console.log(combo);
console.log("-----");

// obj3 = Object.assign({},partitions, transpatterns);
// console.log(obj3);


// let arr3 = [];
// partitions.forEach((itm, i) => {
//   arr3.push(Object.assign({}, itm, result[i]));
// });
// console.log(arr3);


// 
// TESTING
//
// arr1 = [{
//     key: 'A',
//     items: [{
//         name: 'a item'
//     }]
// }, {
//     key: 'B',
//     items: [{
//         name: 'b item'
//     }]
// }];

// arr2 = [{
//     key: 'B',
//     items: [{
//         name: 'another b item'
//     }, {
//         name: 'more b items'
//     }, {
//         name: 'even more b items'
//     }]
// }];

// console.log(arr1.concat(arr2).reduce((function (hash) {
//     return function (array, obj) {
//         if (!hash[obj.key])
//             array.push(hash[obj.key] = obj);
//         else
//             hash[obj.key].items.push(...obj.items);
//         return array;
//     };
// })({}), []));