interface TitleRoundedListProps {
  data?: string[];
  headerClass: string;
  title: string;
  addOn?: string;
}
export const TitleRoundedList: React.FC<TitleRoundedListProps> = (props) => {
  const { data, headerClass, title, addOn } = props;
  return (
    <div className="w-full flex flex-col gap-[1em]">
      <h5 className={headerClass}>{title}</h5>
      <div className="w-full flex items-center flex-wrap gap-[.5em]">
        {(data ?? [])?.map((item, id) => (
          <span
            key={id.toString()}
            className={`min-w-fit flex items-center gap-[.5em] h-fit bg-neutral-200 text-center text-neutral-700 text-[.875em] font-[300]  px-[1.5em]  py-[.75em]  capitalize rounded-full hover:bg-main-600 hover:text-white  cursor-pointer ${addOn}`}
          >
            {item as string}
          </span>
        ))}
      </div>
    </div>
  );
};
