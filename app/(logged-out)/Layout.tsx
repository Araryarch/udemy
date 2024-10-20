import Link from 'next/link'
import ThemeToggle from '../../components/ui/theme-toggle'
type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background xl:flex-row">
      <div className='left relative h-[30vh] w-full bg-[url("./background.jpg")] bg-cover bg-right xl:min-h-screen xl:w-1/2'>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-background to-transparent xl:bg-gradient-to-l"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-background to-transparent xl:bg-gradient-to-t"></div>
      </div>
      <div className="right flex h-[70vh] w-full flex-col items-center justify-center gap-2 xl:min-h-screen xl:w-1/2">
        {children}
      </div>
      <div className="nav fixed left-0 right-0 top-0 flex justify-between p-10 backdrop-blur-sm">
        <Link href={'/'}>
          <h1 className="text-3xl text-destructive">Anidash.</h1>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Layout
