let arr1 = [
    { route: 'x1' },
    { route: 'x2' },
    { route: 'x3' },
    { route: 'x4' },
    { route: 'x5' }
]


let arr2 = [
    { pattern: 'y1', route: 'x1' },
    { pattern: 'y2', route: 'x1' },
    { pattern: 'y3', route: 'x2' },
    { pattern: 'y4', route: 'x2' },
    { pattern: 'y5', route: 'x3' },
    { pattern: 'y6', route: 'x3' },
    { pattern: 'y7', route: 'x4' },
    { pattern: 'y8', route: 'x4' },
    { pattern: 'y9', route: 'x5' },
    { pattern: 'y10', route: 'x5' }
]

// var array1 = [{ route: 'x1' }, { route: 'x2' }, { route: 'x3' }, { route: 'x4' }, { route: 'x5' }],
// array2 = [{ pattern: 'y1', route: 'x1' }, { pattern: 'y2', route: 'x1' }, { pattern: 'y3', route: 'x2' }, { pattern: 'y4', route: 'x2' }, { pattern: 'y5', route: 'x3' }, { pattern: 'y6', route: 'x3' }, { pattern: 'y7', route: 'x4' }, { pattern: 'y8', route: 'x4' }, { pattern: 'y9', route: 'x5' }, { pattern: 'y10', route: 'x5' }],
routes = new Map,
result = arr1.map(o => (routes.set(o.route, {}), Object.assign(routes.get(o.route), o, { pattern: [] })));

arr2.forEach(o => routes.get(o.route).pattern.push(o.pattern));

console.log(result);

// let result = arr2.reduce((a, b) => {
//     a[b.route] = a[b.route] || [];
//     a[b.route].push(b.pattern);
//     return a;
// }, {});

// console.log(result);
// console.log("-----");

// https://stackoverflow.com/questions/19480008/javascript-merging-objects-by-id


// var members = [{ docId: "1234", userId: 222 }, { docId: "1235", userId: 333 }];
// var memberInfo = [{ id: 222, name: "test1" }, { id: 333, name: "test2" }];

// let finalArray = [];
// memberInfo.forEach(member => {
// finalArray.push( Object.assign( {}, member, 
//          { docId: members.find(m => m.userId === member.id).docId } 
//     ))
// });

// console.log(finalArray);
// console.log("-----")

// let finalArray2 = [];
// arr2.forEach(member => {
//     finalArray2.push(Object.assign({}, member,
//         { route: arr1.find(m => m.route === member.route).route }
//     ))
// });

// console.log(finalArray2);
// // console.log("-----");


// var messages = [{userId: 2, content: "Salam"}, {userId: 5, content: "Hello"},{userId: 4, content: "Moi"}];
// var users = [{id: 2, name: "Grace"}, {id: 4, name: "Janetta"},{id: 5, name: "Sara"}];

// var messagesWithUserNames = arr1.map((route)=> {
//   var haveEqualId = (user) => arr2.route == route.route
//   var userWithEqualId= arr2.find(haveEqualId)
//   return Object.assign({}, route, userWithEqualId)
// })
// console.log(messagesWithUserNames)