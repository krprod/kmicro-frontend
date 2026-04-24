import Header from "./Header"
import type { ReactNode } from "react"

interface PrivateLayoutProps {
  children: ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <>
      <Header showSearch={false} />
      {children}
    </>
  )
}

export default PrivateLayout
