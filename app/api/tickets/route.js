// app/api/tickets/route.js
import { NextResponse } from 'next/server';
import { getTickets } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const search = searchParams.get('search');

  try {
    const tickets = await getTickets({ status, priority, search });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}