#!/usr/bin/env node

/**
 * Database Migration Runner
 * Usage:
 *   npm run migrate              # Run all pending migrations
 *   npm run migrate:down         # Rollback last migration
 *   npm run migrate:status       # Show migration status
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connect } from '@/config/mongose';

interface Migration {
	name: string;
	path: string;
}

interface MigrationLog {
	name: string;
	timestamp: number;
}

const MIGRATIONS_DIR = path.join(process.cwd(), 'migrations');
const MIGRATION_LOG_FILE = path.join(MIGRATIONS_DIR, '.migrations.json');

/**
 * Get list of all migration files
 */
function getMigrationFiles(): Migration[] {
	const files = fs.readdirSync(MIGRATIONS_DIR).filter((file) => {
		return file.match(/^\d+_.*\.ts$/) && !file.startsWith('.');
	});

	return files.map((file) => ({
		name: file.replace('.ts', ''),
		path: path.join(MIGRATIONS_DIR, file),
	}));
}

/**
 * Get list of executed migrations
 */
function getMigrationLog(): MigrationLog[] {
	if (!fs.existsSync(MIGRATION_LOG_FILE)) {
		return [];
	}

	try {
		return JSON.parse(fs.readFileSync(MIGRATION_LOG_FILE, 'utf-8'));
	} catch {
		return [];
	}
}

/**
 * Save migration log
 */
function saveMigrationLog(log: MigrationLog[]): void {
	fs.writeFileSync(MIGRATION_LOG_FILE, JSON.stringify(log, null, 2));
}

/**
 * Run all pending migrations
 */
async function runMigrations(): Promise<void> {
	try {
		await connect();

		const migrations = getMigrationFiles();
		const log = getMigrationLog();
		const executed = new Set(log.map((m) => m.name));

		const pending = migrations.filter((m) => !executed.has(m.name));

		if (pending.length === 0) {
			console.log('✓ No pending migrations');
			return;
		}

		console.log(`Found ${pending.length} pending migration(s)\n`);

		for (const migration of pending) {
			try {
				console.log(`Running: ${migration.name}`);

				// Dynamic import
				const { migrateUp } = await import(migration.path);
				await migrateUp();

				log.push({
					name: migration.name,
					timestamp: Date.now(),
				});

				saveMigrationLog(log);
				console.log(`✓ Completed: ${migration.name}\n`);
			} catch (error) {
				console.error(`✗ Failed: ${migration.name}`);
				console.error(error);
				process.exit(1);
			}
		}

		console.log('✓ All migrations completed successfully');
	} catch (error) {
		console.error('Migration error:', error);
		process.exit(1);
	} finally {
		if (mongoose.connection.readyState === 1) {
			await mongoose.connection.close();
		}
	}
}

/**
 * Rollback last migration
 */
async function rollbackMigration(): Promise<void> {
	try {
		await connect();

		const log = getMigrationLog();

		if (log.length === 0) {
			console.log('✓ No migrations to rollback');
			return;
		}

		const lastMigration = log[log.length - 1];
		const migrations = getMigrationFiles();
		const migration = migrations.find((m) => m.name === lastMigration.name);

		if (!migration) {
			console.error(`✗ Migration file not found: ${lastMigration.name}`);
			process.exit(1);
		}

		try {
			console.log(`Rolling back: ${migration.name}`);

			const { migrateDown } = await import(migration.path);
			await migrateDown();

			log.pop();
			saveMigrationLog(log);

			console.log(`✓ Rolled back: ${migration.name}`);
		} catch (error) {
			console.error(`✗ Rollback failed: ${migration.name}`);
			console.error(error);
			process.exit(1);
		}
	} catch (error) {
		console.error('Rollback error:', error);
		process.exit(1);
	} finally {
		if (mongoose.connection.readyState === 1) {
			await mongoose.connection.close();
		}
	}
}

/**
 * Show migration status
 */
async function showStatus(): Promise<void> {
	const migrations = getMigrationFiles();
	const log = getMigrationLog();
	const executed = new Set(log.map((m) => m.name));

	console.log('\nMigration Status:\n');
	console.log('Executed:');
	log.forEach((m) => {
		const date = new Date(m.timestamp).toLocaleString();
		console.log(`  ✓ ${m.name} (${date})`);
	});

	const pending = migrations.filter((m) => !executed.has(m.name));
	if (pending.length > 0) {
		console.log('\nPending:');
		pending.forEach((m) => {
			console.log(`  ⏳ ${m.name}`);
		});
	} else {
		console.log('\n✓ All migrations executed');
	}
}

// Main execution
const command = process.argv[2] || 'up';

switch (command) {
	case 'up':
		runMigrations().catch(() => process.exit(1));
		break;
	case 'down':
		rollbackMigration().catch(() => process.exit(1));
		break;
	case 'status':
		showStatus().catch(() => process.exit(1));
		break;
	default:
		console.log('Usage:');
		console.log('  npm run migrate              # Run migrations');
		console.log('  npm run migrate down         # Rollback last migration');
		console.log('  npm run migrate status       # Show migration status');
		process.exit(0);
}
