const LOWERCASE_OFFSET = 96;
const UPPERCASE_OFFSET = 38;

const input = async () => Deno.readTextFile("./day3_input.txt");

const splitRows = (s: string) => s.trim().split(/\n/);

export const toPriorities = (s: string): Uint8Array =>
  new TextEncoder()
    .encode(s)
    .map((v) => (v < 97 ? v - UPPERCASE_OFFSET : v - LOWERCASE_OFFSET));

export const splitRucksack = (arr: Uint8Array): [Uint8Array, Uint8Array] => {
  const l = arr.length;
  const h = Math.floor(l / 2) + (l % 2 === 0 ? 0 : 1);
  const fst = arr.slice(0, h);
  const snd = arr.slice(h, l);
  return [fst, snd];
};

export const union = <A>(fst: Iterable<A>, snd: Iterable<A>): Set<A> => {
  const u = new Set<A>();
  const s = new Set(snd);
  Array.from(fst).forEach((v: A) => {
    if (s.has(v)) u.add(v);
  });
  return u;
};

export function day3_1(s: string): number {
  const unioned = splitRows(s)
    .map(toPriorities)
    .map(splitRucksack)
    .map(([f, s]: [Uint8Array, Uint8Array]) => union(f, s));
  let total = 0;
  for (const u of unioned) {
    for (const v of u) {
      total += v;
    }
  }
  return total;
}

export const triples = <A>(arr: Array<A>): Array<Array<A>> => {
  const l = arr.length;
  let n = 0;
  const o: Array<Array<A>> = [];
  while (n < l) {
    const s = arr.slice(n, n + 3);
    if (s) {
      o.push(s);
    }
    n += 3;
  }
  return o;
};

export const union3 = <A>(
  fst: Iterable<A>,
  snd: Iterable<A>,
  thrd: Iterable<A>
): Set<A> => {
  // not strictly necessary -- isomorphic to union(union(a, b), c)
  const u = new Set<A>();
  const s = new Set(snd);
  const t = new Set(thrd);
  Array.from(fst).forEach((v: A) => {
    if (s.has(v) && t.has(v)) {
      u.add(v);
    }
  });
  return u;
};

export const day3_2 = (s: string): number => {
  const asPriorities = splitRows(s).map(toPriorities);
  const tripled = triples(asPriorities);
  return tripled.reduce((acc, triple) => {
    const unioned = union3(triple[0], triple[1], triple[2]);
    return acc + unioned.values().next().value;
  }, 0);
};

input()
  .then(day3_2)
  .then((v) => console.log(`day3_2: ${v}`));
