CREATE TABLE "messages" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"thread_id" text NOT NULL,
	"discord_id" text NOT NULL,
	"role" text NOT NULL,
	"author_id" text,
	"author_name" text,
	"content" text NOT NULL,
	"created_at" bigint NOT NULL,
	CONSTRAINT "messages_discord_id_unique" UNIQUE("discord_id")
);
--> statement-breakpoint
CREATE INDEX "idx_messages_thread" ON "messages" USING btree ("thread_id","created_at");