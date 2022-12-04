type Point = {
  start: number;
  end: number;
};

export const parsePoint = (s: string): Point => {
  const [fst, snd] = s.split("-");
  return { start: parseInt(fst), end: parseInt(snd) };
};

export const parseLine = (s: string): [Point, Point] => {
  const [fst, snd] = s.split(",");
  return [parsePoint(fst), parsePoint(snd)];
};

export const subsumes = (a: Point, b: Point) => {
  return (
    (a.start <= b.start && a.end >= b.end) ||
    (b.start <= a.start && b.end >= a.end)
  );
};

const input = Deno.readTextFile("day4_input.txt");

export const countSubsumes = (ps: Array<[Point, Point]>): number => {
  let sum = 0;
  for (const [f, s] of ps) {
    if (subsumes(f, s)) {
      sum += 1;
    }
  }
  return sum;
};

export function day4_1(s: string): number {
  const parsed = s.trim().split(/\n/).map(parseLine);
  return countSubsumes(parsed);
}

export const anyOverlaps = (a: Point, b: Point): boolean => {
  return (
    (a.start <= b.end && a.end >= b.start) ||
    (b.start <= a.end && b.end >= a.start)
  );
};

export const countAnyOverlaps = (ps: Array<[Point, Point]>): number => {
  let sum = 0;
  for (const [f, s] of ps) {
    if (anyOverlaps(f, s)) {
      sum += 1;
    }
  }
  return sum;
};

function day4_2(s: string): number {
  const parsed = s.trim().split(/\n/).map(parseLine);
  return countAnyOverlaps(parsed);
}

// input.then(day4_1).then((n: number) => console.log(`day4_1: ${n}`));

input.then(day4_2).then((n: number) => console.log(`day4_2: ${n}`));
