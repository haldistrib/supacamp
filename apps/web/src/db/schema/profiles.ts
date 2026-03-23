import { pgTable, uuid, text, date, boolean, timestamp } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  displayName: text('display_name').notNull(),
  avatarPreset: text('avatar_preset').notNull().default('default'),
  dateOfBirth: date('date_of_birth').notNull(),
  parentEmail: text('parent_email'),
  parentConsentGiven: boolean('parent_consent_given').default(false),
  parentConsentDate: timestamp('parent_consent_date', { withTimezone: true }),
  parentPinHash: text('parent_pin_hash'),
  locale: text('locale').notNull().default('en'),
  region: text('region'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true }).defaultNow(),
});
