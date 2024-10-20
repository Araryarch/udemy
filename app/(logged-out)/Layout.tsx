import ThemeToggle from '../../components/ui/theme-toggle'
type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='min-h-screen w-full bg-background xl:flex-row flex flex-col'>
      <div className='left w-full xl:w-1/2 xl:min-h-screen h-[30vh] bg-[url("./background.jpg")] bg-cover bg-right relative'>
        <div className='absolute top-0 right-0 left-0 bottom-0 xl:bg-gradient-to-l bg-gradient-to-t from-background to-transparent'></div>
      </div>
      <div className='right xl:w-1/2 xl:min-h-screen w-full h-[70vh] flex flex-col gap-2 justify-center items-center relative'>
        {children}
        <ThemeToggle classname='absolute top-12 right-12' />
      </div>
    </div>
  )
}

export default Layout
