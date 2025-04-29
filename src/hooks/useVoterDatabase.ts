import { VOTER_DB_ABI, VOTER_DB_ADDRESS } from "@/constants";
import { toast } from "sonner";
import {
  BaseError,
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
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

export type VoterDetails = {
  name: string;
  age: bigint;
  gender: Gender;
  presentAddress: string;
  hasVoted: boolean;
};

export function useVoterDatabaseFunction(functionName: string) {
  const { address } = useAccount();
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
          account: address,
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

// Voter Registration Operations
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

// Voter Information Reading
export function useGetMyDetails() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "getMyDetails",
    account: address,
  });

  const formattedData: VoterDetails | undefined = data
    ? {
        name: data[0] as string,
        age: data[1] as bigint,
        gender: data[2] as Gender,
        presentAddress: data[3] as string,
        hasVoted: data[4] as boolean,
      }
    : undefined;

  return {
    voterDetails: formattedData,
    isLoading,
    isError,
    refetch,
  };
}

export function useGetMyRegistrationStatus() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "getMyRegistrationStatus",
    account: address,
  });

  return {
    isRegistered: data as boolean | undefined,
    isLoading,
    isError,
    refetch,
  };
}

export function useGetMyVotingStatus() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "getMyVotingStatus",
    account: address,
  });

  return {
    hasVoted: data as boolean | undefined,
    isLoading,
    isError,
    refetch,
  };
}

// Admin Functions
export function useAmIAdmin() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "amIAdmin",
    account: address,
  });

  return {
    isAdmin: data as boolean | undefined,
    isLoading,
    isError,
    refetch,
  };
}

export function useAdminAddVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminAddVoter");

  const adminAddVoter = async (
    voterAddress: `0x${string}`,
    { name, age, gender, presentAddress }: AddVoterParams,
    hasVoted: boolean = false,
  ) => {
    return execute([voterAddress, name, BigInt(age), gender, presentAddress, hasVoted]);
  };

  return {
    adminAddVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAdminUpdateVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminUpdateVoter");

  const adminUpdateVoter = async (
    voterAddress: `0x${string}`,
    { name, age, gender, presentAddress }: UpdateVoterParams,
    hasVoted: boolean,
  ) => {
    return execute([voterAddress, name, BigInt(age), gender, presentAddress, hasVoted]);
  };

  return {
    adminUpdateVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAdminRemoveVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminRemoveVoter");

  const adminRemoveVoter = async (voterAddress: `0x${string}`) => {
    return execute([voterAddress]);
  };

  return {
    adminRemoveVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAdminSetVotingStatus() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminSetVotingStatus");

  const adminSetVotingStatus = async (voterAddress: `0x${string}`, hasVoted: boolean) => {
    return execute([voterAddress, hasVoted]);
  };

  return {
    adminSetVotingStatus,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

// Admin Data Reading
export function useAdminGetVoterDetails(voterAddress: `0x${string}` | undefined) {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "adminGetVoterDetails",
    args: voterAddress ? [voterAddress] : undefined,
    account: address,
  });

  const formattedData: VoterDetails | undefined = data
    ? {
        name: data[0] as string,
        age: data[1] as bigint,
        gender: data[2] as Gender,
        presentAddress: data[3] as string,
        hasVoted: data[4] as boolean,
      }
    : undefined;

  return {
    voterDetails: formattedData,
    isLoading,
    isError,
    refetch,
  };
}

export function useAdminGetVoterCount() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "adminGetVoterCount",
    account: address,
  });

  return {
    voterCount: data as bigint | undefined,
    isLoading,
    isError,
    refetch,
  };
}

export function useAdminGetAllVoters() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "adminGetAllVoters",
    account: address,
  });

  return {
    voters: data as `0x${string}`[] | undefined,
    isLoading,
    isError,
    refetch,
  };
}

// Admin Management
export function useAddAdmin() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("addAdmin");

  const addAdmin = async (adminAddress: `0x${string}`) => {
    return execute([adminAddress]);
  };

  return {
    addAdmin,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useRemoveAdmin() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("removeAdmin");

  const removeAdmin = async (adminAddress: `0x${string}`) => {
    return execute([adminAddress]);
  };

  return {
    removeAdmin,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useGetAllAdmins() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "getAllAdmins",
    account: address,
  });

  return {
    admins: data as `0x${string}`[] | undefined,
    isLoading,
    isError,
    refetch,
  };
}

// Data Import Functions
export function useAdminImportVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminImportVoter");

  const adminImportVoter = async (sourceContract: `0x${string}`, voterAddress: `0x${string}`) => {
    return execute([sourceContract, voterAddress]);
  };

  return {
    adminImportVoter,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAdminBatchImportVoters() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminBatchImportVoters");

  const adminBatchImportVoters = async (
    sourceContract: `0x${string}`,
    voterAddresses: `0x${string}`[],
  ) => {
    return execute([sourceContract, voterAddresses]);
  };

  return {
    adminBatchImportVoters,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAdminImportAllVoters() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseFunction("adminImportAllVoters");

  const adminImportAllVoters = async (sourceContract: `0x${string}`) => {
    return execute([sourceContract]);
  };

  return {
    adminImportAllVoters,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}
