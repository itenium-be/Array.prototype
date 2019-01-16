describe('', function() {
  it('C# Select() is JS map()', function() {
    const input = [0, 1, 2];
    const result = input.map(x => x * 2);
    expect(result).toEqual([0, 2, 4]);
  });
});
