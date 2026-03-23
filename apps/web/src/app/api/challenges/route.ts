import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase/drizzle';
import { challenges, challengeTranslations } from '@/db/schema';
import { eq, and, type SQL } from 'drizzle-orm';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const locale = (searchParams.get('locale') as Locale) || defaultLocale;
    if (!locales.includes(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const indoor = searchParams.get('indoor');
    const outdoor = searchParams.get('outdoor');

    // Build filter conditions
    const conditions: SQL[] = [eq(challenges.status, 'approved')];

    if (category) {
      conditions.push(eq(challenges.category, category));
    }
    if (difficulty) {
      conditions.push(eq(challenges.difficulty, difficulty));
    }
    if (indoor === 'true') {
      conditions.push(eq(challenges.isIndoor, true));
    }
    if (outdoor === 'true') {
      conditions.push(eq(challenges.isOutdoor, true));
    }

    const results = await db
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
        slug: challengeTranslations.slug,
        title: challengeTranslations.title,
        description: challengeTranslations.description,
      })
      .from(challenges)
      .innerJoin(
        challengeTranslations,
        and(
          eq(challengeTranslations.challengeId, challenges.id),
          eq(challengeTranslations.locale, locale),
        ),
      )
      .where(and(...conditions));

    return NextResponse.json({ challenges: results });
  } catch (error) {
    console.error('GET /api/challenges error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
