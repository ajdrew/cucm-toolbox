var array = [{
    name: "foo1",
    value: "val1"
}, {
    name: "foo1",
    value: ["val2", "val3"]
}, {
    name: "foo2",
    value: "val4"
}];

var transpatterns = [{
        pattern: ['9.19005554444'],
        description: ['Sample Outbound Call Block'],
        routePartitionName: ['Blocked']
    },
    {
        pattern: ['555555XXXX'],
        description: ['Inbound DID Range'],
        routePartitionName: ['AllPhones']
    },
    {
        pattern: ['3100'],
        description: ['Intercom Xlate'],
        routePartitionName: ['Intercom']
    },
    {
        pattern: ['3101'],
        description: ['Intercom Xlate'],
        routePartitionName: ['Intercom']
    }
];

var output = [];

transpatterns.forEach(function (value) {
    var existing = output.filter(function (v, i) {
        return v.routePartitionName == value.routePartitionName;
    });
    if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].value = output[existingIndex].value.concat(value.value);
    } else {
        if (typeof value.value == 'string')
            value.value = [value.value];
        output.push(value);
    }
});

console.dir(output);


// WORKING ORIGINAL

// var array = [{
//     name: "foo1",
//     value: "val1"
// }, {
//     name: "foo1",
//     value: ["val2", "val3"]
// }, {
//     name: "foo2",
//     value: "val4"
// }];

// var output = [];

// array.forEach(function (value) {
//     var existing = output.filter(function (v, i) {
//         return v.name == value.name;
//     });
//     if (existing.length) {
//         var existingIndex = output.indexOf(existing[0]);
//         output[existingIndex].value = output[existingIndex].value.concat(value.value);
//     } else {
//         if (typeof value.value == 'string')
//             value.value = [value.value];
//         output.push(value);
//     }
// });

// console.dir(output);