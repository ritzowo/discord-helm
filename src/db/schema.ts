import { bigint, bigserial, index, pgTable, text } from 'drizzle-orm/pg-core';

export const messages = pgTable(
  'messages',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    threadId: text('thread_id').notNull(),
    discordId: text('discord_id').notNull().unique(),
    role: text('role', { enum: ['user', 'assistant'] }).notNull(),
    authorId: text('author_id'),
    authorName: text('author_name'),
    content: text('content').notNull(),
    createdAt: bigint('created_at', { mode: 'number' }).notNull(),
  },
  (table) => [index('idx_messages_thread').on(table.threadId, table.createdAt)],
);

export type MessageRow = typeof messages.$inferSelect;
export type NewMessageRow = typeof messages.$inferInsert;
