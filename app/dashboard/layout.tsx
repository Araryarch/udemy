interface dashboardLayoutProps {
  children: React.ReactNode
}

const dashboarLayout = ({ children }: dashboardLayoutProps) => {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <div className="bg-muted">side panel</div>
      <div>{children}</div>
    </div>
  )
}

export default dashboarLayout
