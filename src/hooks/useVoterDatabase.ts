import { VOTER_DB_ABI, VOTER_DB_ADDRESS } from "@/constants";
import { toast } from "sonner";
import {
  BaseError,
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect, useState } from "react";
import { ContractFunctionArgs } from "viem";
import { Gender, VoterContractParams, VoterDetails } from "@/types";

// CORE HOOKS FOR READ AND WRITE OPERATIONS
export function useVoterDatabaseWriteFunction(functionName: string) {
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Listen for transaction confirmation
  useEffect(() => {
    if (isConfirmed && hash) {
      toast.success("Transaction confirmed on the blockchain");
    }
  }, [isConfirmed, hash]);

  const execute = async (
    args: ContractFunctionArgs = [],
    customToastMessages?: {
      loading?: string;
      success?: string;
      error?: string;
      confirmed?: string;
    },
  ) => {
    console.log("VoterDatabase Function Called!:", functionName, args);
    try {
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
            loading: customToastMessages?.loading || "Waiting for wallet confirmation...",
            success: (data) => {
              setHash(data);
              return (
                customToastMessages?.success ||
                "Transaction submitted! Waiting for confirmation..."
              );
            },
            error: (err: BaseError) => {
              return customToastMessages?.error || err.shortMessage || "Transaction failed.";
            },
          },
        )
        .unwrap();

      setHash(txHash);
      return { hash: txHash };
    } catch (err) {
      const error = err as BaseError;
      // if user intentionally rejected or denied, just warn
      if (
        error.shortMessage.toLowerCase().includes("user rejected") ||
        error.shortMessage.toLowerCase().includes("user denied")
      ) {
        console.warn("Write Error:", error.message);
      } else {
        console.error("Write Error:", error);
      }
      return { hash: undefined };
    }
  };

  return {
    execute,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useVoterDatabaseReadFunction<T>(
  functionName: string,
  args?: ContractFunctionArgs,
) {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName,
    args,
    account: address,
  });

  return {
    data: data as T | undefined,
    isLoading,
    isError,
    refetch,
  };
}

// Voter Management Operations
export function useAddVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseWriteFunction("addVoter");

  const addVoter = async ({ name, dateOfBirthEpoch, gender, presentAddress }: VoterContractParams) => {
    return execute([name, dateOfBirthEpoch, gender, presentAddress], {
      loading: "Submitting voter registration...",
      success: "Registration submitted! Waiting for blockchain confirmation...",
      error: "Failed to register as voter",
      confirmed: "Your voter registration has been confirmed!",
    });
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
    useVoterDatabaseWriteFunction("updateVoter");

  const updateVoter = async ({ name, dateOfBirthEpoch, gender, presentAddress }: VoterContractParams) => {
    return execute([name, dateOfBirthEpoch, gender, presentAddress], {
      loading: "Updating voter information...",
      success: "Update submitted! Waiting for blockchain confirmation...",
      error: "Failed to update voter information",
      confirmed: "Your voter information has been updated successfully!",
    });
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
    useVoterDatabaseWriteFunction("deleteVoter");

  const deleteVoter = async () => {
    return execute([], {
      loading: "Cancelling voter registration...",
      success: "Cancellation submitted! Waiting for blockchain confirmation...",
      error: "Failed to cancel voter registration",
      confirmed: "Your voter registration has been cancelled successfully!",
    });
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
    useVoterDatabaseWriteFunction("markVoted");

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
  const { data, isLoading, isError, refetch } =
    useVoterDatabaseReadFunction<[string, bigint, Gender, string, boolean]>("getMyDetails");

  const formattedData: VoterDetails | undefined = data
    ? {
        name: data[0],
        dateOfBirthEpoch: data[1],
        gender: data[2],
        presentAddress: data[3],
        hasVoted: data[4],
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
  const { data, isLoading, isError, refetch } = useVoterDatabaseReadFunction<boolean>(
    "getMyRegistrationStatus",
  );

  return {
    isRegistered: data,
    isLoading,
    isError,
    refetch,
  };
}

export function useGetMyVotingStatus() {
  const { data, isLoading, isError, refetch } =
    useVoterDatabaseReadFunction<boolean>("getMyVotingStatus");

  return {
    hasVoted: data,
    isLoading,
    isError,
    refetch,
  };
}

// Admin Functions
export function useAmIAdmin() {
  const { data, isLoading, isError, refetch } = useVoterDatabaseReadFunction<boolean>("amIAdmin");

  return {
    isAdmin: data,
    isLoading,
    isError,
    refetch,
  };
}

export function useAdminAddVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseWriteFunction("adminAddVoter");

  const adminAddVoter = async (
    voterAddress: `0x${string}`,
    { name, dateOfBirthEpoch, gender, presentAddress }: VoterContractParams,
    hasVoted: boolean = false,
  ) => {
    return execute([voterAddress, name, dateOfBirthEpoch, gender, presentAddress, hasVoted]);
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
    useVoterDatabaseWriteFunction("adminUpdateVoter");

  const adminUpdateVoter = async (
    voterAddress: `0x${string}`,
    { name, dateOfBirthEpoch, gender, presentAddress }: VoterContractParams,
    hasVoted: boolean,
  ) => {
    return execute([voterAddress, name, dateOfBirthEpoch, gender, presentAddress, hasVoted]);
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
    useVoterDatabaseWriteFunction("adminRemoveVoter");

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
    useVoterDatabaseWriteFunction("adminSetVotingStatus");

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
  const { data, isLoading, isError, refetch } = useVoterDatabaseReadFunction<
    [string, bigint, Gender, string, boolean, bigint]
  >("adminGetVoterDetails", voterAddress ? [voterAddress] : undefined);

  const formattedData: VoterDetails | undefined = data
    ? {
        name: data[0],
        dateOfBirthEpoch: data[1],
        gender: data[2],
        presentAddress: data[3],
        hasVoted: data[4],
        timeWhenRegisteredEpoch: data[5],
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
  const { data, isLoading, isError, refetch } =
    useVoterDatabaseReadFunction<bigint>("adminGetVoterCount");

  return {
    voterCount: data,
    isLoading,
    isError,
    refetch,
  };
}

export function useAdminGetAllVoters() {
  const { data, isLoading, isError, refetch } =
    useVoterDatabaseReadFunction<`0x${string}`[]>("adminGetAllVoters");

  return {
    voters: data,
    isLoading,
    isError,
    refetch,
  };
}

// Admin Management
export function useAddAdmin() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseWriteFunction("addAdmin");

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
    useVoterDatabaseWriteFunction("removeAdmin");

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
  const { data, isLoading, isError, refetch } =
    useVoterDatabaseReadFunction<`0x${string}`[]>("getAllAdmins");

  return {
    admins: data,
    isLoading,
    isError,
    refetch,
  };
}

// Data Import Functions
export function useAdminImportVoter() {
  const { execute, isPending, isConfirming, isConfirmed, hash } =
    useVoterDatabaseWriteFunction("adminImportVoter");

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
    useVoterDatabaseWriteFunction("adminBatchImportVoters");

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
    useVoterDatabaseWriteFunction("adminImportAllVoters");

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
