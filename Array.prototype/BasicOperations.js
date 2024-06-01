// Basic Example
// (someVar || []).filter().map()

// Examples of newer ECMAScript version features
// toSorted, toSpliced, toReversed, with, ...
// https://github.com/itenium-be/ModernJS/blob/master/src/ECMAScripts/ECMAScript2023.spec.ts

it('basic example', function() {
  const result = [0, 1, 2, 3, null]
    .filter(x => x !== null)
    .map(x => x * 10)
    .sort((a, b) => b - a);

  expect(result).toEqual([30, 20, 10, 0]);
});


describe('Mapping', function() {
  it('C# Select() is JS map()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const input = [0, 1, 2];
    const result = input.map(x => x * 2);
    expect(result).toEqual([0, 2, 4]);
  });


  describe('C# Aggregate is JS reduce((acc, cur, index, src) => {}, initialValue)', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight

    it('can reduce to a single value', function() {
      const input = [0, 1, 2, 3];
      const sum = input.reduce((total, cur) => total + cur, 0);
      expect(sum).toBe(6);
    });

    it('can reduce to do group by', function() {
      const input = [0, 1, 2, 3];
      const initialValue = {even: [], odd: []};
      const result = input.reduce((acc, cur) => {
        if (cur % 2 === 0) {
          acc.even.push(cur);
        } else {
          acc.odd.push(cur);
        }
        return acc;
      }, initialValue);

      expect(result).toEqual({even: [0, 2], odd: [1, 3]});
    });

    it('can reduce to an object', function() {
      const input = [0, 1, 2, 3];
      const initialValue = {sum: 0, max: 0, min: 0};
      const result = input.reduce((acc, cur) => {
        acc.sum += cur;
        acc.max = Math.max(cur, acc.max);
        return acc;
      }, initialValue);
      expect(result).toEqual({sum: 6, max: 3, min: 0});
    });

    it('does all sorts of things, really', function() {
      const input = [[], [1], [1, 2]];
      const result = input.reduce((acc, cur) => {
        if (cur.length) {
          acc.push(cur.length);
        }
        return acc;
      }, []);
      expect(result).toEqual([1, 2]);
    });

    it('since 2024, JS has Object.groupBy', () => {
      const socks = [
        { name: 'JavaScript', type: 'lang' },
        { name: 'Angular', type: 'package' },
        { name: 'React', type: 'package' },
      ];

      const grouped = Object.groupBy(socks, sock => sock.type);

      expect(grouped).toEqual({
        lang: [{ name: 'JavaScript', type: 'lang' }],
        package: [
          { name: 'Angular', type: 'package' },
          { name: 'React', type: 'package' },
        ]
      })
    })
  });


  it("C# Static string.Join(',', arr) is JS join(separator = ',')", function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    const input = [1, 2, 3];
    const result = input.join();
    expect(result).toBe('1,2,3');
  });
});




describe('Finding stuff', function() {
  describe('C# Where() is JS filter()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    it('simple filter', function() {
      const input = [0, 1, 2];
      const result = input.filter(x => x < 2);
      expect(result).toEqual([0, 1]);
    });

    it('can filter to unique elements', function() {
      const input = [0, 0, 1, 5, 5];
      // Equals true when the first occurence of the value is the current value
      const result = input.filter((element, index, array) => array.indexOf(element) === index);
      expect(result).toEqual([0, 1, 5]);
    });

    it('can look for text', function() {
      const input = ['str', 'inGy'];
      const needle = 'gY';
      const result = input.filter(x => x.toLowerCase().includes(needle.toLowerCase()));
      expect(result.length).toBe(1);
    });
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
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
    const beasts = ['ant', 'bison', 'duck'];
    expect(beasts.indexOf('duck')).toBe(2);

    // Also: lastIndexOf
  });
});






