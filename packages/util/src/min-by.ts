import each from './each';
import isArray from './is-array';
import isFunction from './is-function';

/**
 * @param {Array} arr The array to iterate over.
 * @param {Function} [fn] The iteratee invoked per element.
 * @return {*} Returns the minimum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * minBy(objects, function(o) { return o.n; });
 * // => { 'n': 1 }
 *
 * minBy(objects, 'n');
 * // => { 'n': 1 }
 */
export default <T>(arr: T[], fn: ((v: T) => number) | string): T | undefined => {
  if (!isArray(arr)) {
    return undefined;
  }
  let min = arr[0];
  let minData;
  if (isFunction(fn)) {
    minData = fn(arr[0]);
  } else {
    minData = arr[0][fn];
  }
  let data;
  each(arr, val => {
    if (isFunction(fn)) {
      data = fn(val);
    } else {
      data = val[fn];
    }
    if (data < minData) {
      min = val;
      minData = data;
    }
  });
  return min;
};
