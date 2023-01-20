import { IPurchase } from "./interfaces";

const idGenerator = (arr: IPurchase[]): number => {
  if (!arr.length) {
    return 1;
  }

  const lastArrItem: IPurchase = arr
    .sort((a, b) => a.id - b.id)
    .pop() as IPurchase;

  return lastArrItem.id + 1;
};

export default idGenerator;
