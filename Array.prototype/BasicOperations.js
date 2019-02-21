describe('Basic Operations', function() {
  it('C# Select() is JS map()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const input = [0, 1, 2];
    const result = input.map(x => x * 2);
    expect(result).toEqual([0, 2, 4]);
  });


  it('C# Where() is JS filter()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const input = [0, 1, 2];
    const result = input.filter(x => x < 2);
    expect(result).toEqual([0, 1]);
  });



  it('C# FirstOrDefault() is JS find()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const input = [0, 1, 2];
    const largerThan0 = input.find(x => x > 0);
    expect(largerThan0).toBe(1);

    const largerThan5 = input.find(x => x > 5);
    expect(largerThan5).toBeUndefined();
  });





  it('C# static Array.IndexOf(arr, Func<T, bool>) is JS findIndex()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const input = [0, 1, 2, 3, 4, 5];
    const largerThan3 = input.findIndex(x => x > 3);
    expect(largerThan3).toBe(4);

    const largerThan5 = input.findIndex(x => x > 5);
    expect(largerThan5).toBe(-1);
  });


  it('C# Contains() is JS includes(valueToFind[, fromIndex])', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    const input = [0, 1, 2];
    const result = input.includes(1);
    expect(result).toBe(true);

    // The method is not called contains because Mootools modified
    // the prototype with a not entirely compatible contains. This
    // could break over a million websites :)
    // https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible
  });

  it("C# doesn't have indexOf(searchElement[, fromIndex])", function() {
    const beasts = ['ant', 'bison', 'duck'];
    expect(beasts.indexOf('duck')).toBe(2);
  });



  it('C# All() is JS every()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    const input = [0, 1, 2];
    const allLessThan5 = input.every(x => x < 5);
    expect(allLessThan5).toBe(true);
  });


  it('C# Concat() is the same in JS', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
    const arr1 = [0, 1, 2];
    const arr2 = [3, 4];
    const result = arr1.concat(arr2);
    expect(result).toEqual([0, 1, 2, 3, 4]);

    // or spread...
    const spread = [...arr1, ...arr2];
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });


  it("C# Static string.Join(',', arr) is JS join(separator = ',')", function() {
    const input = [1, 2, 3];
    const result = input.join();
    expect(result).toBe('1,2,3');
  });


  it("C# doesn't have forEach((currentValue[, index[, array[, thisArg]]]) => {})", function() {
    const input = [0, 1, 2, 3];
    let sum = 0;
    input.forEach(nr => sum += nr);
    expect(sum).toBe(6);
  });


  it('C# SelectMany() is (a bit) like JS flatMap()', function() {
    // First map(), then flat(depth 1)

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
    // var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    //   return element for new_array
    // }[, thisArg]);

    const input = [[1], [2, 2], [3, 3, 3]];
    const withoutFlatMap = input.reduce((acc, value) => acc.concat([value.length]), []);

    if (!Array.prototype.flatMap) {
      pending('Need at least node v11.6.0');
      return;
    }

    const result = input.flatMap(x => x.length);
    expect(result).toEqual([1, 2, 3]);
  });



  describe('flattening arrays can be done with', function() {
    beforeEach(function() {
      this.input = [[0], 1, [2, 3], [4, [5]]];
      this.depth1Flat = [0, 1, 2, 3, 4, [5]];
    });


    it('Array.prototype.flat(depth = 1)', function() {
      if (!Array.prototype.flat) {
        // https://node.green/#ESNEXT-candidate--stage-3--Array-prototype--flat--flatMap--Array-prototype-flat
        pending('Need at least node v11.6.0');
        return;
      }

      const result = this.input.flat();
      expect(result).toEqual(this.depth1Flat);
    });


    it('reduce((accumulator, currentValue) => {}, initialValue)', function() {
      const result = this.input.reduce((acc, val) => acc.concat(val), []);
      expect(result).toEqual(this.depth1Flat);
    });


    it('spread', function() {
      const result = [].concat(...this.input);
      expect(result).toEqual(this.depth1Flat);
    });
  });
});
