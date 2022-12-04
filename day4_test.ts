import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";

import {
  anyOverlaps,
  countSubsumes,
  day4_1,
  parseLine,
  parsePoint,
  subsumes,
} from "./day4.ts";

Deno.test("parsePoint", () => {
  assertEquals(parsePoint("2-4"), { start: 2, end: 4 });
});
Deno.test("parseLine", () => {
  assertEquals(parseLine("2-4,6-8"), [
    { start: 2, end: 4 },
    {
      start: 6,
      end: 8,
    },
  ]);
});
Deno.test("subsumes 2-8,3-7", () => {
  assert(subsumes({ start: 2, end: 8 }, { start: 3, end: 8 }));
});
Deno.test("not subsumes 2-4,6-8", () => {
  assertFalse(subsumes({ start: 2, end: 4 }, { start: 6, end: 8 }));
});
Deno.test("not subsumes 2-6,4-8", () => {
  assertFalse(subsumes({ start: 2, end: 6 }, { start: 4, end: 8 }));
});
Deno.test("subsumes 72-83,72-82", () => {
  assert(subsumes({ start: 72, end: 83 }, { start: 72, end: 83 }));
});

Deno.test("day4_1", () => {
  const s = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
  assertEquals(day4_1(s), 2);
});

Deno.test("anyOverlaps 5-7,7-9", () => {
  assert(anyOverlaps({ start: 5, end: 7 }, { start: 7, end: 9 }));
});
Deno.test("not anyOverlaps 2-4,6-8", () => {
  assertFalse(anyOverlaps({ start: 2, end: 4 }, { start: 6, end: 8 }));
});
