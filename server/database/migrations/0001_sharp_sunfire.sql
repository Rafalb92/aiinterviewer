CREATE TABLE `interview` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text,
	`level` text NOT NULL,
	`created_at` integer NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`finalized` integer
);
