import PointIcon from "../svgs/PointIcon";
import PointPlus from "../svgs/PointPlus";
export default function PointPanel({ point = "0" }) {
  return (
    <div className="relative w-40 h-8 bg-black rounded-md pr-8 pl-7 pt-1.5">
      <PointIcon className="absolute -top-1 -left-5" />
      <div className="font-kemco text-[#303030] relative">
        {point} POINT
        <span className="font-kemco text-white absolute -top-[2px] -left-[2px]">
          {point} POINT
        </span>
      </div>
      <PointPlus className="absolute top-1 right-1 cursor-pointer" />
    </div>
  );
}
