import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { CreateSeriesWizard } from "@/components/create/create-series-wizard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EditSeriesPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSeriesPage({ params }: EditSeriesPageProps) {
  const user = await currentUser();

  // Next.js 15: route params must be awaited
  const { id } = await params;

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch the existing series bypassing RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: series, error } = await supabase
    .from('series')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !series) {
    console.error("Error fetching series to edit:", error);
    redirect("/dashboard");
  }

  // Map database format to form initial data format
  const initialData = {
    niche: series.custom_niche ? "custom" : series.niche,
    customNiche: series.custom_niche || "",
    language: series.language,
    voice: series.voice,
    backgroundMusicIds: series.background_music_ids,
    videoStyleId: series.video_style_id,
    captionStyleId: series.caption_style_id,
    seriesName: series.series_name,
    duration: series.duration,
    platforms: series.platforms,
    publishTime: series.publish_time,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b h-16 flex items-center px-6 gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
            </Link>
        </Button>
        <h1 className="font-bold text-xl">Edit Series: {series.series_name}</h1>
      </header>
      <main className="flex-1 p-6">
         <CreateSeriesWizard initialData={initialData} seriesId={series.id} />
      </main>
    </div>
  );
}
