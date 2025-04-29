import { VOTER_DB_ABI, VOTER_DB_ADDRESS } from "@/constants";
import { toast } from "sonner";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useState } from "react";
import { ContractFunctionArgs } from "viem";

export type Gender = 0 | 1; // 0 = Male, 1 = Female

export type AddVoterParams = {
  name: string;
  age: number;
  gender: Gender;
  presentAddress: string;
};

export type UpdateVoterParams = AddVoterParams;

export function useVoterDatabaseFunction(functionName: string) {
  const { writeContractAsync, isPending } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const execute = async (args: ContractFunctionArgs = []) => {
    console.log("VoterDatabase Function:", functionName, args);
    const txHash = await toast
      .promise(
        writeContractAsync({
          functionName,
          abi: VOTER_DB_ABI,
          address: VOTER_DB_ADDRESS,
          args,
        }),
        {
          loading: "Waiting for wallet confirmation...",
          success: (data) => {
            setHash(data);
            return "Transaction sent!";
          },
          error: (err: BaseError) => {
            console.warn("Write Error:", err);
            return err.shortMessage || "Transaction failed.";
          },
        },
      )
      .unwrap();

    setHash(txHash);
    return { hash: txHash };
  };

  return {
    execute,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAddVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("addVoter");

  const addVoter = async ({ name, age, gender, presentAddress }: AddVoterParams) => {
    return execute([name, BigInt(age), gender, presentAddress]);
  };

  return {
    addVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useUpdateVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("updateVoter");

  const updateVoter = async ({ name, age, gender, presentAddress }: UpdateVoterParams) => {
    return execute([name, BigInt(age), gender, presentAddress]);
  };

  return {
    updateVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useDeleteVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("deleteVoter");

  const deleteVoter = async () => {
    return execute();
  };

  return {
    deleteVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useMarkVoted() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("markVoted");

  const markVoted = async () => {
    return execute();
  };

  return {
    markVoted,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}
