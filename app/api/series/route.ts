// c:\Users\sharm\Documents\coding\shortspilot\app\api\series\route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js'; // Use raw supabase-js to create the admin client

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Supabase with the SERVICE_ROLE_KEY to bypass RLS policies
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // <-- This key bypasses RLS
    );

    const body = await request.json();

    const {
      niche,
      customNiche,
      language,
      voice,
      backgroundMusicIds,
      videoStyleId,
      captionStyleId,
      seriesName,
      duration,
      platforms,
      publishTime
    } = body;

    // Validate essential fields
    if (!seriesName || !niche || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin // Use supabaseAdmin here
      .from('series')
      .insert([
        {
          user_id: userId,
          niche,
          custom_niche: customNiche || null,
          language,
          voice,
          background_music_ids: backgroundMusicIds || [],
          video_style_id: videoStyleId,
          caption_style_id: captionStyleId,
          series_name: seriesName,
          duration,
          platforms: platforms || [],
          publish_time: publishTime,
          status: 'active',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
