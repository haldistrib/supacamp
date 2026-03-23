import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { db } from '@/lib/supabase/drizzle';
import { teams, teamMembers } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';
import crypto from 'crypto';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function generateInviteCode(): string {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
}

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get team IDs for current user
    const memberships = await db
      .select({ teamId: teamMembers.teamId })
      .from(teamMembers)
      .where(eq(teamMembers.userId, user.id));

    if (memberships.length === 0) {
      return NextResponse.json({ teams: [] });
    }

    const teamIds = memberships.map((m) => m.teamId);
    const userTeams = await db
      .select()
      .from(teams)
      .where(inArray(teams.id, teamIds));

    return NextResponse.json({ teams: userTeams });
  } catch (error) {
    console.error('GET /api/teams error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { name: string; region?: string };

    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    const trimmedName = body.name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return NextResponse.json({ error: 'Team name must be between 2 and 50 characters' }, { status: 400 });
    }

    const slug = generateSlug(trimmedName) + '-' + crypto.randomBytes(3).toString('hex');
    const inviteCode = generateInviteCode();

    const [newTeam] = await db.insert(teams).values({
      name: trimmedName,
      slug,
      inviteCode,
      createdBy: user.id,
      region: body.region || null,
    }).returning();

    await db.insert(teamMembers).values({
      teamId: newTeam.id,
      userId: user.id,
      role: 'captain',
    });

    return NextResponse.json({ team: newTeam }, { status: 201 });
  } catch (error) {
    console.error('POST /api/teams error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
