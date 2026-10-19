import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/discord_helm_test';
process.env.LLM_MODEL = 'test-model';
process.env.DISCORD_TOKEN = 'test-token';
process.env.DISCORD_CLIENT_ID = 'test-client-id';

const { insertMessage, getThreadMessages } = await import('../src/db/messages.ts');
const { initDb, getDb, closeDb } = await import('../src/db/index.ts');
const { buildContext } = await import('../src/context/context.ts');
const { messages } = await import('../src/db/schema.ts');

// Use unique thread ids so repeated runs don't collide in a shared database.
const suffix = Date.now().toString();
const t1 = `t1-${suffix}`;
const t2 = `t2-${suffix}`;

before(async () => {
  await initDb();
  await insertMessage({ threadId: t1, discordId: `m1-${suffix}`, role: 'user', authorId: 'u1', authorName: 'ritz', content: 'hello', createdAt: 1000 });
  await insertMessage({ threadId: t1, discordId: `m2-${suffix}`, role: 'assistant', content: 'hi there', createdAt: 1001 });
  await insertMessage({ threadId: t1, discordId: `m3-${suffix}`, role: 'user', authorId: 'u2', authorName: 'yo', content: 'second user', createdAt: 1002 });
  await insertMessage({ threadId: t2, discordId: `m4-${suffix}`, role: 'user', authorId: 'u1', authorName: 'ritz', content: 'other thread', createdAt: 2000 });
});

after(async () => {
  await getDb().delete(messages);
  await closeDb();
});

test('getThreadMessages returns only the given thread in chronological order', async () => {
  const rows = await getThreadMessages(t1);
  assert.deepEqual(
    rows.map((r) => r.content),
    ['hello', 'hi there', 'second user'],
  );
});

test('getThreadMessages respects the limit and keeps the latest messages', async () => {
  const rows = await getThreadMessages(t1, 2);
  assert.deepEqual(
    rows.map((r) => r.content),
    ['hi there', 'second user'],
  );
});

test('buildContext maps rows to context messages with roles and authors', async () => {
  const ctx = await buildContext(t1);
  assert.equal(ctx.system, undefined);
  assert.deepEqual(ctx.messages, [
    { role: 'user', authorId: 'u1', authorName: 'ritz', content: 'hello' },
    { role: 'assistant', authorId: undefined, authorName: undefined, content: 'hi there' },
    { role: 'user', authorId: 'u2', authorName: 'yo', content: 'second user' },
  ]);
});

test('buildContext includes system prompt when provided', async () => {
  const ctx = await buildContext(t1, { system: 'You are helpful.', limit: 1 });
  assert.equal(ctx.system, 'You are helpful.');
  assert.deepEqual(
    ctx.messages.map((m) => m.content),
    ['second user'],
  );
});

test('buildContext returns empty messages for unknown thread', async () => {
  const ctx = await buildContext('does-not-exist');
  assert.deepEqual(ctx.messages, []);
});
