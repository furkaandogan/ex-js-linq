var collection = require("./collection.js");

collection.prototype.forEach = function (expression) {
    for (var index = 0; index < this.length; index++) {
        if (expression(this.getEnumerator()[index], index)) {
            break;
        }
    }
    // this.reset();
    // while (this.next() === true) {
    //     if (expression(this.getCurrent(), this.getCurrentIndex())) {
    //         break;
    //     }
    // }
    //this.reset();
}

collection.prototype.select = function (expression) {
    var list = [];
    this.forEach(function (item) {
        list.push(expression(item));
    });
    return new collection(list);
}
collection.prototype.selectMany=function(expression){
    var list=[];
    this.forEach(function(x){
        new collection(x).forEach(function(item){
            list.push(item);
        });
    });
    return new collection(list);
}
collection.prototype.remove = function (expression) {
    var list = [];
    this.forEach(function (item) {
        if (!expression(item)) {
            list.push(item);
        }
    });
    return new collection(list);
}
collection.prototype.sum = function (expression) {
    var total = undefined;
    this.forEach(function (item) {
        total += expression(item);
    });
    return total;
}
collection.prototype.avg = function (expression) {
    var result = undefined;
    this.forEach(function (item) {
        result += expression(item);
    });

    return result / this.length;
}
collection.prototype.min = function (expression) {
    var minValue = undefined;
    this.forEach(function (item) {
        var val = expression(item);
        if (minValue === undefined) {
            minValue = val
        } else if (minValue > val) {
            minValue = val;
        }
    });
    return minValue;
}
collection.prototype.max = function (expression) {
    var maxValue = undefined;
    this.forEach(function (item) {
        var val = expression(item);
        if (maxValue === undefined) {
            maxValue = val;
        } else if (maxValue < val) {
            maxValue = val;
        }
    });
    return maxValue;
}


collection.prototype.where = function (expression) {
    var list = [];
    this.forEach(function (item) {
        if (expression(item)) {
            list.push(item);
        }
    });
    return new collection(list);
}

collection.prototype.firstOrDefault = function (expression) {
    var findItem = undefined;
    this.forEach(function (item) {
        if (findItem === undefined && expression(item)) {
            findItem = item;
            return true;
        }
    });
    return findItem;
}

collection.prototype.take = function (expression) {
    var list = [];
    var index = 0;
    this.forEach(function (item) {
        index++;
        list.push(item);
        return index == count || this.length < count;
    });
    return new collection(list);
}
collection.prototype.groupBy = function (expression) {
    var list = [];
    var _collection = this;
    this.forEach(function (item, index) {
        var key = expression(item);
        var items = [];
        if (!new collection(list).exists(function (x) {
            return x.key == key;
        })) {
            _collection.forEach(function (item2, index2) {
                if (index != index2) {
                    if (key == expression(item2)) {
                        items.push(item2);
                    }
                }
            });
            list.push({
                key: key,
                items: items
            });
        }
    });
    return new collection(list);
}

collection.prototype.orderBy = function (expression) {
    var list = this.getEnumerator();
    var _collection = this;
    _collection.forEach(function (x, xIndex) {
        _collection.forEach(function (y, yIndex) {
            //if (xIndex != yIndex) {
                if (expression(x) > expression(y)) {
                    list[yIndex] = x;
                    list[xIndex] = y;
                    xIndex = yIndex;
                }
            //}
        });
        _collection = new collection(list);
    });
    return new collection(list);
}
collection.prototype.orderByDescending = function (expression) {
    var list = this.getEnumerator();
    var _collection = this;
    _collection.forEach(function (x, xIndex) {
        _collection.forEach(function (y, yIndex) {
            //if (xIndex != yIndex) {
                if (expression(x) < expression(y)) {
                    list[yIndex] = x;
                    list[xIndex] = y;
                    xIndex = yIndex;
                }
            //}
        });
        _collection = new collection(list);
    });
    return new collection(list);
}
collection.prototype.any = function (expression) {
    var isFind = false;
    this.forEach(function (item) {
        isFind = expression(item);
        return isFind;
    });
    return isFind;
}

collection.prototype.exists = function (expression) {
    return this.any(expression);
}

collection.prototype.indexOf = function (expression) {
    var findIndex = -1;
    this.forEach(function (item, index) {
        if (expression(item)) {
            findIndex = index;
            return true;
        }
    });
    return findIndex;
}

collection.prototype.toArray = function () {
    return this.getEnumerator();
}

module.exports = collection;