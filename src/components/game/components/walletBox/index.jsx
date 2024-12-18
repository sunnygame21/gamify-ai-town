import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { fetcher } from "@/utils/fetcher";
import { useMemo, useState, useEffect, useCallback } from "react";
import { decodeUTF8 } from "tweetnacl-util";
import bs58 from "bs58";
import useSWR from "swr";

export default function WalletBox() {
  const { publicKey, disconnect, signMessage, connected } = useWallet();
  const { connection } = useConnection();

  const [logining, setLogining] = useState(false);

  const {
    data: profile,
    mutate: mutateProfile,
    isLoading: isLoadingProfile
  } = useSWR(publicKey ? "/api/user/profile" : null, fetcher);

  const handleLogin = useCallback(async () => {
    if (!publicKey || logining) {
      return;
    }

    setLogining(true);

    try {
      if (!signMessage) {
        throw new Error("Sign message is not available");
      }

      const msg = await fetch(
        `/api/user/signature?publicKey=${publicKey.toBase58()}`
      ).then((res) => res.text());

      const signature = await signMessage(decodeUTF8(msg));

      await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          signature: bs58.encode(signature)
        })
      });

      await mutateProfile();
    } catch (error) {
      console.error("Error signing message:", error);
      disconnect();
    } finally {
      setLogining(false);
    }
  }, [publicKey, logining, signMessage, mutateProfile, disconnect]);

  const authenticated = useMemo(() => {
    if (!publicKey) {
      return "unconnected";
    }

    if (profile === undefined && isLoadingProfile) {
      return "loading";
    }

    if (profile?.id) {
      return "logged";
    }

    return "unauthenticated";
  }, [publicKey, profile, isLoadingProfile]);

  useEffect(() => {
    if (authenticated === "unauthenticated") {
      handleLogin();
    }
  }, [authenticated, handleLogin]);

  const handleLogout = useCallback(async () => {
    await disconnect();
    await fetch("/api/user/logout", { method: "POST" });
    await mutateProfile(undefined, {
      revalidate: false,
      populateCache: true
    });
  }, [disconnect, mutateProfile]);

  return (
    <div className="absolute top-0 right-0">
      {(() => {
        switch (authenticated) {
          case "unconnected":
            return <WalletMultiButton></WalletMultiButton>;
          case "unauthenticated":
            return <span className="">Loging in...</span>;
          case "loading":
            return <span className="">Connecting...</span>;
          case "logged":
            return (
              <>
                <WalletMultiButton></WalletMultiButton>
                <div className="bg-white rounded-md p-2 space-y-2">
                  <p>Name: {profile.name}</p>
                  <button
                    className="underline hover:text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
