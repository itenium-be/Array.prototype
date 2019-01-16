using System;
using System.Linq;
using Xunit;

namespace Array.prototype
{
    public class BasicOperations
    {
        [Fact]
        public void Select_is_map()
        {
            var input = new[] {0, 1, 2};
            var result = input.Select(x => x * 2);
            Assert.Equal(new[] {0, 2, 4}, result);
        }
    }
}
