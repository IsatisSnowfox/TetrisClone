Object.prototype.indexOf = function (searchValue) {
    for(var item in this) {
        if(searchValue === this[item]) {
            return item;
        }
    }
    return undefined;
}
