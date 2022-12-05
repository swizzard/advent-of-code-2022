import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { day5_1, day5_2, moveCrates, topCrates } from "./day5.ts";

Deno.test("moveCrates", () => {
  const cs = [["D", "N", "Z"], ["C", "M"], ["P"]];
  const move = { start: 1, end: 3, count: 3 };
  moveCrates(cs, move);
  assertEquals(cs, [[], ["C", "M"], ["Z", "N", "D", "P"]]);
});

Deno.test("day5_1", () => {
  const s = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
  assertEquals(topCrates(day5_1(s)), "CMZ");
});

Deno.test("day5_2", () => {
  const s = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
  assertEquals(topCrates(day5_2(s)), "MCD");
});
