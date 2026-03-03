import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user-sync";
import { createClient } from "@supabase/supabase-js";
import { SeriesCard } from "@/components/dashboard/series-card";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Sync user to Supabase on each dashboard load
  const synced = await syncUser();
  console.log("User sync status:", synced);

  // Fetch user series inside Server Component bypassing RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: userSeries, error: seriesError } = await supabase
    .from('series')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (seriesError) {
    console.error("Error fetching series:", seriesError);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b h-16 flex items-center px-6">
        <h1 className="font-bold text-xl">Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user.firstName || 'Creator'}!</h2>
            <p className="text-muted-foreground mb-8">Here is an overview of your automated content.</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">Your Series</h3>
            
            {(!userSeries || userSeries.length === 0) ? (
              <div className="p-8 border rounded-xl bg-card text-card-foreground shadow-sm text-center flex flex-col items-center justify-center min-h-[300px] border-dashed">
                <h3 className="text-lg font-semibold mb-2">No series yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">You haven't created any content series. Start generating viral shorts from text prompts.</p>
                <Link href="/create" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Create New Series
                </Link>
              </div>
            ) : (
               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {/* Create New Card Card */}
                 <Link href="/create" className="group p-6 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[320px] border-dashed hover:border-primary/50 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M5 12h14"/><path d="M12 5v14"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-center group-hover:text-primary transition-colors">Create New Video</h3>
                    <p className="text-muted-foreground text-sm text-center">Generate another viral short</p>
                 </Link>
                 
                 {/* Map through existing series */}
                 {userSeries.map((series) => (
                    <SeriesCard key={series.id} series={series as any} />
                 ))}
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
