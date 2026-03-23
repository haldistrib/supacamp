import { pgTable, uuid, text, timestamp, jsonb, inet, uniqueIndex } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const adminAuditLog = pgTable('admin_audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminUserId: uuid('admin_user_id').references(() => profiles.id).notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: uuid('resource_id'),
  details: jsonb('details'),
  ipAddress: inet('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const userRoles = pgTable('user_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').notNull(),
  grantedBy: uuid('granted_by').references(() => profiles.id),
  grantedAt: timestamp('granted_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('user_roles_user_role_idx').on(table.userId, table.role),
]);

export const contentReports = pgTable('content_reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  reporterId: uuid('reporter_id').references(() => profiles.id).notNull(),
  contentType: text('content_type').notNull(),
  contentId: uuid('content_id').notNull(),
  reason: text('reason').notNull(),
  status: text('status').default('pending'),
  reviewedBy: uuid('reviewed_by').references(() => profiles.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
