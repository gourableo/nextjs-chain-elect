"use client";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useState, useEffect, useCallback } from "react";
import { VOTER_DB_ABI, VOTER_DB_ADDRESS } from "@/constants";

export function useVoterContract() {
  const { address, isConnected } = useAccount();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [voterDetails, setVoterDetails] = useState<{
    name: string;
    age: number;
    hasVoted: boolean;
  } | null>(null);

  // Contract read calls - remove 'enabled' prop as it's not supported in Wagmi v2
  const { data: registrationStatus, refetch: refetchRegistrationStatus } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "getMyRegistrationStatus",
    account: address,
  });

  const { data: voterData, refetch: refetchVoterData } = useReadContract({
    address: VOTER_DB_ADDRESS,
    abi: VOTER_DB_ABI,
    functionName: "getMyDetails",
    account: address,
  });

  // Contract write calls
  const {
    data: addVoterHash,
    isPending: isAddingVoter,
    writeContract: addVoter,
  } = useWriteContract();
  const {
    data: updateVoterHash,
    isPending: isUpdatingVoter,
    writeContract: updateVoter,
  } = useWriteContract();

  // Transaction receipts
  const { isLoading: isAddTxLoading } = useWaitForTransactionReceipt({
    hash: addVoterHash,
  });

  const { isLoading: isUpdateTxLoading } = useWaitForTransactionReceipt({
    hash: updateVoterHash,
  });

  // Wrapped refetch methods with useCallback to avoid unnecessary re-renders
  const wrappedRefetchRegistrationStatus = useCallback(() => {
    if (isConnected && address) {
      refetchRegistrationStatus();
    }
  }, [refetchRegistrationStatus, isConnected, address]);

  const wrappedRefetchVoterData = useCallback(() => {
    if (isConnected && address && isRegistered) {
      refetchVoterData();
    }
  }, [refetchVoterData, isConnected, address, isRegistered]);

  // Handle voter registration
  const registerVoter = useCallback(
    (name: string, age: number) => {
      if (isConnected && address) {
        addVoter({
          address: VOTER_DB_ADDRESS,
          abi: VOTER_DB_ABI,
          functionName: "addVoter",
          args: [name, age],
        });
      }
    },
    [addVoter, isConnected, address],
  );

  // Handle voter update
  const updateVoterInfo = useCallback(
    (name: string, age: number) => {
      if (isConnected && address) {
        updateVoter({
          address: VOTER_DB_ADDRESS,
          abi: VOTER_DB_ABI,
          functionName: "updateVoter",
          args: [name, age],
        });
      }
    },
    [updateVoter, isConnected, address],
  );

  // Update local state when contract data changes
  useEffect(() => {
    if (registrationStatus !== undefined) {
      setIsRegistered(!!registrationStatus);
    }
  }, [registrationStatus]);

  // Only fetch voter details if the user is registered
  useEffect(() => {
    if (isConnected && isRegistered) {
      wrappedRefetchVoterData();
    }
  }, [isConnected, isRegistered, wrappedRefetchVoterData]);

  useEffect(() => {
    if (voterData) {
      setVoterDetails({
        name: voterData[0] as string,
        age: Number(voterData[1]),
        hasVoted: voterData[2] as boolean,
      });
    }
  }, [voterData]);

  // Refetch data when transaction completes
  useEffect(() => {
    if (!isAddTxLoading && addVoterHash) {
      wrappedRefetchRegistrationStatus();
    }
  }, [isAddTxLoading, addVoterHash, wrappedRefetchRegistrationStatus]);

  useEffect(() => {
    if (!isUpdateTxLoading && updateVoterHash) {
      wrappedRefetchVoterData();
    }
  }, [isUpdateTxLoading, updateVoterHash, wrappedRefetchVoterData]);

  // Initial fetch when component mounts
  useEffect(() => {
    if (isConnected && address) {
      wrappedRefetchRegistrationStatus();
    }
  }, [isConnected, address, wrappedRefetchRegistrationStatus]);

  return {
    isConnected,
    isRegistered,
    voterDetails,
    registerVoter,
    updateVoterInfo,
    isRegistering: isAddingVoter || isAddTxLoading,
    isUpdating: isUpdatingVoter || isUpdateTxLoading,
    refetchRegistrationStatus: wrappedRefetchRegistrationStatus,
    refetchVoterData: wrappedRefetchVoterData,
  };
}
