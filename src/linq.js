var collection = require("./collection.js");
var defaultExpression = function (x) { return x; }

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
collection.prototype.selectMany = function (expression) {
    var list = [];
    this.forEach(function (x) {
        var selectList = expression(x);
        new collection(selectList).forEach(function (item) {
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
    var total = 0;
    expression = expression || defaultExpression;
    this.forEach(function (item) {
        total += expression(item);
    });
    return total;
}
collection.prototype.avg = function (expression) {
    var result = 0;
    expression = expression || defaultExpression;
    this.forEach(function (item) {
        result += expression(item);
    });

    return result / this.length;
}
collection.prototype.min = function (expression) {
    var minValue = 0;
    expression = expression || defaultExpression;
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
    var maxValue = 0;
    expression = expression || defaultExpression;
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
    expression = expression || defaultExpression;
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
    this.forEach(function (x, xIndex) {
        var isInLine = true;
        for (var yIndex = list.length - 1; yIndex > xIndex; yIndex--) {
            if (expression(list[yIndex - 1]) > expression(list[yIndex])) {
                tmp = list[yIndex - 1];
                list[yIndex - 1] = list[yIndex];
                list[yIndex] = tmp;
                isInLine = false;
            }
        }
        return isInLine;
    });
    return new collection(list);
}
collection.prototype.orderByDescending = function (expression) {
    _this = this;
    var list = this.getEnumerator();
    this.forEach(function (x, xIndex) {
        var isInLine = true;
        for (var yIndex = list.length - 1; yIndex > xIndex; yIndex--) {
            if (expression(list[yIndex - 1]) < expression(list[yIndex])) {
                tmp = list[yIndex - 1];
                list[yIndex - 1] = list[yIndex];
                list[yIndex] = tmp;
                isInLine = false;
            }
        }
        return isInLine;
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

collection.prototype.distinct = function (expression) {
    _this = this;
    expression = expression || defaultExpression;
    this.forEach(function (x) {
        var val = expression(x);
        if (!new collection(list).any(function (y) { return y == val; })) {
            _this.getEnumerator().push(val);
        }
    });
    return _this;
}
collection.prototype.add = function (item) {
    this.getEnumerator().push(item);
}
collection.prototype.addRange = function (items) {
    _this = this;
    new collection(items).forEach(function (x) {
        _this.getEnumerator().push(x);
    });
}

collection.prototype.join = function (array) {
    _this = this;
    new collection(array).forEach(function (x) {
        _this.getEnumerator().push(x);
    });
    return this;
}

collection.prototype.count = function (expression) {
    expression = expression || defaultExpression;
    return this.where(expression).length;
}

module.exports = collection;