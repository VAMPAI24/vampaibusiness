// option
interface optionProps {
  id: string;
  title: string;
  subtitle: string;
  active: string;
  value: string;
  addOns?: string;
  handleOption: (value: string) => void;
}
export const Radiobox: React.FC<optionProps> = (props) => {
  const { id, title, subtitle, active, value, handleOption, addOns } = props;

  const handleClick = () => {
    handleOption(value);
  };

  const isSelected = active === value;
  return (
    <div
      onClick={handleClick}
      className={`w-full group px-[1em] py-[.87em] md:px-[1.25em]  md:py-[1.1em]  2xl:px-[1.5em] 2xl:py-[1.25em] rounded-[10px] border-[1px] border-main-100 cursor-pointer ${
        active === value ? "bg-main-600" : "bg-sec-100"
      } hover:bg-main-600 `}
    >
      <div
        className={`w-full flex items-end justify-between  gap-[15px] ${addOns} `}
      >
        {/* xl:max-w-[75%] */}
        <span
          className={`max-w-[70%] md:max-w-[60%] 2xl:max-w-[60%] flex flex-col gap-[5px] ${
            value === active ? "text-white" : "text-main-901"
          } group-hover:text-white `}
        >
          <p className="my-0 font-rubik text-[1em] xl:text-[1.25em] 2xl:text-[1.5em] leading-[1em] font-[400] capitalize">
            {title}
          </p>
          <p className="my-0 font-jakarta text-[.875em] 2xl:text-[1.25em] font-[300] ">
            {subtitle}
          </p>
        </span>

        {/* <input
          id={id}
          value={value}
          type="radio"
          // checked={(active === value)}
          defaultChecked={false}
          className={`appearance-none inline-block !w-6 !h-6 border-2 rounded-full focus:outline-none ${
            isSelected
              ? "checked:border-main-200 checked:bg-white"
              : "unchecked:border-gray-600 unchecked:bg-white"
          }`}
        /> */}
        <input
          id={id}
          value={value}
          type="radio"
          checked={isSelected}
          className={`appearance-none inline-block !w-6 !h-6 border-2 rounded-full focus:outline-none ${
            isSelected ? "border-main-200 bg-white" : "border-gray-400 bg-white"
          }`}
        />
        {/* <label htmlFor={id}></label> */}
      </div>
    </div>
  );
};
