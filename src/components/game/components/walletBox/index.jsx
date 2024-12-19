import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { fetcher } from "@/utils/fetcher";
import { useMemo, useState, useEffect, useCallback } from "react";
import { decodeUTF8 } from "tweetnacl-util";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
import useSWR from "swr";
import LoginBtn from "../svgs/LoginBtn";
import HelpBtn from "../svgs/HelpBtn";
import WalletPanel from "./WalletPanel";
import MemePanel from "./MemePanel";
import PointPanel from "./PointPanel";
import SolPanel from "./SolPanel";

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

  const balance = useMemo(async () => {
    // get sol balance
    if (!publicKey) {
      return 0;
    }

    const rawBalance = await connection.getBalance(publicKey);

    return (rawBalance / LAMPORTS_PER_SOL).toFixed(2);
  }, [publicKey, connection]);

  return (
    <div className="absolute top-2 right-4 flex items-center space-x-8">
      <button>
        <HelpBtn />
      </button>
      {(() => {
        switch (authenticated) {
          case "unconnected":
            return (
              <WalletMultiButton
                style={{
                  width: "145px",
                  height: "36px",
                  padding: "0",
                  background: "none",
                  border: "none"
                }}
              >
                <LoginBtn />
              </WalletMultiButton>
            );
          case "unauthenticated":
            return <span className="font-kemco text-white">Loging in...</span>;
          case "loading":
            return <span className="font-kemco text-white">Connecting...</span>;
          case "logged":
            return (
              <>
                <SolPanel sol={balance} />
                <PointPanel point={profile.point} />
                <MemePanel meme={profile.meme} />
                <WalletPanel wallet={publicKey.toBase58()} />
                <div className="space-y-2">
                  <button
                    className="font-kemco text-[#221E22] relative"
                    onClick={handleLogout}
                  >
                    Logout
                    <span className="font-kemco text-white absolute -top-[2px] -left-[2px]">
                      Logout
                    </span>
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
