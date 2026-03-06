import 'dotenv/config';
import mongoose from 'mongoose';
import { connect } from '@/config/mongose';
import User from '@/models/users';

/**
 * Migration: Add templateId field to users collection
 * - Adds templateId if missing and sets to null by default
 */
async function migrateUp() {
  try {
    console.log('Starting migration: Add templateId to users...');

    await connect();

    const result = await User.updateMany(
      { templateId: { $exists: false } },
      { $set: { templateId: null } }
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

async function migrateDown() {
  try {
    console.log('Rolling back migration: Remove templateId from users...');

    await connect();

    const result = await User.updateMany(
      { templateId: { $exists: true } },
      { $unset: { templateId: '' } }
    );

    console.log(`✓ Rollback completed successfully`);
    console.log(`  - Modified: ${result.modifiedCount} documents`);

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

export { migrateUp, migrateDown };

// Run directly
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
