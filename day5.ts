type CrateStack = Array<string>;
type Crates = Array<CrateStack>;
type CrateRow = Map<number, string>;

export type Move = { start: number; end: number; count: number };

enum MResult {
  Row,
  Move,
  Null,
}

type M = { tag: MResult; value: CrateRow | Move | null };

const rowPat = /(( {3})|(\[([A-Z])\]))/g;
const movePat = /move (\d+) from (\d+) to (\d+)/;
const breakPat = / 1   2   3   4   5   6   7   8   9 \n/;

export const moveCrates = (crates: Crates, { start, end, count }: Move) => {
  const st = crates[start - 1];
  const en = crates[end - 1];
  if (!st || !en) {
    throw new Error(`invalid crate indices ${start} to ${end}`);
  }
  const toPush = st.slice(0, count).reverse();
  crates[start - 1] = st.slice(count);
  en.unshift(...toPush);
};

export const moveCrates2 = (crates: Crates, { start, end, count }: Move) => {
  const st = crates[start - 1];
  const en = crates[end - 1];
  if (!st || !en) {
    throw new Error(`invalid crate indices ${start} to ${end}`);
  }
  const toPush = st.slice(0, count);
  crates[start - 1] = st.slice(count);
  en.unshift(...toPush);
};

const parseCrateRow = (s: string): CrateRow => {
  const m = s.match(rowPat);
  const out = new Map<number, string>();
  if (m) {
    m.forEach((v, ix) => {
      if (v.trim()) {
        out.set(ix, v.slice(1, 2));
      }
    });
    return out;
  } else {
    throw new Error(`${s} didn't match ${rowPat}`);
  }
};

const addCrates = (cs: Crates, row: CrateRow) => {
  for (const [ix, v] of row.entries()) {
    cs[ix].push(v);
  }
};

const newCrates = (): Crates => [[], [], [], [], [], [], [], [], []];

const parseMove = (s: string): Move => {
  const m = s.match(movePat);
  if (m) {
    return {
      start: parseInt(m[2]),
      end: parseInt(m[3]),
      count: parseInt(m[1]),
    };
  } else {
    throw new Error(`${s} didn't match ${movePat}`);
  }
};

const parseLine = (s: string): M => {
  try {
    const m = parseCrateRow(s);
    return { tag: MResult.Row, value: m };
  } catch (e) {
    try {
      const m = parseMove(s);
      return { tag: MResult.Move, value: m };
    } catch (e) {
      if (!s || !!s.match(breakPat)?.length) {
        return { tag: MResult.Null, value: null };
      } else {
        throw new Error(`${s} doesn't match any patterns`);
      }
    }
  }
};

export const topCrates = (cs: Crates): string => cs.map((c) => c[0]).join("");

const d5 = (s: string, mover: Function): Crates => {
  const cs = newCrates();
  const lines = s.split(/\n+/);
  for (const line of lines) {
    const m = parseLine(line);
    switch (m.tag) {
      case MResult.Row:
        addCrates(cs, m.value as CrateRow);
        break;
      case MResult.Move:
        mover(cs, m.value as Move);
        break;
      default:
    }
  }
  return cs;
};

export const day5_1 = (s: string) => d5(s, moveCrates);
export const day5_2 = (s: string) => d5(s, moveCrates2);

async function main() {
  const input = await Deno.readTextFile("day5_input.txt");
  const part1 = day5_1(input);
  const part2 = day5_2(input);
  console.log(`part 1: ${topCrates(part1)}`);
  console.log(`part 2: ${topCrates(part2)}`);
}

main();
