import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { day6_1 } from "./day6.ts";

Deno.test("day6_1", () => {
  assertEquals(day6_1("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
  assertEquals(day6_1("nppdvjthqldpwncqszvftbrmjlhg"), 6);
  assertEquals(day6_1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
  assertEquals(day6_1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
});
