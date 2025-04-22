import { Button } from "../ui/button";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function WalletConnect() {
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setError(null);
      connect({ connector: injected() });
    } catch (err) {
      setError("Failed to connect wallet. Please make sure MetaMask is installed and unlocked.");
      console.error(err);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Voter Dashboard</CardTitle>
        <CardDescription>
          Connect your MetaMask wallet to access the voter dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isConnected ? (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-sm font-medium">Connected Address</p>
              <p className="text-xs overflow-hidden text-ellipsis">{address}</p>
            </div>
            <Button variant="outline" onClick={handleDisconnect} className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
