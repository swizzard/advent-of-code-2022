import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import {
  day3_1,
  day3_2,
  splitRucksack,
  toPriorities,
  triples,
  union,
  union3,
} from "./day3.ts";

Deno.test("toPriorities upper", () => {
  assertEquals(toPriorities("A"), new Uint8Array([27]));
});
Deno.test("toPriorities lower", () => {
  assertEquals(toPriorities("a"), new Uint8Array([1]));
});
Deno.test("splitRucksack", () => {
  const arr = toPriorities("vJrwpWtwJgWrhcsFMMfFFhFp");
  const [fst, snd] = splitRucksack(arr);
  assertEquals(fst.length, 12);
  assertEquals(snd.length, 12);
});
Deno.test("union", () => {
  const fst = [1, 2, 3, 4];
  const snd = [2, 3, 4, 5];
  assertEquals(union(fst, snd), new Set([2, 3, 4]));
});
Deno.test("day3_1", () => {
  const s = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
  assertEquals(day3_1(s), 157);
});
Deno.test("triples", () => {
  const arr = [0, 1, 2, 3, 4, 5];
  assertEquals(triples(arr), [
    [0, 1, 2],
    [3, 4, 5],
  ]);
});
Deno.test("union3", () => {
  const fst = [1, 2, 3, 4];
  const snd = [2, 3, 4, 5];
  const thrd = [3, 4, 5, 6];
  assertEquals(union3(fst, snd, thrd), new Set([3, 4]));
});
Deno.test("day3_2", () => {
  const s = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
  assertEquals(day3_2(s), 70);
});
