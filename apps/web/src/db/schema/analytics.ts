import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventType: text('event_type').notNull(),
  pagePath: text('page_path'),
  locale: text('locale'),
  referrer: text('referrer'),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  deviceType: text('device_type'),
  country: text('country'),
  sessionId: text('session_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
