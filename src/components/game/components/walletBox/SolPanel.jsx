import Image from "next/image";

export default function SolPanel({ sol = "0" }) {
  return (
    <div className="relative w-40 h-8 bg-black rounded-md pr-8 pl-7 pt-1.5">
      <div className="absolute -top-1 -left-5 bg-black rounded-full w-10 h-10 flex items-center justify-center">
        <Image
          src="/assets/images/sol_icon.png"
          alt="sol"
          width={25}
          height={25}
        />
      </div>
      <div className="font-kemco text-[#303030] relative">
        {sol} SOL
        <span className="font-kemco text-white absolute -top-[2px] -left-[2px]">
          {sol} SOL
        </span>
      </div>
    </div>
  );
}
