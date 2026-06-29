/**
 * algorithms.js
 *
 * Custom merge sort and binary search implementations used by the
 * inventory system, instead of relying on MongoDB's built-in .sort().
 *
 * Why these two together:
 *   - mergeSort() sorts the product list by a chosen field (price, stock, name).
 *   - binarySearchRange() then uses that SORTED array to quickly find the
 *     lower/upper boundary of a price range, instead of scanning every item.
 *
 * Time complexity:
 *   - mergeSort: O(n log n) in all cases (best/average/worst) - stable sort.
 *   - binarySearchRange (per bound lookup): O(log n).
 */

/**
 * Merge Sort
 * Splits the array in half recursively until single elements remain,
 * then merges sorted halves back together.
 *
 * @param {Array} arr - array of items to sort
 * @param {Function} getValue - function(item) => comparable value (number or string)
 * @param {String} order - "asc" or "desc"
 * @returns {Array} new sorted array
 */
function mergeSort(arr, getValue, order = "asc") {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), getValue, order);
  const right = mergeSort(arr.slice(mid), getValue, order);

  return merge(left, right, getValue, order);
}

function merge(left, right, getValue, order) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const a = getValue(left[i]);
    const b = getValue(right[j]);

    const shouldTakeLeft = order === "asc" ? a <= b : a >= b;

    if (shouldTakeLeft) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // append any remaining items
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

/**
 * Binary Search - find the leftmost index where getValue(item) >= target
 * (the lower boundary of a range). Array MUST already be sorted ascending
 * by the same field used in getValue.
 *
 * @param {Array} sortedArr - array sorted ascending by getValue
 * @param {Function} getValue - function(item) => number
 * @param {Number} target - value to search for
 * @returns {Number} index of first item with value >= target
 */
function lowerBound(sortedArr, getValue, target) {
  let low = 0;
  let high = sortedArr.length; // note: not length - 1, since target may not exist

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (getValue(sortedArr[mid]) < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

/**
 * Binary Search - find the rightmost index where getValue(item) <= target
 * (the upper boundary of a range). Array MUST already be sorted ascending.
 *
 * @param {Array} sortedArr - array sorted ascending by getValue
 * @param {Function} getValue - function(item) => number
 * @param {Number} target - value to search for
 * @returns {Number} index AFTER the last item with value <= target
 */
function upperBound(sortedArr, getValue, target) {
  let low = 0;
  let high = sortedArr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (getValue(sortedArr[mid]) <= target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

/**
 * Given an array already sorted ascending by getValue, return only the
 * items whose value falls within [minVal, maxVal] using two binary
 * searches (lowerBound + upperBound) instead of scanning every item.
 *
 * @param {Array} sortedArr - array sorted ascending by getValue
 * @param {Function} getValue - function(item) => number
 * @param {Number} minVal
 * @param {Number} maxVal
 * @returns {Array} slice of items within range
 */
function binarySearchRange(sortedArr, getValue, minVal, maxVal) {
  const startIdx = lowerBound(sortedArr, getValue, minVal);
  const endIdx = upperBound(sortedArr, getValue, maxVal);

  return sortedArr.slice(startIdx, endIdx);
}

module.exports = {
  mergeSort,
  lowerBound,
  upperBound,
  binarySearchRange,
};