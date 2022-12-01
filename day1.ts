const f = async () => Deno.readTextFile("day1_input.txt");

const splitGroups = (s: string) => s.split(/\n\n/);
const splitGroup = (s: string) => s.split(/\n/);

const sumGroup = (ss: Array<string>) =>
  ss.reduce((acc, v) => {
    const p = parseInt(v);
    return isNaN(p) ? acc : acc + p;
  }, 0);

const max = (xs: Array<number>) =>
  xs.reduce((acc, v) => (v > acc ? v : acc), 0);

const prep = async () => {
  const input = await f();
  const groups = splitGroups(input);
  return groups.map((g) => sumGroup(splitGroup(g)));
};

const day1_1 = async () => {
  const summed = await prep();
  console.log(`max amount is ${max(summed)}`);
};

const max3 = (xs: Array<number>) =>
  xs.sort((a, b) => (a < b ? 11 : a === b ? 0 : -1)).slice(0, 3);

const day1_2 = async () => {
  const summed = await prep();
  const top3 = max3(summed);
  console.log(top3);
  const sum = top3.reduce((acc, v) => acc + v, 0);
  console.log(`sum of top 3 is ${sum}`);
};

await day1_2();
