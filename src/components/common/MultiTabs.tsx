type multiTabsProps = {
  active?: number;
  tabs: string[] | number[];
  clickFn: (id: number) => void;
};
export const MultiTab = (props: multiTabsProps) => {
  const { active, tabs, clickFn } = props;

  return (
    <div className="w-fit bg-main-200 rounded-[.25em] p-[.2em] flex items-center gap-[5px]">
      {tabs.map((item, id) => (
        <p
          onClick={() => clickFn(id)}
          className={` w-fit px-[1em] md:px-[2em] py-[.5em] leading-[1.25em] rounded-[.25em]  text-center whitespace-nowrap cursor-pointer capitalize
              ${
                id === active
                  ? "font-[600] bg-main-600 text-white"
                  : "font-[400] bg-transparent text-main-500"
              } `}
          key={id.toString()}
        >
          {item}
        </p>
      ))}
    </div>
  );
};
