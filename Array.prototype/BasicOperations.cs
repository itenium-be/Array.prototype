using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Array.prototype
{
    public class BasicOperations
    {
        [Fact]
        public void Basic_example()
        {
            var result = new int?[] {0, 1, 2, 3, null}
                .Where(x => x != null)
                .Select(x => x * 10)
                .OrderByDescending(x => x)
                .ToArray();

            Assert.Equal(new int?[] {30, 20, 10, 0}, result);
        }

        [Fact]
        public void Select_is_map()
        {
            var input = new[] {0, 1, 2};
            var result = input.Select(x => x * 2);
            Assert.Equal(new[] {0, 2, 4}, result);
        }

        [Fact]
        public void SelectMany_is_flat_or_flatMap()
        {
            var input = new[] { new[] {0}, new [] {1}, new[] { 2 , 3} };
            var result = input.SelectMany(x => x);
            Assert.Equal(new[] { 0, 1, 2, 3 }, result);
        }

        [Fact]
        public void GroupBy_is_reduce()
        {
            var input = new[] { 0, 1, 2, 3 };
            var result = input
                .GroupBy(x => x % 2 == 0 ? "even" : "odd", x => x)
                .ToArray();

            Assert.Equal("even", result.First().Key);
            Assert.Equal(new[] {0, 2}, result.First());
        }

        [Fact]
        public void Aggregate_is_reduce()
        {
            var input = new[] { 0, 1, 2 };
            var result = input.Aggregate(0, (sum, element) => sum + element);
            // var result = input.Sum()
            Assert.Equal(3, result);
        }

        //[Fact]
        //public void SpanSlice_is_slice()
        //{
        //    // PMC: Install-Package System.Memory
        //    var result = new[] { 0, 1, 2 }.AsSpan().Slice(0, 2);
        //}

        [Fact]
        public void ElementAt_is_at()
        {
            var input = new[] { 0, 1, 2 };
            var result = input.ElementAt(1);
            Assert.Equal(1, result);
        }

        [Fact]
        public void ElementAt_must_be_positive_unlike_js_at()
        {
            var input = new[] { 0, 1, 2 };
            Assert.Throws<ArgumentOutOfRangeException>(() => input.ElementAt(-2));
        }

        [Fact]
        public void Concat_is_the_same()
        {
            var result = new[] { 0, 1, 2 }.Concat(new [] { 3, 4 });
            Assert.Equal(new[] { 0, 1, 2, 3, 4 }, result);
        }

        private static IEnumerable<int> GetNrs()
        {
            yield return 0;
            yield return 1;
            yield return 2;
        }

        [Fact]
        public void SomeJugglingToFake_js_findIndex()
        {
            // Static Array.FindIndex()
            var result = System.Array.FindIndex(GetNrs().ToArray(), x => x > 2);
            Assert.Equal(-1, result);

            // List<T>.FindIndex()
            result = GetNrs().ToList().FindIndex(x => x > 2);
            Assert.Equal(-1, result);

            // LINQ
            int keyIndex = GetNrs()
               .Select((v, i) => new { Value = v, Index = i })
               .FirstOrDefault(x => x.Value == 10)?.Index ?? -1;

            Assert.Equal(-1, keyIndex);

            // Extension Method
            Assert.Equal(-1, GetNrs().FindIndex(x => x == 10));
        }


        [Fact]
        public void SelectMany_is_flatMap()
        {
            // flatMap is quite experimental!
            // and behaves a bit different:
            // - SelectMany Func must return an IEnumerable
            // - flatMap callback may return anything

            var input = new[]
            {
                new[] {1},
                new[] {2, 2},
                new[] {3, 3, 3},
            };
            var result = input.SelectMany(x => new [] {x.Length});
            Assert.Equal(new[] {1, 2, 3}, result);
        }

        [Fact]
        public void indexOf_doesnt_exist()
        {
            var input = new[] {1, 2, 3};
            int indexOf3 = input.FindIndex(3);
            Assert.Equal(2, indexOf3);

            // List<T> does have IndexOf()

            // Linq - doesn't return -1 if not found!
            int indexOf2 = input.TakeWhile(x => x != 2).Count();
            Assert.Equal(1, indexOf2);
        }


        [Fact]
        public void Static_String_Join_is_join()
        {
            var input = new[] { 1, 2, 3 };
            string result = string.Join(',', input);
            Assert.Equal("1,2,3", result);
        }

        [Fact]
        public void reverse_is_reverse()
        {

            // JS variant does it inplace though!
            var input = new[] {1, 2, 3};
            //input.Reverse()
            var result = input.Reverse();
            Assert.Equal(new[] { 3, 2, 1 }, result);
        }

        //[Fact]
        //public void reverse_is_shift()
        //{
        //    // JS variant does it inplace though!
        //    var input = new[] { 1, 2, 3 };
        //    var result = input.
        //    Assert.Equal(new[] { 3, 2, 1 }, result);
        //}
    }



    public static class Extensions
    {
        /// <summary>
        /// Executes an action on each element in a sequence
        /// </summary>
        /// <remarks>
        /// Jon Skeet on why this is not in the .NET Framework:
        ///
        /// The idea is that the LINQ query operators should be side-effect-free,
        /// fitting in with a reasonably functional way of looking at the world.
        /// Clearly ForEach is exactly the opposite - a purely side-effect-based
        /// construct.
        ///
        /// That's not to say this is a bad thing to do - just thinking about the
        /// philosophical reasons behind the decision.
        /// 
        /// https://stackoverflow.com/a/200614/540352
        /// </remarks>
        public static void ForEach<T>(this IEnumerable<T> items, Action<T> action)
        {
            foreach (var item in items)
            {
                action(item);
            }
        }

        ///<summary>Finds the index of the first item matching an expression in an enumerable.</summary>
        ///<param name="items">The enumerable to search.</param>
        ///<param name="predicate">The expression to test the items against.</param>
        ///<returns>The index of the first matching item, or -1 if no items match.</returns>
        /// <remarks>
        /// Copied from:
        /// https://stackoverflow.com/questions/1764970/find-index-of-a-value-in-an-array
        /// </remarks>
        public static int FindIndex<T>(this IEnumerable<T> items, Func<T, bool> predicate)
        {
            if (items == null) throw new ArgumentNullException(nameof(items));
            if (predicate == null) throw new ArgumentNullException(nameof(predicate));

            int retVal = 0;
            foreach (var item in items)
            {
                if (predicate(item))
                    return retVal;

                retVal++;
            }
            return -1;
        }

        /// <summary>Finds the index of the first item equal to a value in an enumerable.</summary>
        /// <param name="items">The enumerable to search.</param>
        /// <param name="value">The value to find.</param>
        /// <param name="comparer">Comparer to determine equality. Defaults to EqualityComparer(Of T).Default</param>
        /// <returns>The index of the first matching item, or -1 if no item .</returns>
        public static int FindIndex<T>(this IEnumerable<T> items, T value, IEqualityComparer<T> comparer = null)
        {
            if (items == null) throw new ArgumentNullException(nameof(items));

            comparer = comparer ?? EqualityComparer<T>.Default;
            int retVal = 0;
            foreach (var item in items)
            {
                if (comparer.Equals(value, item))
                    return retVal;

                retVal++;
            }
            return -1;
        }
    }
}
