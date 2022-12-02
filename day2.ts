export const enum RPS {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

export const enum Winner {
  Them = 0,
  Tie = 3,
  Me = 6,
}

const fromLeft = (v: string) => {
  switch (v) {
    case "A":
      return RPS.Rock;
    case "B":
      return RPS.Paper;
    case "C":
      return RPS.Scissors;
    default:
      throw new Error(`Invalid left-hand input ${v}`);
  }
};

const fromRight = (v: string) => {
  switch (v) {
    case "X":
      return RPS.Rock;
    case "Y":
      return RPS.Paper;
    case "Z":
      return RPS.Scissors;
    default:
      throw new Error(`Invalid right-hand input ${v}`);
  }
};

const winner = (them: RPS, me: RPS) => {
  switch (them) {
    case RPS.Rock:
      switch (me) {
        case RPS.Rock:
          return Winner.Tie;
        case RPS.Paper:
          return Winner.Me;
        case RPS.Scissors:
          return Winner.Them;
        default:
          throw new Error(`Invalid pair (${them}, ${me})`);
      }
    case RPS.Paper:
      switch (me) {
        case RPS.Rock:
          return Winner.Them;
        case RPS.Paper:
          return Winner.Tie;
        case RPS.Scissors:
          return Winner.Me;
        default:
          throw new Error(`Invalid pair (${them}, ${me})`);
      }
    case RPS.Scissors:
      switch (me) {
        case RPS.Rock:
          return Winner.Me;
        case RPS.Paper:
          return Winner.Them;
        case RPS.Scissors:
          return Winner.Tie;
        default:
          throw new Error(`Invalid pair (${them}, ${me})`);
      }
  }
};

export const scorePair = (them: RPS, me: RPS) => {
  const w = winner(them, me);
  return w + me;
};

const readInput = () => Deno.readTextFile("day2_input.txt");
const toPairs = (s: string) => s.split(/\n/);
const parsePair = (s: string) => {
  const [them, me] = s.split(" ");
  if (!!them && !!me) {
    return [fromLeft(them), fromRight(me)];
  } else {
    return [];
  }
};
const asPairs = () => readInput().then(toPairs);

export const scorePairs = (pairs: Array<string>) => {
  return pairs.reduce((acc: number, s: string) => {
    const p = parsePair(s);
    if (p.length === 2 && !!p[0] && !!p[1]) {
      const [them, me] = p;
      acc += scorePair(them, me);
    }
    return acc;
  }, 0);
};

// async function day2_1() {
//   const pairs = await asPairs();
//   const score = scorePairs(pairs);
//   console.log(`final score: ${score}`);
// }

// day2_1();
//

const fromRight2 = (v: string) => {
  switch (v) {
    case "X":
      return Winner.Them;
    case "Y":
      return Winner.Tie;
    case "Z":
      return Winner.Me;
    default:
      throw new Error(`invalid winner ${v}`);
  }
};

export const score2 = (them: RPS, me: Winner) => {
  switch (them) {
    case RPS.Rock:
      switch (me) {
        case Winner.Them:
          return 3; // scissors
        case Winner.Tie:
          return 4; // rock
        case Winner.Me:
          return 8; // paper
      }
    /* falls through */
    case RPS.Paper:
      switch (me) {
        case Winner.Them:
          return 1; // rock
        case Winner.Tie:
          return 5; // paper
        case Winner.Me:
          return 9; // scissors
      }
    /* falls through */
    case RPS.Scissors:
      switch (me) {
        case Winner.Them:
          return 2; // paper
        case Winner.Tie:
          return 6; // scissors
        case Winner.Me:
          return 7; // rock
      }
    /* falls through */
    default:
      throw new Error(`invalid pair [${them}, ${me}]`);
  }
};

export const parsePair2 = (s: string): [RPS, Winner] | undefined => {
  const [them, me] = s.split(" ");
  if (!!them && !!me) {
    return [fromLeft(them), fromRight2(me)];
  } else {
    return undefined;
  }
};

export const scorePairs2 = (pairs: Array<string>) => {
  return pairs.reduce((acc: number, s: string) => {
    const p = parsePair2(s);
    if (!!p && p.length === 2) {
      const [them, me] = p;
      acc += score2(them, me);
    }
    return acc;
  }, 0);
};

async function day2_2() {
  const pairs = await asPairs();
  const score = scorePairs2(pairs);
  console.log(`final score 2: ${score}`);
}

day2_2();
