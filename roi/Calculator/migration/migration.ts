// import { createClient } from '@supabase/supabase-js';
// import * as localforage from 'localforage';
// import { openDB } from 'idb';

// // Supabase credentials
// const supabaseUrl = 'https://wmbmmasrgnnyvvhdmzjx.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYm1tYXNyZ25ueXZ2aGRtemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMzUyNTUsImV4cCI6MjAxNjkxMTI1NX0.Ya_LdZPYq8lAdT-qAmWKt0smRBtEbXcDMZ45AbKHl78';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Local SQLite database configuration
// const dbName = 'roi_data';
// const tableName = 'users';

// // Open local SQLite database using IndexedDB
// async function openLocalDatabase() {
//   return await openDB(dbName, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(tableName)) {
//         db.createObjectStore(tableName, { keyPath: 'id' });
//       }
//     },
//   });
// }

// // Fetch user data from local SQLite database
// async function fetchUserData() {
//   const db = await openLocalDatabase();
//   const transaction = db.transaction(tableName, 'readonly');
//   const store = transaction.objectStore(tableName);

//   return await store.getAll();
// }

// // Migrate user data to Supabase
// async function migrateToSupabase(userData: any[]) {
//   try {
//     const { data, error } = await supabase.from('users').upsert(userData);

//     if (error) {
//       throw new Error(`Supabase error: ${error.message}`);
//     }

//     console.log('Migration successful:', data);
//   } catch (error) {
//     console.error('Migration failed:', error);
//   }
// }

// // Main function to initiate migration
// async function migrateData() {
//   try {
//     const userData = await fetchUserData();

//     if (userData.length === 0) {
//       console.log('No user data to migrate.');
//       return;
//     }

//     await migrateToSupabase(userData);
//   } catch (error) {
//     console.error('Migration process failed:', error);
//   }
// }

// // Run migration
// migrateData();

import { createClient } from '@supabase/supabase-js';
import * as sqlite3 from 'sqlite3';

// Supabase credentials
const supabaseUrl = 'https://wmbmmasrgnnyvvhdmzjx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYm1tYXNyZ25ueXZ2aGRtemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMzUyNTUsImV4cCI6MjAxNjkxMTI1NX0.Ya_LdZPYq8lAdT-qAmWKt0smRBtEbXcDMZ45AbKHl78';
const supabase = createClient(supabaseUrl, supabaseKey);

// Local SQLite database configuration
const dbName = '../src/roi_data.db';  // Replace with the path to your SQLite database file
const tableName = 'roi';               // Replace with your table name

// Function to open the SQLite database
function openLocalDatabase(dbPath: string) {
  return new sqlite3.Database(dbPath);
}

// Function to fetch and migrate data
function fetchAndMigrateData() {
  const db = openLocalDatabase(dbName);

  // Select all rows from the users table
  const query = `SELECT * FROM ${tableName}`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('SQLite query error:', err.message);
      return;
    }
    
    // Log fetched data for verification
    console.log('Fetched Data from SQLite:', rows);
    // Migrate data to Supabase
    migrateToSupabase(rows);
  });

  db.close();
}

// Function to migrate data to Supabase
async function migrateToSupabase(userData: any[]) {
  try {
    const { data, error } = await supabase.from(tableName).upsert(userData);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log('Migration to Supabase successful:', data);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration
fetchAndMigrateData();
