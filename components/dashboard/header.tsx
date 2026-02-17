import { UserButton } from "@clerk/nextjs"

export function DashboardHeader() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-end px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
