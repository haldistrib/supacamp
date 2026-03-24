import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/challenges',
    title: t('challengesTitle'),
    description: t('challengesDescription'),
  });
}

type CategoryKey = 'athletic' | 'creative' | 'exploration' | 'teamwork' | 'silly' | 'learning';

interface MockChallenge {
  title: string;
  category: CategoryKey;
  difficulty: string;
  points: number;
  minPlayers: number;
  maxPlayers: number;
}

const MOCK_CHALLENGES: MockChallenge[] = [
  { title: 'Backyard Obstacle Course', category: 'athletic', difficulty: 'Easy', points: 100, minPlayers: 2, maxPlayers: 6 },
  { title: 'Nature Art Collage', category: 'creative', difficulty: 'Easy', points: 80, minPlayers: 2, maxPlayers: 4 },
  { title: 'Neighborhood Scavenger Hunt', category: 'exploration', difficulty: 'Medium', points: 150, minPlayers: 3, maxPlayers: 6 },
  { title: 'Human Pyramid Challenge', category: 'teamwork', difficulty: 'Medium', points: 120, minPlayers: 4, maxPlayers: 8 },
  { title: 'Silly Walk Race', category: 'silly', difficulty: 'Easy', points: 60, minPlayers: 2, maxPlayers: 8 },
  { title: 'Bug Identification Quest', category: 'learning', difficulty: 'Medium', points: 130, minPlayers: 2, maxPlayers: 4 },
  { title: 'Sprint Relay', category: 'athletic', difficulty: 'Hard', points: 200, minPlayers: 4, maxPlayers: 8 },
  { title: 'Chalk Mural Masterpiece', category: 'creative', difficulty: 'Medium', points: 140, minPlayers: 2, maxPlayers: 6 },
  { title: 'Park Explorer Map', category: 'exploration', difficulty: 'Hard', points: 180, minPlayers: 3, maxPlayers: 5 },
  { title: 'Trust Fall Circle', category: 'teamwork', difficulty: 'Easy', points: 90, minPlayers: 4, maxPlayers: 8 },
  { title: 'Freeze Dance Battle', category: 'silly', difficulty: 'Easy', points: 70, minPlayers: 3, maxPlayers: 8 },
  { title: 'Cloud Shape Stories', category: 'learning', difficulty: 'Easy', points: 80, minPlayers: 2, maxPlayers: 6 },
];

const CATEGORY_KEYS: CategoryKey[] = ['athletic', 'creative', 'exploration', 'teamwork', 'silly', 'learning'];

const CATEGORY_VARIANTS: Record<CategoryKey, 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'sticker'> = {
  athletic: 'primary',
  creative: 'secondary',
  exploration: 'success',
  teamwork: 'sticker',
  silly: 'warning',
  learning: 'danger',
};

export default function ChallengesPage() {
  const t = useTranslations('marketing.challengesPage');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: t('title'), href: '/challenges' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 px-4 text-center paper-texture">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-ink-700 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Challenge Grid by Category */}
      {CATEGORY_KEYS.map((category) => {
        const challenges = MOCK_CHALLENGES.filter((c) => c.category === category);
        return (
          <section key={category} className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-3xl text-ink-900 mb-8">
                <Badge variant={CATEGORY_VARIANTS[category]} className="mr-3 text-base">
                  {t(`categories.${category}`)}
                </Badge>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                  <Card key={challenge.title} variant="default">
                    <CardHeader>
                      <CardTitle>{challenge.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 text-sm text-ink-500">
                        <span>{t('difficulty')}: {challenge.difficulty}</span>
                        <span>{t('points', { points: challenge.points })}</span>
                        <span>{t('players', { min: challenge.minPlayers, max: challenge.maxPlayers })}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 px-4 bg-primary-500 text-white text-center torn-edge-top">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl mb-4">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('ctaSubtitle')}</p>
          <Link href="/sign-up">
            <Button variant="secondary" size="lg">{t('ctaButton')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
