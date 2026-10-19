import { desc, eq } from 'drizzle-orm';
import { getDb } from './index.js';
import { messages, type MessageRow, type NewMessageRow } from './schema.js';

export type MessageRole = 'user' | 'assistant';

export interface StoredMessage {
  threadId: string;
  discordId: string;
  role: MessageRole;
  authorId?: string;
  authorName?: string;
  content: string;
  createdAt: number;
}

export async function insertMessage(message: StoredMessage): Promise<void> {
  const row: NewMessageRow = {
    threadId: message.threadId,
    discordId: message.discordId,
    role: message.role,
    authorId: message.authorId ?? null,
    authorName: message.authorName ?? null,
    content: message.content,
    createdAt: message.createdAt,
  };

  await getDb().insert(messages).values(row).onConflictDoNothing();
}

export async function getThreadMessages(threadId: string, limit = 40): Promise<MessageRow[]> {
  const rows = await getDb()
    .select()
    .from(messages)
    .where(eq(messages.threadId, threadId))
    .orderBy(desc(messages.createdAt), desc(messages.id))
    .limit(limit);

  return rows.reverse();
}
