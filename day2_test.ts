import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import {
  parsePair2,
  RPS,
  score2,
  scorePair,
  scorePairs,
  scorePairs2,
  Winner,
} from "./day2.ts";

Deno.test("scorePair Rock Rock", () => {
  assertEquals(scorePair(RPS.Rock, RPS.Rock), 4);
});
Deno.test("scorePair Rock Paper", () => {
  assertEquals(scorePair(RPS.Rock, RPS.Paper), 8);
});
Deno.test("scorePair Rock Scissors", () => {
  assertEquals(scorePair(RPS.Rock, RPS.Scissors), 3);
});
Deno.test("scorePair Paper Rock", () => {
  assertEquals(scorePair(RPS.Paper, RPS.Rock), 1);
});
Deno.test("scorePair Paper Paper", () => {
  assertEquals(scorePair(RPS.Paper, RPS.Paper), 5);
});
Deno.test("scorePair Paper Scissors", () => {
  assertEquals(scorePair(RPS.Paper, RPS.Scissors), 9);
});
Deno.test("scorePair Scissors Rock", () => {
  assertEquals(scorePair(RPS.Scissors, RPS.Rock), 7);
});
Deno.test("scorePair Scissors Paper", () => {
  assertEquals(scorePair(RPS.Scissors, RPS.Paper), 2);
});
Deno.test("scorePair Scissors Scissors", () => {
  assertEquals(scorePair(RPS.Scissors, RPS.Scissors), 6);
});

Deno.test("scorePairs", () => {
  const pairs = ["A Y", "B X", "C Z"];
  const score = scorePairs(pairs);
  assertEquals(score, 15);
});

Deno.test("score2 Rock Them", () => {
  assertEquals(score2(RPS.Rock, Winner.Them), 3);
});
Deno.test("score2 Rock Tie", () => {
  assertEquals(score2(RPS.Rock, Winner.Tie), 4);
});
Deno.test("score2 Rock Me", () => {
  assertEquals(score2(RPS.Rock, Winner.Me), 8);
});
Deno.test("score2 Paper Them", () => {
  assertEquals(score2(RPS.Paper, Winner.Them), 1);
});
Deno.test("score2 Paper Tie", () => {
  assertEquals(score2(RPS.Paper, Winner.Tie), 5);
});
Deno.test("score2 Paper Me", () => {
  assertEquals(score2(RPS.Paper, Winner.Me), 9);
});
Deno.test("score2 Scissors Them", () => {
  assertEquals(score2(RPS.Scissors, Winner.Them), 2);
});
Deno.test("score2 Scissors Tie", () => {
  assertEquals(score2(RPS.Scissors, Winner.Tie), 6);
});
Deno.test("score2 Scissors Me", () => {
  assertEquals(score2(RPS.Scissors, Winner.Me), 7);
});

Deno.test("parsePair2 A Y", () => {
  assertEquals(parsePair2("A Y"), [RPS.Rock, Winner.Tie]);
});
Deno.test("parsePair2 B X", () => {
  assertEquals(parsePair2("B X"), [RPS.Paper, Winner.Them]);
});
Deno.test("parsePair2 C Z", () => {
  assertEquals(parsePair2("C Z"), [RPS.Scissors, Winner.Me]);
});

Deno.test("sp2 Rock Tie", () => {
  assertEquals(scorePairs2(["A Y"]), 4);
});
Deno.test("sp2 Paper Them", () => {
  assertEquals(scorePairs2(["B X"]), 1);
});
Deno.test("sp2 Scissors Me", () => {
  assertEquals(scorePairs2(["C Z"]), 7);
});

Deno.test("scorePairs2", () => {
  const pairs = ["A Y", "B X", "C Z"];
  const score = scorePairs2(pairs);
  assertEquals(score, 12);
});
