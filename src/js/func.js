function isString(str) {
  return typeof str === 'string';
}

function isArray(arr) {
  return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.apply(arr) === '[object Array]';
}

function isFunction(func) {
  return typeof func === 'function';
}

function isObject(obj) {
  return typeof obj === 'object';
}

export {isString, isArray, isFunction, isObject};