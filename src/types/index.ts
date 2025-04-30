import { Abi } from "viem";

export type NavLink = {
  href: string;
  label: string;
};

export type ContractInfo = {
  addresses: {
    [network: string]: `0x${string}`;
  };
  abi: Abi;
};

export const GenderEnum = {
  MALE: 0,
  FEMALE: 1,
};
