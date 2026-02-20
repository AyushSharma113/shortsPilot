import Link from "next/link"
import Image from "next/image"
import { 
  Clapperboard, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  LayoutGrid, 
  Plus, 
  Settings, 
  User, 
  Zap 
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b">
        <div className="relative h-8 w-8">
            <Image 
              src="/logo.png" 
              alt="ShortsPilot Logo" 
              fill
              className="object-contain"
            />
        </div>
        <span className="font-bold text-xl tracking-tight">ShortsPilot</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        <Link href="/dashboard/create">
            <Button className="w-full justify-start gap-2 h-12 text-base font-semibold shadow-md" size="lg">
            <Plus className="h-5 w-5" />
            Create New Series
            </Button>
        </Link>

        <nav className="space-y-2">
          <Link href="/dashboard/series">
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <LayoutGrid className="h-5 w-5" />
              Series
            </Button>
          </Link>
          <Link href="/dashboard/videos">
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Clapperboard className="h-5 w-5" />
              Videos
            </Button>
          </Link>
        </nav>

        <div className="pt-4 mt-4 border-t">
          <nav className="space-y-2">
             <Link href="/dashboard/guides">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                <HelpCircle className="h-5 w-5" />
                Guides
              </Button>
            </Link>
            <Link href="/dashboard/billing">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                <CreditCard className="h-5 w-5" />
                Billing
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t space-y-2 bg-muted/10">
        <Button variant="outline" className="w-full justify-start gap-3 h-11 border-primary/20 hover:bg-primary/5 text-primary hover:text-primary">
            <Zap className="h-5 w-5 fill-current" />
            Upgrade Plan
        </Button>
        <Link href="/dashboard/profile">
             <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
                Profile Settings
             </Button>
        </Link>
      </div>
    </aside>
  )
}
