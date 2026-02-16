import 'dotenv/config';
import mongoose from 'mongoose';
import { connect } from '@/config/mongose';
import User from '@/models/users';

/**
 * Migration: Add selectedResume field to users collection
 * This migration adds the selectedResume field to all existing user documents
 * if it doesn't already exist, setting it to null by default.
 */
async function migrateUp() {
	try {
		console.log('Starting migration: Add selectedResume to users...');

		await connect();

		// Update all documents that don't have the selectedResume field
		const result = await User.updateMany(
			{ selectedResume: { $exists: false } },
			{ $set: { selectedResume: null } }
		);

		console.log(`✓ Migration completed successfully`);
		console.log(`  - Modified: ${result.modifiedCount} documents`);
		console.log(`  - Matched: ${result.matchedCount} documents`);

		return true;
	} catch (error) {
		console.error('✗ Migration failed:', error);
		throw error;
	} finally {
		if (mongoose.connection.readyState === 1) {
			await mongoose.connection.close();
		}
	}
}

/**
 * Rollback migration: Remove selectedResume field from users
 */
async function migrateDown() {
	try {
		console.log('Rolling back migration: Remove selectedResume from users...');

		await connect();

		// Remove the selectedResume field from all documents
		const result = await User.updateMany(
			{ selectedResume: { $exists: true } },
			{ $unset: { selectedResume: '' } }
		);

		console.log(`✓ Rollback completed successfully`);
		console.log(`  - Modified: ${result.modifiedCount} documents`);
		console.log(`  - Matched: ${result.matchedCount} documents`);

		return true;
	} catch (error) {
		console.error('✗ Rollback failed:', error);
		throw error;
	} finally {
		if (mongoose.connection.readyState === 1) {
			await mongoose.connection.close();
		}
	}
}

// Export for migration runner
export { migrateUp, migrateDown };

// Run migration if executed directly
if (require.main === module) {
	const direction = process.argv[2] || 'up';

	if (direction === 'down') {
		migrateDown()
			.then(() => process.exit(0))
			.catch(() => process.exit(1));
	} else {
		migrateUp()
			.then(() => process.exit(0))
			.catch(() => process.exit(1));
	}
}
