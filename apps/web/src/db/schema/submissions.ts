import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { challenges } from './challenges';
import { teams } from './teams';
import { profiles } from './profiles';

export const challengeSubmissions = pgTable('challenge_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  challengeId: uuid('challenge_id').references(() => challenges.id).notNull(),
  teamId: uuid('team_id').references(() => teams.id).notNull(),
  submittedBy: uuid('submitted_by').references(() => profiles.id).notNull(),
  originalVideoUrl: text('original_video_url'),
  aiTransformedVideoUrl: text('ai_transformed_video_url'),
  moderationStatus: text('moderation_status').default('pending'),
  moderationNotes: text('moderation_notes'),
  aiProcessingStatus: text('ai_processing_status').default('queued'),
  pointsAwarded: integer('points_awarded').default(0),
  visibility: text('visibility').default('team'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  processedAt: timestamp('processed_at', { withTimezone: true }),
});

export const teamChallenges = pgTable('team_challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  challengeId: uuid('challenge_id').references(() => challenges.id).notNull(),
  challengerTeamId: uuid('challenger_team_id').references(() => teams.id).notNull(),
  challengedTeamId: uuid('challenged_team_id').references(() => teams.id).notNull(),
  status: text('status').default('pending'),
  deadline: timestamp('deadline', { withTimezone: true }),
  winnerTeamId: uuid('winner_team_id').references(() => teams.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
