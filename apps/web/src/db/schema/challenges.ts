import { pgTable, uuid, text, integer, boolean, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category').notNull(),
  difficulty: text('difficulty').notNull(),
  pointsReward: integer('points_reward').notNull(),
  estimatedDuration: text('estimated_duration'),
  requiredPlayersMin: integer('required_players_min').default(1),
  requiredPlayersMax: integer('required_players_max').default(8),
  ageRangeMin: integer('age_range_min').default(6),
  ageRangeMax: integer('age_range_max').default(17),
  isIndoor: boolean('is_indoor').default(false),
  isOutdoor: boolean('is_outdoor').default(true),
  equipment: text('equipment').array().default([]),
  videoAiStyle: text('video_ai_style').default('default'),
  status: text('status').notNull().default('draft'),
  approvedBy: uuid('approved_by').references(() => profiles.id),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const challengeTranslations = pgTable('challenge_translations', {
  id: uuid('id').primaryKey().defaultRandom(),
  challengeId: uuid('challenge_id').references(() => challenges.id, { onDelete: 'cascade' }).notNull(),
  locale: text('locale').notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(),
  safetyNotes: text('safety_notes').notNull(),
}, (table) => [
  uniqueIndex('challenge_translations_challenge_locale_idx').on(table.challengeId, table.locale),
]);
