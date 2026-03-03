import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // We must await params in Next.js 15+
    const params = await context.params;
    const seriesId = params.id;

    if (!seriesId) {
      return NextResponse.json({ error: 'Missing series ID' }, { status: 400 });
    }

    const body = await request.json();
    
    // We can either receive just { status } for toggling, or a full form object for editing.
    // Let's dynamically build the update object based on what was provided.
    const updateData: any = {};
    
    if (body.status && ['active', 'paused'].includes(body.status)) {
      updateData.status = body.status;
    }
    
    // Check for full edit payload mappings
    if (body.niche) updateData.niche = body.niche;
    if (body.niche === 'custom' && body.customNiche) updateData.custom_niche = body.customNiche;
    if (body.language) updateData.language = body.language;
    if (body.voice) updateData.voice = body.voice;
    if (body.backgroundMusicIds) updateData.background_music_ids = body.backgroundMusicIds;
    if (body.videoStyleId) updateData.video_style_id = body.videoStyleId;
    if (body.captionStyleId) updateData.caption_style_id = body.captionStyleId;
    if (body.seriesName) updateData.series_name = body.seriesName;
    if (body.duration) updateData.duration = body.duration;
    if (body.platforms) updateData.platforms = body.platforms;
    if (body.publishTime) updateData.publish_time = body.publishTime;

    if (Object.keys(updateData).length === 0) {
       return NextResponse.json({ error: 'No valid update data provided' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Update the series, making sure it belongs to the current user
    const { data, error } = await supabaseAdmin
      .from('series')
      .update(updateData)
      .eq('id', seriesId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Supabase Update Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
