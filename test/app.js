var linq = require("../src/linq.js");

var sampleData = [
    {
        id: 3,
        name: "julia",
        age: 22,
        city: "izmir",
        cars: ["Fiat"]
    },
    {
        id: 1,
        name: "John",
        age: 30,
        city: "istanbul",
        cars: ["Ford", "BMW", "Fiat"]
    },
    {
        id: 4,
        name: "julia",
        age: 22,
        city: "izmir",
        cars: ["Fiat"]
    },
    {
        id: 5,
        name: "Furkan",
        age: 22,
        city: "istanbul",
        cars: []
    },
    {
        id: 2,
        name: "Marry",
        age: 25,
        city: "istanbul",
        cars: ["Ford"]
    },
];


function log(txt) {
    console.log(txt);
}

var dataJSON = JSON.stringify(sampleData);
log("</br> json data </br>" + dataJSON);

var linqContext = new linq(sampleData);

var list = linqContext
    .groupBy(function (x) { return x.city })
    .toArray();

log("</br> groupBy </br></br> result</br>" + JSON.stringify(list));

list = linqContext
    .orderBy(function (x) { return x.age })
    .select(function (x) { return x.age; })
    .toArray();

log("</br> orderBy </br></br> result</br>" + JSON.stringify(list));

list = linqContext
    .orderByDescending(function (x) { return x.age })
    .select(function (x) { return x.age; })
    .toArray();
log("</br> orderByDescending </br></br> result</br>" + JSON.stringify(list));

var sira=new linq([5,2,1,6,7]).orderByDescending(function(x){return x;}).toArray();


var result=new linq(sampleData)
        .groupBy(function(x){return x.city;})
        .toArray();
console.log(result);

var result=new linq(sampleData)
        .groupBy(function(x){return x.city;})
        .selectMany(function(x){return x.items})
        .toArray();
console.log(result);


