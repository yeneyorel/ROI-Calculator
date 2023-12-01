# ROI-Calculator
## Overview

ROI Calculator for my application on Skillibrium

## Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [Supabase Account](https://supabase.io/) (for data storage)
- [SQLite](https://www.sqlite.org/index.html): Embedded database for local development.
## Getting Started
### 1. Install SQLite

Download and install SQLite from [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html) according to your operating system.

### 2. Create SQLite Database and Table

- Open the DB Browser for SQLite
- Import the 'roi_data' (roi/calculator/src/roi_data.db) database.

## Setup and Run the App Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yeneyorel/ROI-Calculator.git
2. Open your CMD and change your directory on the app (cd roi/calculator/src).
3. run this to you CMD "node server.ts". "Server is running on port 3000" message will display on your CMD
4. Open http://localhost:3000/ to your browser
5. ROI Calculator App will show (calculator.html)
6. Enjoy using the App

## Migration to Supabase
1. Create an account to supabase.
2. Create a new project.
3. Go to Database tab and create a 'roi' table Public schema with the same design on the local DB Browser.
4. Go to table 'roi' and disabled the RLS policies.
5. Update the migrations.ts (roi/calculator/migration/migration.ts) file, adjust the 'supabaseUrl' and 'supabaseKey' base on you Supabase project.
6. Open your CMD and change your directory to the migration.ts file (cd roi/calculator/migration/migration/.ts)
7. Run this on your CMD npx ts-node migration.ts.
8. All records from local DB and 'Migration to Supabase successful' message will be displayed and ton your CMD.
9. To verify it, go to SQL Editor and execute query to read the records from roi table.


# END
   
