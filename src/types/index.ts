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
} as const;
export type Gender = (typeof GenderEnum)[keyof typeof GenderEnum];

export type VoterContractParams = {
  name: string;
  dateOfBirthEpoch: bigint;
  gender: Gender;
  presentAddress: string;
};

export type VoterDetails = {
  name: string;
  dateOfBirthEpoch: bigint;
  gender: Gender;
  presentAddress: string;
  hasVoted: boolean;
  timeWhenRegisteredEpoch?: bigint;
};

export type CandidateDetails = {
  name: string;
  dateOfBirthEpoch: bigint;
  gender: Gender;
  presentAddress: string;
  email: string;
  qualifications: string;
  manifesto: string;
  timeWhenRegisteredEpoch: bigint;
};

export type CandidateContractParams = {
  name: string;
  dateOfBirthEpoch: bigint;
  gender: Gender;
  presentAddress: string;
  email: string;
  qualifications: string;
  manifesto: string;
};
