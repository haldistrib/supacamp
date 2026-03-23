import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { db } from '@/lib/supabase/drizzle';
import { challenges, challengeSubmissions, teamMembers } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

type RouteParams = { params: Promise<{ challengeId: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { challengeId } = await params;

    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as {
      teamId: string;
      originalVideoUrl?: string;
    };

    if (!body.teamId || typeof body.teamId !== 'string') {
      return NextResponse.json({ error: 'teamId is required' }, { status: 400 });
    }

    // Verify challenge exists
    const [challenge] = await db
      .select()
      .from(challenges)
      .where(eq(challenges.id, challengeId))
      .limit(1);

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
    }

    if (challenge.status !== 'approved') {
      return NextResponse.json({ error: 'This challenge is not available' }, { status: 400 });
    }

    // Verify user is a member of the team
    const [membership] = await db
      .select()
      .from(teamMembers)
      .where(and(
        eq(teamMembers.teamId, body.teamId),
        eq(teamMembers.userId, user.id),
      ))
      .limit(1);

    if (!membership) {
      return NextResponse.json({ error: 'You are not a member of this team' }, { status: 403 });
    }

    const [submission] = await db.insert(challengeSubmissions).values({
      challengeId,
      teamId: body.teamId,
      submittedBy: user.id,
      originalVideoUrl: body.originalVideoUrl || null,
      moderationStatus: 'pending',
      aiProcessingStatus: 'queued',
    }).returning();

    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error('POST /api/challenges/[challengeId]/submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
