import 'dotenv/config';
import mongoose from 'mongoose';
import { connect } from '@/config/mongose';
import User from '@/models/users';

/**
 * Migration: Add username field to users collection
 * - Adds username if missing
 * - Generates unique username based on email
 * - Creates unique index
 */
async function migrateUp() {
  try {
    console.log('Starting migration: Add username to users...');

    await connect();

    const users = await User.find({
      $or: [{ username: { $exists: false } }, { username: null }],
    });

    let updatedCount = 0;

    for (const user of users) {
      // Generate base username from email
      let baseUsername = user.email
        ? user.email.split('@')[0].toLowerCase()
        : `user${Date.now()}`;

      let username = baseUsername;
      let counter = 1;

      // Ensure uniqueness
      while (await User.exists({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user.username = username;
      await user.save();
      updatedCount++;
    }

    // Create unique index (if not already created)
    await mongoose.connection
      .collection('users')
      .createIndex({ username: 1 }, { unique: true });

    console.log(`✓ Migration completed successfully`);
    console.log(`  - Updated: ${updatedCount} users`);
    console.log(`  - Unique index ensured on username`);

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
 * Rollback migration: Remove username field
 */
async function migrateDown() {
  try {
    console.log('Rolling back migration: Remove username from users...');

    await connect();

    const result = await User.updateMany(
      { username: { $exists: true } },
      { $unset: { username: '' } },
    );

    // Drop index if exists
    try {
      await mongoose.connection.collection('users').dropIndex('username_1');
    } catch (err) {
      console.log('Index not found, skipping drop.');
    }

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
