import { FC, ReactElement, ReactNode } from 'react'

const CenterContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-11/12 max-w-[88.5rem] mx-auto">{children}</div>
}
export default CenterContent
