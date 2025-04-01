import { atom } from "recoil";

export const balanceState = atom<number>({
  key: "balance",
  default: 0,
});
