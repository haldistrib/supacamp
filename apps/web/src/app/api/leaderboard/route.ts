import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase/drizzle';
import { leaderboardCache, teams } from '@/db/schema';
import { eq, and, asc, type SQL } from 'drizzle-orm';

const VALID_TYPES = ['global', 'regional', 'weekly', 'monthly'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const type = searchParams.get('type') || 'global';
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Invalid leaderboard type. Must be one of: global, regional, weekly, monthly' }, { status: 400 });
    }

    const region = searchParams.get('region');
    const limitParam = searchParams.get('limit');
    const limit = Math.min(Math.max(parseInt(limitParam || '50', 10) || 50, 1), 100);

    const conditions: SQL[] = [eq(leaderboardCache.leaderboardType, type)];

    if (type === 'regional' && region) {
      conditions.push(eq(leaderboardCache.region, region));
    }

    const results = await db
      .select({
        rank: leaderboardCache.rank,
        totalPoints: leaderboardCache.totalPoints,
        periodStart: leaderboardCache.periodStart,
        periodEnd: leaderboardCache.periodEnd,
        computedAt: leaderboardCache.computedAt,
        teamId: teams.id,
        teamName: teams.name,
        teamSlug: teams.slug,
        teamAvatarPreset: teams.avatarPreset,
        teamRegion: teams.region,
        challengesCompleted: teams.challengesCompleted,
      })
      .from(leaderboardCache)
      .innerJoin(teams, eq(leaderboardCache.teamId, teams.id))
      .where(and(...conditions))
      .orderBy(asc(leaderboardCache.rank))
      .limit(limit);

    return NextResponse.json({ leaderboard: results, type, total: results.length });
  } catch (error) {
    console.error('GET /api/leaderboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
