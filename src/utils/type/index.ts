function is(data: any) {
    return function (type: string) {
        return Object.prototype.toString.call(data) === `[object ${type}]`
    }
}