import { pgTable, uuid, text, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category').notNull(),
  status: text('status').default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  authorName: text('author_name').default('Supacamp Team'),
  featuredImageUrl: text('featured_image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const blogPostTranslations = pgTable('blog_post_translations', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'cascade' }).notNull(),
  locale: text('locale').notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  readingTimeMinutes: integer('reading_time_minutes'),
  targetKeyword: text('target_keyword'),
  secondaryKeywords: text('secondary_keywords').array(),
  ogImageUrl: text('og_image_url'),
}, (table) => [
  uniqueIndex('blog_translations_post_locale_idx').on(table.postId, table.locale),
  uniqueIndex('blog_translations_locale_slug_idx').on(table.locale, table.slug),
]);
