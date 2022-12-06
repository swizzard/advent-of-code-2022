const allUnique = (s: Array<string>): boolean => new Set(s).size === s.length;

export function day6_1(s: string): number {
  let ix = 4;
  const arr = Array.from(s);
  while (ix < s.length) {
    const window = arr.slice(ix - 4, ix);
    if (allUnique(window)) {
      return ix;
    }
    ix += 1;
  }
  throw new Error("no 4 unique characters found");
}

export function day6_2(s: string): number {
  let ix = 14;
  const arr = Array.from(s);
  while (ix < s.length) {
    const window = arr.slice(ix - 14, ix);
    if (allUnique(window)) {
      return ix;
    }
    ix += 1;
  }
  throw new Error("no unique 14 characters found");
}

const main = async () => {
  const input = await Deno.readTextFile("day6_input.txt");
  console.log(`day6_1: ${day6_1(input)}`);
  console.log(`day6_2: ${day6_2(input)}`);
};

main();
