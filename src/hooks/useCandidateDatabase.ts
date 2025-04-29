import { CANDIDATE_DB_ABI, CANDIDATE_DB_ADDRESS } from "@/constants";
import { toast } from "sonner";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useState } from "react";
import { ContractFunctionArgs } from "viem";

export type AddCandidateParams = {
  name: string;
  age: number;
  email: string;
  qualifications: string;
  manifesto: string;
};

export type UpdateCandidateParams = AddCandidateParams;

export function useCandidateDatabaseFunction(functionName: string) {
  const { writeContractAsync, isPending } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const execute = async (args: ContractFunctionArgs = []) => {
    console.log("CandidateDatabase Function:", functionName, args);
    const txHash = await toast
      .promise(
        writeContractAsync({
          functionName,
          abi: CANDIDATE_DB_ABI,
          address: CANDIDATE_DB_ADDRESS,
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

export function useAddCandidate() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useCandidateDatabaseFunction("addCandidate");

  const addCandidate = async ({
    name,
    age,
    email,
    qualifications,
    manifesto,
  }: AddCandidateParams) => {
    return execute([name, BigInt(age), email, qualifications, manifesto]);
  };

  return {
    addCandidate,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useUpdateCandidate() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useCandidateDatabaseFunction("updateCandidate");

  const updateCandidate = async ({
    name,
    age,
    email,
    qualifications,
    manifesto,
  }: UpdateCandidateParams) => {
    return execute([name, BigInt(age), email, qualifications, manifesto]);
  };

  return {
    updateCandidate,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useDeleteCandidate() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useCandidateDatabaseFunction("deleteCandidate");

  const deleteCandidate = async (candidateAddress: `0x${string}`) => {
    return execute([candidateAddress]);
  };

  return {
    deleteCandidate,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}
