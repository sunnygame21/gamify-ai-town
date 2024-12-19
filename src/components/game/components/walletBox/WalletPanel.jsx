import Image from "next/image";

export default function WalletPanel({ wallet }) {
  if (!wallet) return null;

  const walletAddress = wallet.slice(0, 3) + "..." + wallet.slice(-4);

  return (
    <div className="relative w-40 h-8 bg-black rounded-md pr-2 pl-7 pt-1.5">
      <Image
        src="/assets/images/wallet_icon.png"
        className="absolute -top-2 -left-5"
        alt="wallet"
        width={46}
        height={46}
      />
      <div className="font-kemco text-[#303030] relative">
        {walletAddress}
        <span className="font-kemco text-white absolute -top-[2px] -left-[2px]">
          {walletAddress}
        </span>
      </div>
    </div>
  );
}
