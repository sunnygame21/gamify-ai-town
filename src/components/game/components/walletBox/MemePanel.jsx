import Image from "next/image";

export default function MemePanel({ meme = "0" }) {
  return (
    <div className="relative min-w-40 h-8 bg-black rounded-md pr-2 pl-8 pt-1.5">
      <Image
        src="/assets/images/meme_icon.png"
        className="absolute -top-1 -left-5"
        alt="meme"
        width={38}
        height={38}
      />
      <div className="font-kemco text-[#303030] relative">
        {meme} MEME
        <span className="font-kemco text-white absolute -top-[2px] -left-[2px]">
          {meme} MEME
        </span>
      </div>
    </div>
  );
}
