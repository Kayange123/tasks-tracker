interface ListWrapperProps {
  children: React.ReactNode;
}
const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className="shrink-0 h-full select-none w-[272px]">{children}</li>;
};

export default ListWrapper;
