import ThemeToggle from '../../components/ui/theme-toggle'
type Props = {
  children: React.ReactNode
  classname?: string
}

const Layout = ({ children, classname }: Props) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[url(./bg-light.png)] bg-cover py-10 transition-all duration-500 ease-in-out dark:bg-[url(./bg-dark.png)]">
      <div
        className={`flex flex-col items-center justify-center rounded-sm border-secondary px-2 py-4 dark:border-white ${classname}`}
      >
        {children}
      </div>
      <div className="absolute right-0 top-0 p-10">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Layout
