var obj1 = [{
    fruit: 'watermelon',
    sweetness: 3
}, {
    fruit: 'banana',
    sweetness: 4
}, {
    fruit: 'apple',
    sweetness: 5
}];

var obj2 = [{
    fruit_name: 'apple',
    color: 'red'
}, {
    fruit_name: 'banana',
    color: 'yellow'
}, {
    fruit_name: 'watermelon',
    color: 'green'
}];

var obj4 = [{
    fruit_name: 'apple',
    color: 'red'
}, {
    fruit_name: 'banana',
    color: 'yellow'
}, {
    fruit_name: 'watermelon',
    color: 'green'
}, {
    fruit_name: 'apple',
    color: 'green'
}];

var hash = {};

var partitions = [{
        '$': {
            uuid: '{0F314A21-B066-B597-BCFA-6EC88CF8813B}'
        },
        name: ['AllPhones']
    },
    {
        '$': {
            uuid: '{4DCF3A89-ADA1-2770-4154-F6E0204D9A71}'
        },
        name: ['Unity_Connection']
    },
    {
        '$': {
            uuid: '{B653BC00-2D90-790C-AE0D-16C3DD2F8EDD}'
        },
        name: ['LAB-Tansform-Calling']
    },
    {
        '$': {
            uuid: '{148C8971-87E4-49D3-1536-69B6C95293B3}'
        },
        name: ['Blocked']
    },
    {
        '$': {
            uuid: '{25534E0F-F69A-FDDB-2FAD-34312BB6CEFC}'
        },
        name: ['LAB-PSTN-Sim-911']
    },
    {
        '$': {
            uuid: '{EC1E144B-2C8C-22CC-F1F5-423CF0343367}'
        },
        name: ['LAB-PSTN-Sim-Local']
    },
    {
        '$': {
            uuid: '{9C7F3223-AE2D-7605-C642-0CEAB81CD555}'
        },
        name: ['LAB-PSTN-Sim-LD']
    },
    {
        '$': {
            uuid: '{15AFADC3-859B-2806-B9D1-5678CE035E3D}'
        },
        name: ['LAB-PSTN-Sim-Intl']
    },
    {
        '$': {
            uuid: '{5DD43CF0-5FB0-A6A0-A71D-D284265F37C7}'
        },
        name: ['Agents']
    },
    {
        '$': {
            uuid: '{7FDE7E11-F821-2491-BB08-E6A41DAB205D}'
        },
        name: ['UCCX']
    },
    {
        '$': {
            uuid: '{17500618-9567-92B9-8C15-95D794094A3F}'
        },
        name: ['Intercom']
    },
    {
        '$': {
            uuid: '{77049844-AB06-F899-26D0-C0940E20D4D5}'
        },
        name: ['Netech_Managers']
    },
    {
        '$': {
            uuid: '{A9DD47E0-1C4A-AAB9-E859-E6EEDB26E6B0}'
        },
        name: ['Assistant_Route_Point']
    }
];

var transpatterns = [{
        '$': {
            uuid: '{3FF82ECB-7364-41DB-176B-65D28885339F}'
        },
        pattern: ['9.19005554444'],
        description: ['Sample Outbound Call Block'],
        routePartitionName: ['Blocked']
    },
    {
        '$': {
            uuid: '{18C2C829-AFAE-DB28-A003-5F1731907D85}'
        },
        pattern: ['555555XXXX'],
        description: ['Inbound DID Range'],
        routePartitionName: ['AllPhones']
    },
    {
        '$': {
            uuid: '{465EFEF8-C405-8D30-2C97-4BF9907C92C6}'
        },
        pattern: ['3100'],
        description: ['Intercom Xlate'],
        routePartitionName: ['Intercom']
    },
    {
        '$': {
            uuid: '{C17E117C-41C7-D459-8CD1-B1D3C4EDC40D}'
        },
        pattern: ['3101'],
        description: ['Intercom Xlate'],
        routePartitionName: ['Intercom']
    }
];


// TESTING NEW
// COMBINE OBJECTS - CREATE HASH
function classify(e) {
    if (hash[e.name] || hash[e.routePartitionName]) {
        Object.keys(e).forEach(function (c) {
            hash[e.name || e.routePartitionName][c] = e[c];
        });
    } else {
        hash[e.routePartitionName || e.name] = e;
    }
}

// COMBINE OBJECTS - ADD VARS to HASH
partitions.forEach(classify);
transpatterns.forEach(classify);

// COMBINE OBJECTS - ITERATE HASH + REMOVE ANY FIELDS
var combo = Object.keys(hash).map(function (e) {
    delete hash[e]['routePartitionName'];
    return hash[e];
});

console.log(combo);
console.log("-----");

// WORKING ORIGINAL
// function to create a hashtable
function classify(e) {
    if (hash[e.fruit] || hash[e.fruit_name]) {
        Object.keys(e).forEach(function (c) {
            hash[e.fruit || e.fruit_name][c] = e[c];
        });
    } else {
        hash[e.fruit_name || e.fruit] = e;
    }
}

// add to hash
obj1.forEach(classify);
obj4.forEach(classify);

// extract the result
var obj3 = Object.keys(hash).map(function (e) {
    delete hash[e]['fruit'];
    return hash[e];
});

console.log(obj3);