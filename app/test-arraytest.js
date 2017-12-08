let arr1 = [{
        route: 'x1'
    },
    {
        route: 'x2'
    },
    {
        route: 'x3'
    },
    {
        route: 'x4'
    },
    {
        route: 'x5'
    }
]


let arr2 = [{
        pattern: 'y1',
        route: 'x1'
    },
    {
        pattern: 'y2',
        route: 'x1'
    },
    {
        pattern: 'y3',
        route: 'x2'
    },
    {
        pattern: 'y4',
        route: 'x2'
    },
    {
        pattern: 'y5',
        route: 'x3'
    },
    {
        pattern: 'y6',
        route: 'x3'
    },
    {
        pattern: 'y7',
        route: 'x4'
    },
    {
        pattern: 'y8',
        route: 'x4'
    },
    {
        pattern: 'y9',
        route: 'x5'
    },
    {
        pattern: 'y10',
        route: 'x5'
    }
]

let pts = [
    {
        routePartitionName: 'AllPhones'
    },
    {
        routePartitionName: 'Unity_Connection'
    },
    {
        routePartitionName: 'LAB-Tansform-Calling'
    },
    {
        routePartitionName: 'Blocked'
    },
    {
        routePartitionName: 'LAB-PSTN-Sim-911'
    },
    {
        routePartitionName: 'LAB-PSTN-Sim-Local'
    },
    {
        routePartitionName: 'LAB-PSTN-Sim-LD'
    },
    {
        routePartitionName: 'LAB-PSTN-Sim-Intl'
    },
    {
        routePartitionName: 'Agents'
    },
    {
        routePartitionName: 'UCCX'
    },
    {
        routePartitionName: 'Intercom'
    }
]

let trans = [{
        pattern: '9.19005554444',
        description: 'Sample Outbound Call Block',
        routePartitionName: 'Blocked'
    },
    {
        pattern: '555555XXXX',
        description: 'Inbound DID Range',
        routePartitionName: 'AllPhones'
    },
    {
        pattern: '3100',
        description: 'Intercom Xlate',
        routePartitionName: 'Intercom'
    },
    {
        pattern: '3101',
        description: 'Intercom Xlate',
        routePartitionName: 'Intercom'
    }
]



// var array1 = [{ route: 'x1' }, { route: 'x2' }, { route: 'x3' }, { route: 'x4' }, { route: 'x5' }],
// array2 = [{ pattern: 'y1', route: 'x1' }, { pattern: 'y2', route: 'x1' }, { pattern: 'y3', route: 'x2' }, { pattern: 'y4', route: 'x2' }, { pattern: 'y5', route: 'x3' }, { pattern: 'y6', route: 'x3' }, { pattern: 'y7', route: 'x4' }, { pattern: 'y8', route: 'x4' }, { pattern: 'y9', route: 'x5' }, { pattern: 'y10', route: 'x5' }],
// routes = new Map,
//     result = pts.map(o => (routes.set(o.routePartitionName, {}), Object.assign(routes.get(o.routePartitionName), o, {
//         pattern: []
//     })));
// trans.forEach(o => routes.get(o.routePartitionName).pattern.push(o.pattern));

routes = new Map,
result = arr1.map(o => (routes.set(o.route, {}), Object.assign(routes.get(o.route), o, { pattern: [] })));
arr2.forEach(o => routes.get(o.route).pattern.push(o.pattern));

console.log(result);