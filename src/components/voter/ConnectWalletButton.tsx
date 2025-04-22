"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Loader2 } from "lucide-react";

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Button variant="outline" onClick={() => disconnect()} className="font-mono">
        {address?.slice(0, 6)}...{address?.slice(-4)} &#x2715;
      </Button>
    );
  }

  return (
    <Button onClick={() => connect({ connector: injected() })} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}
