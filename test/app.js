var linq = require("../src/linq.js");

var sampleData = [
    {
        id: 1,
        name: "John",
        age: 30,
        city: "istanbul",
        cars: ["Ford", "BMW", "Fiat"]
    },
    {
        id: 2,
        name: "Marry",
        age: 25,
        city: "istanbul",
        cars: ["Ford"]
    },
    {
        id: 3,
        name: "julia",
        age: 22,
        city: "izmir",
        cars: ["Fiat"]
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
    }
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

