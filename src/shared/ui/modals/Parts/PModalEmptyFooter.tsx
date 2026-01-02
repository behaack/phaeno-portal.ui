export interface IProps {
  children: React.ReactNode;
}

export function PModalEmptyFooter({ children }: IProps) {
  return (
    <div className="px-5  py-3 flex justify-between items-center">
      { children}
    </div>
  )
}