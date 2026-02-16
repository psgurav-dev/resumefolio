# Database Migrations

This directory contains database migration scripts for the Resumefolio application.

## Structure

- `001_add_selected_resume_to_users.ts` - Adds the `selectedResume` field to the users collection
- `migrate.ts` - Migration runner script
- `.migrations.json` - Log of executed migrations (auto-generated)

## Usage

### Run All Pending Migrations
```bash
npm run migrate
```

### Rollback Last Migration
```bash
npm run migrate:down
```

### Check Migration Status
```bash
npm run migrate:status
```

## Creating a New Migration

1. Create a new file in the format: `NNN_description.ts` (e.g., `002_add_field_to_schema.ts`)

2. Implement `migrateUp()` and `migrateDown()` functions:

```typescript
import mongoose from 'mongoose';
import { connectDB } from '@/config/mongose';

async function migrateUp() {
  try {
    console.log('Running migration...');
    await connectDB();
    
    // Your migration logic here
    
    console.log('✓ Migration completed');
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
    console.log('Rolling back migration...');
    await connectDB();
    
    // Your rollback logic here
    
    console.log('✓ Rollback completed');
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
```

3. Run `npm run migrate` to execute your new migration

## How It Works

- Migrations are executed in order based on their filename numbers
- Each executed migration is logged in `.migrations.json`
- The runner prevents duplicate migrations from running
- Migrations can be rolled back individually in reverse order
- Both up and down migrations must be implemented for consistency

## Notes

- Always test migrations in a development environment first
- Ensure database backups before running migrations in production
- Include proper error handling in migration scripts
- Log progress for debugging purposes
