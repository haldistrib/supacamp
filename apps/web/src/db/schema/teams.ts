import { pgTable, uuid, text, integer, boolean, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  avatarPreset: text('avatar_preset').notNull().default('team_default'),
  inviteCode: text('invite_code').unique().notNull(),
  createdBy: uuid('created_by').references(() => profiles.id),
  maxMembers: integer('max_members').default(8),
  totalPoints: integer('total_points').default(0),
  challengesCompleted: integer('challenges_completed').default(0),
  region: text('region'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').notNull().default('member'),
  pointsContributed: integer('points_contributed').default(0),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('team_members_team_user_idx').on(table.teamId, table.userId),
]);
