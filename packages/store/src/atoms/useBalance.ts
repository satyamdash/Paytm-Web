import { useRecoilValue } from "recoil";
import { balanceState } from "./balance";

export const useBalance = () => {
  return useRecoilValue(balanceState);
};
