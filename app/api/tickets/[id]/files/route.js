// app/api/tickets/[id]/files/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request, { params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { data: filesData, error: filesError } = await supabase.storage
      .from('mangelimage')
      .list(`${params.id}/`, { limit: 100 });
    if (filesError) throw new Error(filesError.message);

    const files = await Promise.all(
      filesData.map(async (file) => {
        const { data: signedUrlData, error: signedError } = await supabase.storage
          .from('mangelimage')
          .createSignedUrl(`${params.id}/${file.name}`, 3600);
        if (signedError) throw new Error(signedError.message);
        return signedUrlData.signedUrl;
      })
    );

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}