import { describe, it, expect, beforeEach } from 'bun:test';

describe('Less Common Operations', function() {
  describe('copyWithin(targetIndex[, startIndex[, endIndex]]) has no C# equivalent', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin

    it('Copies the value at index 3 to index 0', function() {
      const input = [0, 1, 2, 3, 4, 5];
      const result = input.copyWithin(0, 3, 4);
      expect(result).toEqual([3, 1, 2, 3, 4, 5]);
    });
  });



  it('fill(value[, start[, end]])', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    const input = [1, 2, 3, 4];
    const result = input.fill(0, 2, 4);
    expect(result).toEqual([1, 2, 0, 0]);
  });



  it('entries() returns an Iterator of [index, value]', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
    const result = ['a', 'b'].entries();

    expect(result.next().value).toEqual([0, 'a']);

    // Loop with for/of:
    for (let [index, value] of result) {
      expect(index).toEqual(1);
      expect(value).toEqual('b');
    }
  });
});



describe('More Obscure Stuff', function() {
  it('C# SelectMany() is (a bit) like JS flatMap()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap

    // First map(), then flat(depth 1)
    // var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    //   return element for new_array
    // }[, thisArg]);

    const input = [[1], [2, 2], [3, 3, 3]];
    const result = input.flatMap(x => x.length);
    expect(result).toEqual([1, 2, 3]);
  });



  describe('flattening arrays can be done with', function() {
    const input = [[0], 1, [2, 3], [4, [5]]];
    const depth1Flat = [0, 1, 2, 3, 4, [5]];

    it('Array.prototype.flat(depth = 1)', function() {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
      const result = input.flat();
      expect(result).toEqual(depth1Flat);
    });


    it('reduce((accumulator, currentValue, index, sourceArray) => {}, initialValue)', function() {
      const result = input.reduce((acc, val) => acc.concat(val), []);
      expect(result).toEqual(depth1Flat);
    });


    it('spread', function() {
      const result = [].concat(...input);
      expect(result).toEqual(depth1Flat);
    });
  });
});
