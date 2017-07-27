
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.0.2&x2=0)](https://www.npmjs.com/package/ex-js-linq)

# ex-js-linq
helpful libraries for JavaScript programming

## Features
- [.forEach](#foreach)
- [.select](#select)
- [.selectMany](#selectmany)
- [.where](#where)
- [.firstOrDefault](#firstordefault)
- [.indexOf](#indexof)
- [.groupBy](#groupby)
- [.any](#any)
- [.exists](#exists)
- [.sum](#sum)
- [.avg](#avg)
- [.min](#min)
- [.max](#max)
- [.remove](#remove)
- [.take](#take)
- [.skip](#skip)
- [.orderBy](#orderby)
- [.orderByDescending](#orderbydescending)
- [.toArray](#toarray)

### Using npm
```bash
npm install ex-js-linq
```

## Overview

```js
var linq = require("npm install ex-js-linq");
var sampleData = [ 
    { id: 3, name: "julia", age: 22, city: "izmir", cars: ["Fiat"] }, 
    { id: 2, name: "Marry", age: 25, city: "istanbul", cars: ["Ford"] }, 
    { id: 4, name: "julia", age: 22, city: "izmir", cars: ["Fiat"] }, 
    { id: 1, name: "John", age: 30, city: "istanbul", cars: ["Ford", "BMW", "Fiat"] }, 
    { id: 5, name: "Furkan", age: 22, city: "istanbul", cars: [] } 
];
```
### .forEach
```js
    new linq(sampleData).forEach(function(x){
        console.log(x);
    });
```
### .select
```js
    var result= new linq(sampleData)
        .select(function(x){return x.age})
        .toArray();
    // or
    var result=new linq(sampleData)
        .select(function(x){
            return {
                name:x.name,
                age:x.age
            }
        }).toArray();
```
### .selectMany
```js
    var result= new linq(sampleData)
        .selectMany(function(x){return x.cars})
        .toArray();
    // result => ["Fiat","Ford","Fiat",...]
```
### .where
```js
    var result=new linq(sampleData)
        .where(function(x){return x.age>23;})
        .toArray();
```
### .firstOrDefault
```js
    var result=new linq(sampleData)
        .firstOrDefault(function(x){return x.id==5;});
```
### .indexOf
```js
    var index=new linq(sampleData)
        .indexOf(function(x){return x.id==5;}); 
```
### .groupBy
```js
    var result=new linq(sampleData)
        .orderBy(function(x){return x.city;})
        .selectMany(function(x){
            return x.items
        }).toArray();
    // result =>[item1,item2,item3,...]
    // or
    var result=new linq(sampleData)
        .orderBy(function(x){return x.city;})
        .toArray();
    // result => [{key:"istanbul",items:[item1,item2,...]},{key:"izmir",items:[item1,item2,...]}]
```
### .any
```js
    var result=new linq(sampleData)
        .any(function(x){return x.id==5;}); 
    // result => true
```
### .exists
```js
    var result=new linq(sampleData)
        .exists(function(x){return x.id==5;}); 
    // result => true
```
### .sum
```js
    var result=new linq(sampleData)
        .sum(function(x){return x.age;}); 
```
### .avg
```js
    var result=new linq(sampleData)
        .avg(function(x){return x.age;}); 
```
### .min
```js
    var result=new linq(sampleData)
        .min(function(x){return x.age;}); 
    // result => 22
```
### .max
```js
    var result=new linq(sampleData)
        .min(function(x){return x.age;}); 
    // result => 30
```
### .remove
```js
    var result=new linq(sampleData)
        .remove(function(x){return x.age==22;})
        .toArray(); 
```
### .take
```js
    var result=new linq(sampleData)
        .take(5).toArray(); 
```
### .skip
```js
    var result=new linq(sampleData)
        .skip(1).take(3).toArray(); 
```
### .orderBy
```js
    var result=new linq(sampleData)
        .orderBy(function(x){ return x.age})
        .toArray();
```
### .orderByDescending
```js
    var result=new linq(sampleData)
        .orderByDescending(function(x){ return x.age})
        .toArray();
```
### .toArray
```js
    var result=new linq(sampleData).toArray();
```
