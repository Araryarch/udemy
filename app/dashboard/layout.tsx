import MainMenu from './components/main-menu'

interface dashboardLayoutProps {
  children: React.ReactNode
}

const dashboarLayout = ({ children }: dashboardLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-cols-[250px_1fr]">
      <div className="overflow-auto bg-muted p-4">
        <MainMenu />
      </div>
      <div className="overflow-auto px-4 py-2">
        <h1>Wellcome back, Asta!</h1>
        {children}
      </div>
    </div>
  )
}

export default dashboarLayout
