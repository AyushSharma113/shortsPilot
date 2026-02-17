import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user-sync";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Sync user to Supabase on each dashboard load
  const synced = await syncUser();
  console.log("User sync status:", synced);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b h-16 flex items-center px-6">
        <h1 className="font-bold text-xl">Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {user.firstName || 'Creator'}!</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Create New Video</h3>
                <p className="text-muted-foreground mb-4">Generate viral shorts from simple text prompts.</p>
                {/* Placeholder for generator component */}
                <div className="h-10 w-full bg-primary/10 rounded flex items-center justify-center text-primary text-sm font-medium">Coming Soon</div>
             </div>
             <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
                <p className="text-muted-foreground mb-4">View and manage your upcoming content.</p>
                 <div className="h-10 w-full bg-muted rounded flex items-center justify-center text-muted-foreground text-sm font-medium">No posts scheduled</div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
