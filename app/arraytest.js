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
    
    let result = arr2.reduce((a, b)=> {
      a[b.route] = a[b.route] || [];
      a[b.route].push(b.pattern);
      return a;
    }, {});
    
    console.log(result);

    https://stackoverflow.com/questions/19480008/javascript-merging-objects-by-id

    var mergedList = _.map(a1, function(item){
        return _.extend(item, _.findWhere(a2, { id: item.id }));
    });