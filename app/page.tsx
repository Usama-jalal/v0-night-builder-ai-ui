import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardContent } from "@/components/dashboard-content"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardNavbar />
      <DashboardContent />
    </div>
  )
}
