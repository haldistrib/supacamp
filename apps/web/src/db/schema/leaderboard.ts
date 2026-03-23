import { pgTable, uuid, text, integer, date, timestamp } from 'drizzle-orm/pg-core';
import { teams } from './teams';

export const leaderboardCache = pgTable('leaderboard_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id').references(() => teams.id).notNull(),
  leaderboardType: text('leaderboard_type').notNull(),
  region: text('region'),
  rank: integer('rank').notNull(),
  totalPoints: integer('total_points').notNull(),
  periodStart: date('period_start'),
  periodEnd: date('period_end'),
  computedAt: timestamp('computed_at', { withTimezone: true }).defaultNow(),
});
