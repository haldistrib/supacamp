import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { db } from '@/lib/supabase/drizzle';
import { teams, teamMembers } from '@/db/schema';
import { eq, and, count } from 'drizzle-orm';

type RouteParams = { params: Promise<{ teamId: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { teamId } = await params;

    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { inviteCode: string };

    if (!body.inviteCode || typeof body.inviteCode !== 'string') {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
    }

    // Fetch the team and validate invite code
    const [team] = await db
      .select()
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    if (!team.isActive) {
      return NextResponse.json({ error: 'This team is no longer active' }, { status: 400 });
    }

    if (team.inviteCode !== body.inviteCode.trim().toUpperCase()) {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 403 });
    }

    // Check if user is already a member
    const [existingMember] = await db
      .select()
      .from(teamMembers)
      .where(and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.userId, user.id),
      ))
      .limit(1);

    if (existingMember) {
      return NextResponse.json({ error: 'You are already a member of this team' }, { status: 409 });
    }

    // Check max members
    const [memberCount] = await db
      .select({ total: count() })
      .from(teamMembers)
      .where(eq(teamMembers.teamId, teamId));

    const maxMembers = team.maxMembers ?? 8;
    if (memberCount.total >= maxMembers) {
      return NextResponse.json({ error: 'This team is full' }, { status: 400 });
    }

    // Add user as member
    const [newMember] = await db.insert(teamMembers).values({
      teamId,
      userId: user.id,
      role: 'member',
    }).returning();

    return NextResponse.json({ member: newMember }, { status: 201 });
  } catch (error) {
    console.error('POST /api/teams/[teamId]/join error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
