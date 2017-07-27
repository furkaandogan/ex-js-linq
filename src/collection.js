const collection = function (array) {
    var items = array;
    var currentIndex = -1;

    this.length = items.length;
    this.items=items;
    this.next = function () {
        currentIndex++;
        return currentIndex < this.length && this.length > currentIndex;
    }
    this.getCurrentIndex = function () {
        return currentIndex;
    }
    this.getCurrent = function () {
        return items[currentIndex];
    }

    this.reset = function () {
        currentIndex = -1;
    }

    this.getEnumerator = function () {
        return items;
    }
}

module.exports = collection;