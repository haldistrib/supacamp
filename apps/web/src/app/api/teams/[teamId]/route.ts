import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { db } from '@/lib/supabase/drizzle';
import { teams, teamMembers, profiles } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

type RouteParams = { params: Promise<{ teamId: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { teamId } = await params;

    const [team] = await db
      .select()
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const members = await db
      .select({
        id: teamMembers.id,
        userId: teamMembers.userId,
        role: teamMembers.role,
        pointsContributed: teamMembers.pointsContributed,
        joinedAt: teamMembers.joinedAt,
        displayName: profiles.displayName,
        avatarPreset: profiles.avatarPreset,
      })
      .from(teamMembers)
      .innerJoin(profiles, eq(teamMembers.userId, profiles.id))
      .where(eq(teamMembers.teamId, teamId));

    return NextResponse.json({ team, members });
  } catch (error) {
    console.error('GET /api/teams/[teamId] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { teamId } = await params;

    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check the user is captain of this team
    const [membership] = await db
      .select()
      .from(teamMembers)
      .where(and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.userId, user.id),
        eq(teamMembers.role, 'captain'),
      ))
      .limit(1);

    if (!membership) {
      return NextResponse.json({ error: 'Only the team captain can update the team' }, { status: 403 });
    }

    const body = (await request.json()) as {
      name?: string;
      avatarPreset?: string;
      region?: string;
    };

    const updates: Record<string, string | Date> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) {
      const trimmedName = body.name.trim();
      if (trimmedName.length < 2 || trimmedName.length > 50) {
        return NextResponse.json({ error: 'Team name must be between 2 and 50 characters' }, { status: 400 });
      }
      updates.name = trimmedName;
    }

    if (body.avatarPreset !== undefined) {
      if (typeof body.avatarPreset !== 'string' || body.avatarPreset.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid avatar preset' }, { status: 400 });
      }
      updates.avatarPreset = body.avatarPreset;
    }

    if (body.region !== undefined) {
      if (typeof body.region !== 'string') {
        return NextResponse.json({ error: 'Invalid region' }, { status: 400 });
      }
      updates.region = body.region;
    }

    const [updatedTeam] = await db
      .update(teams)
      .set(updates)
      .where(eq(teams.id, teamId))
      .returning();

    if (!updatedTeam) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json({ team: updatedTeam });
  } catch (error) {
    console.error('PATCH /api/teams/[teamId] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
