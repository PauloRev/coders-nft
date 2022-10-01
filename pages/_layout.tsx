import { ReactNode } from "react"
import Navbar from "./_navbar"
import Footer from "./_footer"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[#1d1f2b]">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}