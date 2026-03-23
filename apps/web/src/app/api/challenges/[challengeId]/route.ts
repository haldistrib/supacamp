import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase/drizzle';
import { challenges, challengeTranslations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/config';

type RouteParams = { params: Promise<{ challengeId: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { challengeId } = await params;
    const locale = (request.nextUrl.searchParams.get('locale') as Locale) || defaultLocale;

    if (!locales.includes(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const [result] = await db
      .select({
        id: challenges.id,
        category: challenges.category,
        difficulty: challenges.difficulty,
        pointsReward: challenges.pointsReward,
        estimatedDuration: challenges.estimatedDuration,
        requiredPlayersMin: challenges.requiredPlayersMin,
        requiredPlayersMax: challenges.requiredPlayersMax,
        ageRangeMin: challenges.ageRangeMin,
        ageRangeMax: challenges.ageRangeMax,
        isIndoor: challenges.isIndoor,
        isOutdoor: challenges.isOutdoor,
        equipment: challenges.equipment,
        videoAiStyle: challenges.videoAiStyle,
        slug: challengeTranslations.slug,
        title: challengeTranslations.title,
        description: challengeTranslations.description,
        instructions: challengeTranslations.instructions,
        safetyNotes: challengeTranslations.safetyNotes,
      })
      .from(challenges)
      .innerJoin(
        challengeTranslations,
        and(
          eq(challengeTranslations.challengeId, challenges.id),
          eq(challengeTranslations.locale, locale),
        ),
      )
      .where(eq(challenges.id, challengeId))
      .limit(1);

    if (!result) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
    }

    return NextResponse.json({ challenge: result });
  } catch (error) {
    console.error('GET /api/challenges/[challengeId] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