describe('Looping', function() {
  it("C# doesn't have forEach((currentValue[, index[, array[, thisArg]]]) => {})", function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    // There is a reason ForEach is not a default LINQ operator:
    // I believe the idea is that the LINQ query operators should be side-effect-free,
    // fitting in with a reasonably functional way of looking at the world. Clearly ForEach
    // is exactly the opposite - a purely side-effect-based construct.
    //
    // That's not to say this is a bad thing to do - just thinking about the philosophical
    // reasons behind the decision.
    // -- Jon Skeet
    // See: https://stackoverflow.com/a/200614/25184132
    const input = [0, 1, 2, 3];
    let sum = 0;
    input.forEach(nr => sum += nr);
    expect(sum).toBe(6);
  });

  it('A more imperative approach', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values
    const input = ['a', 'b', true];
    const iterator = input.values();
    const result = [];
    for (const value of iterator) {
      result.push(value + 1);
    }
    expect(result).toEqual(['a1', 'b1', 2]); // Ah I expected (true + 1) to be 1. 2 makes sense I guess :)

    // The old school loop:
    for (let i = 0; i < input.length; i++) {
      //console.log(input[i]);
    }

    // A more modern approach:
    for (let itm of [0, 1, 2]) {
      //console.log(itm);
    }

    // But this is a Linq comparison of sorts
    const ouch = input.map(x => x + 1);
  });
});








describe('Getting', function() {
  it('C# All() is JS every()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    const input = [0, 1, 2];
    const allLessThan5 = input.every(x => x < 5);
    expect(allLessThan5).toBe(true);
  });


  it('C# Any() is JS some()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    const input = [0, 1, 2];
    const result = input.some(x => x === 1);
    expect(result).toBe(true);
  });



  it('is JS slice(begin, endNotIncluded)', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const input = [0, 1, 2, 3, 4, 5];
    expect(input.slice(2, 3)).toEqual([2]);
  });

  it('creating a shallow copy with slice()', function() {
    const input = [0, 1, 2, 3, 4, 5];
    const result = input.slice();
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
  });

  it('shallow copy with spread', function() {
    const input = [0, 1, 2, 3];
    expect(input.slice()).toEqual([...input]);
  });
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








describe('Mutation', function() {
  it('C# Reverse() is JS reverse()', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
    const input = [0, 1, 2];
    const reversed = input.reverse();
    expect(input).toBe(reversed);
    expect(input).toEqual([2, 1, 0]);
  });

  it('shift() removes the first element', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
    const input = [0, 1, 2];
    const first = input.shift();
    expect(first).toBe(0);
    expect(input).toEqual([1, 2]);
  });

  // TODO push()
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

  // https://itenium.be/blog/productivity/programming-mnemonics/
  it("unshift() adds element(s) - because it's a longer word than shift", function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    const input = [0, 1, 2];
    const newArrayLength = input.unshift(3, 4);
    expect(newArrayLength).toBe(5);
    expect(input).toEqual([3, 4, 0, 1, 2]);
  });

  it('splice(start, deleteCount, newEl1, newEl2, ...) takes some elements out and injects others', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    const input = [0, 1, 2, 3, 4, 5];
    const removed = input.splice(1, 2, 'new');
    expect(removed).toEqual([1, 2]);
    expect(input).toEqual([0, 'new', 3, 4, 5]);
  });

  it('splice(start, 0, newEl1, newEl2, ...) can just inject elements', function() {
    // or just remove some...
    const input = [0, 1, 2, 3];
    const removed = input.splice(2, 0, 'new');
    expect(removed).toEqual([]);
    expect(input).toEqual([0, 1, 'new', 2, 3]);
  });



  describe('C# OrderBy is JS sort()', function() {
    it('without comparer, it converts all elements to string and compares on UTF-16 code unit values', function() {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      const input = [8, 4, 3, 10, 5];
      const sorted = input.sort();

      expect(sorted).toEqual([10, 3, 4, 5, 8]);
      expect(input).toBe(sorted);
    });

    it('sorts numbers', function() {
      const input = [8, 4, 3, 10, 5];
      const sorted = input.sort((a, b) => a - b);
      expect(sorted).toEqual([3, 4, 5, 8, 10]);
      expect(input).toBe(sorted);
    });

    it('sorts strings not expected with é', function() {
      const input = ['q', 'e', 'é', 'f'];
      const sorted = input.sort();
      expect(sorted).toEqual(['e', 'f', 'q', 'é']);
    });

    it('sorts strings more logical with localeCompare()', function() {
      const input = ['q', 'e', 'é', 'f'];
      const sorted = input.sort((a, b) => a.localeCompare(b));
      expect(sorted).toEqual(['e', 'é', 'f', 'q']);
    });

    it('sorts dates', function() {
      const date1 = new Date('2020-01-01');
      const date2 = new Date('2015-01-01');
      const date3 = new Date('2019-01-01');
      const input = [date1, date2, date3];

      const sorted = input.sort((a, b) => a.getTime() - b.getTime());
      expect(sorted).toEqual([date2, date3, date1]);
    });
  });
});
