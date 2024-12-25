PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_client` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text,
	`is_active` integer DEFAULT 0,
	`birth_date` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_client`("id", "name", "email", "phone", "address", "is_active", "birth_date", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "email", "phone", "address", "is_active", "birth_date", "created_at", "updated_at", "deleted_at" FROM `client`;--> statement-breakpoint
DROP TABLE `client`;--> statement-breakpoint
ALTER TABLE `__new_client` RENAME TO `client`;--> statement-breakpoint
PRAGMA foreign_keys=ON;