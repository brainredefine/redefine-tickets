// app/api/tickets/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request, { params }) {
  const { status } = await request.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { data, error } = await supabase
      .from('mangelmanagement')
      .update({ status, updated_at: new Date() })
      .eq('id', params.id)
      .select();
    if (error) throw new Error(error.message);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}