import { ContractInfo } from "@/types";
import VoterDatabase from "./VoterDatabase.json" assert { type: "json" };

const typedVoterDb = VoterDatabase as ContractInfo;

export const VOTER_DB_ADDRESS = typedVoterDb.addresses.sepolia;
export const VOTER_DB_ABI = typedVoterDb.abi;
