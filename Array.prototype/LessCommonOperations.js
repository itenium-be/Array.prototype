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
