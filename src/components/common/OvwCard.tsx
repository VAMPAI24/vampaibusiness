import { formatterUSD } from "@/lib/utils";
import Image from "next/image";
import ovwcircles from "@/public/svgs/ovwcircles.svg";

interface ovwProps {
  title: string;
  value: number;
}

export const Ovwcard: React.FC<ovwProps> = (props) => {
  return (
    <div className="relative overflow-hidden min-w-[60%] md:min-w-[45%] lg:min-w-[345px] h-[110px] bg-main-100 border-[.8px] border-main-300 rounded-[10px] px-[25px] py-[20px]">
      <p className="font-rubik font-[200] text-[.8em] uppercase">
        {props.title}
      </p>
      <h3 className="font-rubik relative z-[5] text-main-901 font-[600] text-[2.5em] ">
        {" "}
        {formatterUSD.format(props.value)}{" "}
      </h3>

      <Image
        className="absolute z-[10] top-0 right-0 opacity-[.2]"
        style={{ zIndex: 0 }}
        src={ovwcircles}
        alt="circles"
      />
    </div>
  );
};
